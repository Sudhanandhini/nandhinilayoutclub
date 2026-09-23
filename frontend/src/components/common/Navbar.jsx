import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '/assets/images/logo.png';
import bgnav from '/assets/images/header-bg.jpg';

const navLinks = [
  { label: 'Home', path: '/' },
  {
    label: 'About Club',
    path: '/about',
    children: [
      { label: "President's Message", path: '/about/presidents-message' },
      { label: "Secretary's Message", path: '/about/secretarys-message' },
    ],
  },
  {
    label: 'Membership',
    path: '/membership',
    children: [
      { label: 'Managing Committee', path: '/membership/managing-committee' },
      { label: 'Sub Committees', path: '/membership/sub-committees' },
    ],
  },
  { label: 'Affiliated Club', path: '/affiliated-club' },
  { label: 'Amenities', path: '/amenities' },
  { label: 'Rooms', path: '/rooms' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'News & Events', path: '/news-events' },
  { label: 'Find Us', path: '/find-us' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      {/* Top bar */}
      <div className={`hidden md:block text-white text-xs  transition-all duration-300 ${scrolled ? 'bg-primary h-0 py-0 overflow-hidden opacity-0 py-0' : 'bg-primary opacity-100 py-1.5'}`}>
        <div className="container-custom flex justify-between items-center">
          <span>West Bangalore's Premier Social Club Since 1986</span>
          <div className="flex items-center gap-4">
            <a href="tel:+918023456789" className="hover:text-gold transition-colors">📞 +91 80 2345 6789</a>
            <a href="mailto:info@nandinilayoutclub.in" className="hover:text-gold transition-colors">✉ info@nandinilayoutclub.in</a>
            <div className="flex gap-2">
              {['Facebook', 'Twitter', 'YouTube'].map(s => (
                <a key={s} href="#" className="hover:text-gold transition-colors text-xs">{s[0]}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="transition-all duration-300">
        <div
          className="hidden lg:block border-b border-black/10"
          style={{ backgroundImage: `url(${bgnav})` }}
        >
          <div className="container-custom flex justify-center py-4">
            <Link to="/" className="flex items-center justify-center">
              <img src={logo} alt="Nandini Layout Club Logo" className="w-auto" />
            </Link>
          </div>
        </div>

        <div className="container-custom flex items-center justify-between h-16 md:h-20 lg:hidden bg-white">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Nandini Layout Club Logo" className="max-h-12 w-auto" />
          </Link>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-primary" aria-label="Toggle menu">
            <span className="block w-6 h-0.5 bg-current mb-1.5 transition-all"></span>
            <span className="block w-6 h-0.5 bg-current mb-1.5 transition-all"></span>
            <span className="block w-6 h-0.5 bg-current transition-all"></span>
          </button>
        </div>

        <div className="hidden lg:block bg-[#e3ddd1] border-t border-white/20 border-b border-[#c7bcaa]">
          <div className="container-custom">
            <ul className="flex items-center justify-center gap-0 w-full">
            {navLinks.map(link => (
              <li key={link.path} className="relative group"
                onMouseEnter={() => link.children && setOpenDropdown(link.path)}
                onMouseLeave={() => setOpenDropdown(null)}>
                <NavLink to={link.path}
                  className={({ isActive }) =>
                    `block px-5 py-3 font-sans text-[15px] font-medium transition-colors border-r border-[#c7bcaa]
                     ${isActive ? 'text-primary bg-white/35' : 'text-[#2f2f2f] hover:text-primary hover:bg-white/25'}`
                  }
                  end={link.path === '/'}>
                  {link.label}
                  {link.children && <span className="ml-1 text-xs">▾</span>}
                </NavLink>
                {link.children && openDropdown === link.path && (
                  <motion.ul
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 bg-white shadow-xl border-t-2 border-primary min-w-[220px] z-50">
                    {link.children.map(child => (
                      <li key={child.path}>
                        <NavLink to={child.path}
                          className="block px-5 py-3 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors border-b border-gray-100">
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </li>
            ))}
            </ul>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden">
              <ul className="py-2">
                {navLinks.map(link => (
                  <li key={link.path}>
                    <NavLink to={link.path}
                      className={({ isActive }) =>
                        `block px-6 py-3 text-sm font-medium uppercase tracking-wide ${isActive ? 'text-primary bg-primary/5' : 'text-gray-700 hover:text-primary'}`
                      }
                      end={link.path === '/'}>
                      {link.label}
                    </NavLink>
                    {link.children && (
                      <ul className="bg-gray-50 ml-4">
                        {link.children.map(child => (
                          <li key={child.path}>
                            <NavLink to={child.path}
                              className="block px-6 py-2.5 text-sm text-gray-600 hover:text-primary border-l-2 border-transparent hover:border-primary">
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                {/* <li className="px-6 py-3">
                  <Link to="/membership/apply" className="btn-primary block text-center text-xs">Join Now</Link>
                </li> */}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
