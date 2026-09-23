import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HomeAbout() {
  return (
    <section className="py-16 md:py-24 bg-cream">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* About Club */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 shadow-sm border-t-4 border-primary">
            <h2 className="font-serif text-2xl text-primary font-bold mb-4">About Club</h2>
            <div className="w-12 h-0.5 bg-gold mb-5"></div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Nandini Layout Club - The perfect place to enjoy life in a classy and friendly atmosphere! 
              The Club houses a unique combination of the traditions of an exclusive club and the best of 
              today's sporting, leisure, entertaining and hotel facilities, in one of the most convenient 
              locations in West Bangalore.
            </p>
            <Link to="/about" className="btn-primary text-xs inline-block">Read More</Link>
          </motion.div>

          {/* Amenities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-white p-8 shadow-sm border-t-4 border-gold">
            <h2 className="font-serif text-2xl text-primary font-bold mb-4">Amenities</h2>
            <div className="w-12 h-0.5 bg-gold mb-5"></div>
            <div className="text-gray-600 text-sm leading-relaxed mb-6 space-y-3">
              <div>
                <strong className="text-primary">1. Basement</strong>
                <p>Wooden shuttle court, Table Tennis, Chess, Carrom & planned Billiards Lounge.</p>
              </div>
              <div>
                <strong className="text-primary">2. Ground Floor</strong>
                <p>Front office, reception, multi-purpose halls and member lounge.</p>
              </div>
              <div>
                <strong className="text-primary">3. Upper Floors</strong>
                <p>Restaurant, guest rooms, conference halls and terrace garden.</p>
              </div>
            </div>
            <Link to="/amenities" className="btn-outline text-xs inline-block">Read More »</Link>
          </motion.div>

          {/* Photo Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 shadow-sm border-t-4 border-primary">
            <h2 className="font-serif text-2xl text-primary font-bold mb-4">Photo Gallery</h2>
            <div className="w-12 h-0.5 bg-gold mb-5"></div>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${[
                      '1571896349842-33c89424de2d',
                      '1519167758481-83f550bb49b3',
                      '1540497077202-7c8a3999166f',
                      '1414235077428-338989a2e8c0',
                      '1544124950-a0de5a98e25e',
                      '1563514227147-6d2ff665a6a0',
                    ][i]}?w=200&q=70`}
                    alt="Gallery"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <Link to="/gallery" className="btn-primary text-xs inline-block">View All</Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
