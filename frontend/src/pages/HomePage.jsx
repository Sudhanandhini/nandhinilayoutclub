import React from 'react';
import { Helmet } from 'react-helmet-async';
import MainLayout from '../layouts/MainLayout';
import HeroSlider from '../components/home/HeroSlider';
import FacilitiesGrid from '../components/home/FacilitiesGrid';
import HomeAbout from '../components/home/HomeAbout';
import Testimonials from '../components/home/Testimonials';
import ContactSection from '../components/home/ContactSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function StatsBar() {
  const stats = [
    { value: '35+', label: 'Years of Excellence' },
    { value: '500+', label: 'Members' },
    { value: '50+', label: 'Facilities' },
    { value: '50+', label: 'Events Annually' },
  ];
  return (
    <div className="bg-dark text-white py-10">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(s => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}>
              <div className="font-serif text-4xl text-gold font-bold mb-1">{s.value}</div>
              <div className="text-gray-400 text-xs uppercase tracking-widest font-sans">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MembershipCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="section-subtitle">Exclusive Membership</p>
          <h2 className="section-title mb-4">Become a Member Today</h2>
          <div className="w-16 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Join our exclusive community and enjoy world-class facilities, vibrant social events, 
            and a lifetime of memories. Membership plans available for individuals, families, 
            corporates, and senior citizens.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/membership/apply" className="btn-primary">Apply for Membership</Link>
            <Link to="/membership" className="btn-outline">Learn More</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <MainLayout>
      <Helmet>
        <title>Welcome to Nandini Layout Club | West Bangalore's Premier Social Club</title>
        <meta name="description" content="Nandini Layout Club - The perfect place to enjoy life in a classy and friendly atmosphere. Premier social club in West Bangalore since 1986." />
        <meta property="og:title" content="Nandini Layout Club" />
        <meta property="og:description" content="West Bangalore's premier social club since 1986." />
      </Helmet>
      <HeroSlider />
      <FacilitiesGrid />
      <StatsBar />
      <HomeAbout />
      {/* <MembershipCTA /> */}
      {/* <Testimonials /> */}
      <ContactSection />
    </MainLayout>
  );
}
