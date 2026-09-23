require('dotenv').config();
const path = require('path');
const db = require('../config/db');
const seedData = require(path.resolve(__dirname, '../../frontend/src/data/affiliatedClubs.json'));

const createTableSql = `
CREATE TABLE IF NOT EXISTS affiliated_clubs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  state VARCHAR(150) NOT NULL,
  region VARCHAR(200),
  club_name VARCHAR(300) NOT NULL,
  location VARCHAR(300),
  contact_info VARCHAR(300),
  email VARCHAR(200),
  notes TEXT,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

function parseDetails(details = []) {
  let location = null;
  let contactInfo = null;
  let email = null;
  const notes = [];

  details.forEach((detail, index) => {
    if (!detail) return;
    if (index === 0) {
      location = detail;
      return;
    }
    if (/^email:/i.test(detail)) {
      email = detail.replace(/^email:\s*/i, '').trim();
      return;
    }
    if (/^(ph|contact):/i.test(detail)) {
      contactInfo = detail.trim();
      return;
    }
    notes.push(detail.trim());
  });

  return {
    location,
    contactInfo,
    email,
    notes: notes.length ? notes.join(' | ') : null,
  };
}

function flattenSeedData(data) {
  const rows = [];

  data.forEach(stateGroup => {
    let stateSort = 0;

    (stateGroup.regions || []).forEach(region => {
      region.clubs.forEach((club, index) => {
        const parsed = parseDetails(club.details);
        rows.push({
          state: stateGroup.state,
          region: region.name,
          club_name: club.name,
          location: parsed.location,
          contact_info: parsed.contactInfo,
          email: parsed.email,
          notes: parsed.notes,
          sort_order: index + 1,
          is_active: 1,
        });
      });
    });

    (stateGroup.clubs || []).forEach(club => {
      stateSort += 1;
      const parsed = parseDetails(club.details);
      rows.push({
        state: stateGroup.state,
        region: null,
        club_name: club.name,
        location: parsed.location,
        contact_info: parsed.contactInfo,
        email: parsed.email,
        notes: parsed.notes,
        sort_order: stateSort,
        is_active: 1,
      });
    });
  });

  return rows;
}

async function seed() {
  const rows = flattenSeedData(seedData);
  let inserted = 0;
  let skipped = 0;

  try {
    await db.query(createTableSql);

    for (const row of rows) {
      const [existing] = await db.query(
        `SELECT id FROM affiliated_clubs
         WHERE state = ?
           AND region <=> ?
           AND club_name = ?
           AND location <=> ?
         LIMIT 1`,
        [row.state, row.region, row.club_name, row.location]
      );

      if (existing.length) {
        skipped += 1;
        continue;
      }

      await db.query(
        `INSERT INTO affiliated_clubs
        (state, region, club_name, location, contact_info, email, notes, sort_order, is_active)
        VALUES (?,?,?,?,?,?,?,?,?)`,
        [
          row.state,
          row.region,
          row.club_name,
          row.location,
          row.contact_info,
          row.email,
          row.notes,
          row.sort_order,
          row.is_active,
        ]
      );

      inserted += 1;
    }

    console.log(`Affiliated clubs seeding complete. Inserted: ${inserted}, skipped: ${skipped}`);
  } catch (error) {
    console.error('Failed to seed affiliated clubs:', error.message);
    process.exitCode = 1;
  } finally {
    await db.end();
  }
}

seed();
