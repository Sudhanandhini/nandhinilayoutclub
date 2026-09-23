import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { PageHero, Breadcrumbs, LoadingSpinner } from '../components/common/UI';
import API, { getImageUrl } from '../services/api';

const fallbackImages = [
  { id: 1, title: 'Club Exterior', image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=70', category: 'Club' },
  { id: 2, title: 'Sports Court', image_url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=70', category: 'Sports' },
  { id: 3, title: 'Banquet Hall', image_url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=70', category: 'Events' },
  { id: 4, title: 'Restaurant', image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=70', category: 'Dining' },
  { id: 5, title: 'Garden', image_url: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600&q=70', category: 'Club' },
  { id: 6, title: 'Gym', image_url: 'https://images.unsplash.com/photo-1544124950-a0de5a98e25e?w=600&q=70', category: 'Wellness' },
  { id: 7, title: 'Swimming Pool', image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=70', category: 'Sports' },
  { id: 8, title: 'Conference Room', image_url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=70', category: 'Events' },
  { id: 9, title: 'Member Lounge', image_url: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=600&q=70', category: 'Club' },
];

export default function GalleryPage() {
  const [images, setImages] = useState(fallbackImages);
  const [categories, setCategories] = useState(['All', 'Club', 'Sports', 'Events', 'Dining', 'Wellness']);
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([API.get('/gallery'), API.get('/gallery/categories')])
      .then(([imgRes, catRes]) => {
        if (imgRes.data.data?.length) setImages(imgRes.data.data);
        if (catRes.data.data?.length) setCategories(catRes.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = active === 'All' ? images : images.filter(img => img.category === active);

  return (
    <MainLayout>
      <Helmet>
        <title>Gallery | Nandini Layout Club</title>
        <meta name="description" content="Explore our photo gallery showcasing club facilities, events and activities at Nandini Layout Club." />
      </Helmet>
      <div className="pt-24 lg:pt-[190px]">
        <PageHero title="Photo Gallery" subtitle="Moments & Memories" />
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]} />

        <section className="py-16">
          <div className="container-custom">
            {/* Category filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActive(cat)}
                  className={`px-5 py-2 text-sm font-sans font-medium uppercase tracking-wider transition-all border
                    ${active === cat ? 'bg-primary text-white border-primary' : 'border-gray-300 text-gray-600 hover:border-primary hover:text-primary'}`}>
                  {cat}
                </button>
              ))}
            </div>

            {loading ? (
              <LoadingSpinner />
            ) : (
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
                layout>
                <AnimatePresence>
                  {filtered.map((img, i) => (
                    <motion.div
                      key={img.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.03 }}
                      className="aspect-square cursor-pointer overflow-hidden group relative bg-gray-100"
                      onClick={() => setLightbox(img)}>
                      <img
                        src={getImageUrl(img.image_url)}
                        alt={img.title || 'Gallery image'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-3xl">🔍</span>
                      </div>
                      {img.category && (
                        <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity font-sans">
                          {img.category}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setLightbox(null)}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={e => e.stopPropagation()}>
              <img src={getImageUrl(lightbox.image_url)} alt={lightbox.title}
                className="w-full h-full object-contain max-h-[85vh]" />
              {lightbox.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white py-2 px-4 text-center">
                  <p className="font-sans text-sm">{lightbox.title}</p>
                </div>
              )}
              <button onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-primary text-white flex items-center justify-center hover:bg-primary-600 text-xl">
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}
