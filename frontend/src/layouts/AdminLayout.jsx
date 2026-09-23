import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const sideLinks = [
  { label: 'Dashboard', path: '/admin', icon: '📊', end: true },
  { label: 'Hero Banners', path: '/admin/banners', icon: '🖼' },
  { label: 'Gallery', path: '/admin/gallery', icon: '📷' },
  { label: 'Facilities', path: '/admin/facilities', icon: '🏠' },
  { label: 'Testimonials', path: '/admin/testimonials', icon: '💬' },
  { label: 'Managing Committee', path: '/admin/committee', icon: '🧑‍💼' },
  { label: 'Affiliated Clubs', path: '/admin/affiliated-clubs', icon: '🤝' },
  { label: 'Pages', path: '/admin/pages', icon: '📄' },
  { label: 'News & Events', path: '/admin/news', icon: '📰' },
  { label: 'Memberships', path: '/admin/memberships', icon: '👥' },
  { label: 'Contact Inquiries', path: '/admin/contacts', icon: '📧' },
];

export default function AdminLayout({ children }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-dark text-white flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary flex items-center justify-center">
              <span className="text-gold font-bold">N</span>
            </div>
            <div>
              <p className="text-white font-serif font-bold text-sm leading-none">Nandini Club</p>
              <p className="text-gold text-xs">Admin Panel</p>
            </div>
          </div>
        </div>
        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {sideLinks.map(link => (
            <NavLink key={link.path} to={link.path} end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 text-sm transition-colors
                 ${isActive ? 'bg-primary text-white border-r-3 border-gold' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`
              }
              onClick={() => setSidebarOpen(false)}>
              <span>{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
        {/* User */}
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-gray-400 mb-1">{admin?.name}</p>
          <p className="text-xs text-gray-500 mb-3">{admin?.email}</p>
          <button onClick={handleLogout}
            className="w-full text-xs bg-red-900/40 hover:bg-red-800/60 text-red-300 py-2 px-3 transition-colors">
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-gray-600">
            ☰
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <Link to="/" target="_blank" className="text-xs text-primary hover:underline">View Site →</Link>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-600 font-medium">{admin?.name}</span>
          </div>
        </header>
        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
