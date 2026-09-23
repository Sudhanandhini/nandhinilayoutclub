import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
// import { WhatsAppButton } from '../components/common/UI';
import { motion } from 'framer-motion';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}>
          {children}
        </motion.div>
      </main>
      <Footer />
      {/* <WhatsAppButton /> */}
    </div>
  );
}
