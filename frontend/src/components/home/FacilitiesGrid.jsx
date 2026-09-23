import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import API, { getImageUrl } from '../../services/api';

const defaultFacilities = [
  { id: 1, name: 'Other Facilities', icon_url: null, description: 'Exclusive club facilities for all members' },
  { id: 2, name: 'Membership', icon_url: null, description: 'Join our growing community of 1000+ members' },
  { id: 3, name: 'Health & Wellness', icon_url: null, description: 'State-of-the-art gym and wellness center' },
  { id: 4, name: 'Events & Activities', icon_url: null, description: 'Year-round cultural and social events' },
  { id: 5, name: 'Guest Rooms', icon_url: null, description: 'Comfortable accommodation for members & guests' },
  { id: 6, name: 'Conferences & Banquets', icon_url: null, description: 'Modern halls for every occasion' },
  { id: 7, name: 'Food & Beverage', icon_url: null, description: 'Multi-cuisine dining experience' },
  { id: 8, name: 'Sports Facilities', icon_url: null, description: 'Badminton, TT, chess, carrom & more' },
];

const icons = ['🏠', '👥', '💪', '🎉', '🛏', '🎪', '🍽', '🏸'];

export default function FacilitiesGrid() {
  const [facilities, setFacilities] = useState(defaultFacilities);

  useEffect(() => {
    API.get('/facilities')
      .then(res => { if (res.data.data?.length) setFacilities(res.data.data); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-0">
      <div className="bg-primary py-4">
        <div className="container-custom">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-0">
            {facilities.map((fac, i) => (
              <motion.div
                key={fac.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group flex flex-col items-center py-5 px-2 text-center border-r border-white/10 last:border-r-0 cursor-pointer hover:bg-white/10 transition-colors">
                <span className="text-3xl mb-2">{icons[i % icons.length]}</span>
                <span className="text-white text-xs font-sans font-medium leading-tight">{fac.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
