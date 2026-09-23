import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { Breadcrumbs, LoadingSpinner, PageHero } from '../components/common/UI';
import API from '../services/api';
import defaultAffiliatedClubs from '../data/affiliatedClubs.json';

function ClubCard({ club, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      className="rounded-sm bg-[#efede8] px-5 py-4 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-transform duration-300 hover:-translate-y-1">
      <h4 className="font-sans text-[15px] font-bold uppercase leading-snug tracking-wide text-[#d88a11]">
        {club.name}
      </h4>
      <div className="mt-2 space-y-1 text-sm leading-6 text-gray-700">
        {club.details.map(detail => (
          <p key={`${club.name}-${detail}`}>{detail}</p>
        ))}
      </div>
    </motion.article>
  );
}

function ClubGrid({ clubs }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {clubs.map((club, index) => (
        <ClubCard key={`${club.name}-${index}`} club={club} index={index} />
      ))}
    </div>
  );
}

function buildGroupedClubs(items = []) {
  const map = new Map();

  items.forEach(item => {
    const stateKey = (item.state || '').trim();
    if (!stateKey) return;

    if (!map.has(stateKey)) {
      map.set(stateKey, { state: stateKey, regions: [], clubs: [] });
    }

    const stateGroup = map.get(stateKey);
    const club = {
      name: item.club_name,
      details: [item.location, item.contact_info, item.email ? `Email: ${item.email}` : null, item.notes]
        .filter(Boolean),
    };

    if (item.region?.trim()) {
      let region = stateGroup.regions.find(entry => entry.name === item.region.trim());
      if (!region) {
        region = { name: item.region.trim(), clubs: [] };
        stateGroup.regions.push(region);
      }
      region.clubs.push(club);
    } else {
      stateGroup.clubs.push(club);
    }
  });

  return Array.from(map.values());
}

export default function AffiliatedClubPage() {
  const [affiliatedClubs, setAffiliatedClubs] = useState(defaultAffiliatedClubs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/affiliated-clubs')
      .then(res => {
        const rows = res.data.data || [];
        if (rows.length) {
          setAffiliatedClubs(buildGroupedClubs(rows));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <Helmet>
        <title>Affiliated Club | Nandini Layout Club</title>
        <meta
          name="description"
          content="Browse affiliated clubs across India available to Nandini Layout Club members."
        />
      </Helmet>

      <div className="pt-24 lg:pt-[190px]">
        <PageHero title="Affiliated Club" subtitle="Reciprocal Network" />
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Affiliated Club' }]} />

        <section className="bg-[radial-gradient(circle_at_top,rgba(6,65,86,0.06),transparent_32%),linear-gradient(180deg,#fbfaf6_0%,#ffffff_22%,#fbfaf6_100%)] py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mb-14 max-w-3xl text-center">
              <p className="section-subtitle">Across India</p>
              <h2 className="section-title">Our affiliated club network</h2>
              <div className="section-divider mx-auto" />
              <p className="text-base leading-8 text-gray-600">
                Members can enjoy access to a wide reciprocal network of clubs across multiple cities and
                states. The list below is arranged by state, with Karnataka further grouped by region for
                easier browsing.
              </p>
            </motion.div>

            {loading ? (
              <LoadingSpinner text="Loading affiliated clubs..." />
            ) : (
              <div className="space-y-14">
                {affiliatedClubs.map((stateGroup, stateIndex) => (
                  <motion.section
                    key={stateGroup.state}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.08 }}
                    transition={{ duration: 0.35, delay: stateIndex * 0.02 }}
                    className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-black" />
                      <h3 className="font-sans text-sm font-bold uppercase tracking-[0.22em] text-black">
                        {stateGroup.state}
                      </h3>
                      <div className="h-px flex-1 bg-black" />
                    </div>

                    {stateGroup.regions?.length ? (
                      <div className="space-y-10">
                        {stateGroup.regions.map(region => (
                          <div key={region.name} className="space-y-5">
                            <h4 className="text-center font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gray-800">
                              {region.name}
                            </h4>
                            <ClubGrid clubs={region.clubs} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ClubGrid clubs={stateGroup.clubs} />
                    )}
                  </motion.section>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
