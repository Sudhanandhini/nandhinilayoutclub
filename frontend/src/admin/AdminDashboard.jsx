import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import API from '../services/api';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ contacts: 0, memberships: 0, gallery: 0, facilities: 0, affiliated_clubs: 0, committee: 0 });

  useEffect(() => {
    API.get('/admin/stats')
      .then(res => setStats(res.data.data))
      .catch(() => {});
  }, []);

  const cards = [
    { label: 'Unread Inquiries', value: stats.contacts, path: '/admin/contacts', color: 'bg-red-50 border-red-200', icon: '📧', accent: 'text-red-600' },
    { label: 'Pending Memberships', value: stats.memberships, path: '/admin/memberships', color: 'bg-yellow-50 border-yellow-200', icon: '👥', accent: 'text-yellow-600' },
    { label: 'Gallery Images', value: stats.gallery, path: '/admin/gallery', color: 'bg-blue-50 border-blue-200', icon: '📷', accent: 'text-blue-600' },
    { label: 'Facilities Listed', value: stats.facilities, path: '/admin/facilities', color: 'bg-green-50 border-green-200', icon: '🏠', accent: 'text-green-600' },
    { label: 'Affiliated Clubs', value: stats.affiliated_clubs, path: '/admin/affiliated-clubs', color: 'bg-purple-50 border-purple-200', icon: '🤝', accent: 'text-purple-600' },
    { label: 'Committee Members', value: stats.committee, path: '/admin/committee', color: 'bg-indigo-50 border-indigo-200', icon: '🧑‍💼', accent: 'text-indigo-600' },
  ];

  const quickLinks = [
    { label: 'Add Banner', path: '/admin/banners', icon: '🖼' },
    { label: 'Upload Gallery', path: '/admin/gallery', icon: '📷' },
    { label: 'Add Facility', path: '/admin/facilities', icon: '🏠' },
    { label: 'Add Testimonial', path: '/admin/testimonials', icon: '💬' },
    { label: 'Managing Committee', path: '/admin/committee', icon: '🧑‍💼' },
    { label: 'Affiliated Clubs', path: '/admin/affiliated-clubs', icon: '🤝' },
    { label: 'Edit Pages', path: '/admin/pages', icon: '📄' },
    { label: 'Add News', path: '/admin/news', icon: '📰' },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-serif text-2xl text-gray-800 font-bold">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome to Nandini Layout Club Admin Panel</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
        {cards.map((card, i) => (
          <motion.div key={card.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}>
            <Link to={card.path}
              className={`block border ${card.color} p-6 hover:shadow-md transition-shadow`}>
              <div className="flex justify-between items-start mb-3">
                <span className="text-3xl">{card.icon}</span>
                <span className={`font-serif text-3xl font-bold ${card.accent}`}>{card.value}</span>
              </div>
              <p className="text-gray-600 text-sm font-medium">{card.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="bg-white p-6 shadow-sm mb-6">
        <h2 className="font-serif text-lg text-gray-800 font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-4">
          {quickLinks.map((link, i) => (
            <motion.div key={link.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}>
              <Link to={link.path}
                className="flex flex-col items-center gap-2 p-4 border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors text-center">
                <span className="text-2xl">{link.icon}</span>
                <span className="text-xs text-gray-600 font-medium">{link.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-primary/5 border border-primary/20 p-5 text-sm text-gray-600">
        <p className="font-semibold text-primary mb-1">💡 Getting Started</p>
        <p>Use the sidebar to manage all content. Changes are reflected on the live website immediately.</p>
      </div>
    </AdminLayout>
  );
}
