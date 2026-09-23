import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import MainLayout from '../layouts/MainLayout';
import { PageHero, Breadcrumbs, LoadingSpinner } from '../components/common/UI';
import API from '../services/api';
import room1 from '/assets/images/rooms/room-1.jpg';
import room2 from '/assets/images/rooms/room-2.jpg';
import events1 from '/assets/images/new-year-banner.jpg';

export function FindUsPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill required fields.');
      return;
    }

    setSending(true);
    try {
      const res = await API.post('/contact', form);
      toast.success(res.data.message || 'Message sent successfully.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setSending(false);
    }
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Find Us | Nandini Layout Club</title>
        <meta name="description" content="Find Nandini Layout Club location in West Bangalore." />
      </Helmet>
      <div className="pt-24 lg:pt-[190px]">
        <PageHero title="Find Us" subtitle="Location & Directions" />
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Find Us' }]} />
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.9fr] gap-12 items-start">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                <div>
                  <h2 className="font-serif text-4xl text-primary mb-8">Find us</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <h3 className="font-serif text-2xl text-primary mb-4">Club Address</h3>
                      <p className="text-gray-700 leading-8">
                        <strong>&ldquo;MAITRI SOUDHA&rdquo;</strong>, C.A. Site,
                        <br />
                        Circular Road, Nandini Layout,
                        <br />
                        Bangalore - 560 096
                      </p>
                    </div>

                    <div>
                      <h3 className="font-serif text-2xl text-primary mb-4">Club Contact</h3>
                      <div className="space-y-3 text-gray-700">
                        <p>080-23592418</p>
                        <p>
                          <a href="mailto:info@nandinilayoutclub.in" className="hover:text-primary">
                            info@nandinilayoutclub.in
                          </a>
                        </p>
                        <p>
                          <a
                            href="https://www.nandinilayoutclub.in"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-primary">
                            www.nandinilayoutclub.in
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-primary mb-4">Club Time</h3>
                  <p className="text-gray-700">9:00 am - 11:00 pm</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white border border-gray-200 p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name (required)</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 px-4 py-3 outline-none transition focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Email (required)</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 px-4 py-3 outline-none transition focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full border border-gray-300 px-4 py-3 outline-none transition focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full resize-none border border-gray-300 px-4 py-3 outline-none transition focus:border-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="border border-sky-400 px-6 py-2 text-sky-500 transition hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-60">
                    {sending ? 'Sending...' : 'Send'}
                  </button>
                </form>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 overflow-hidden rounded-sm border border-gray-200 bg-gray-200 shadow-sm">
              <iframe
                title="Nandini Layout Club location map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d18505.62020831943!2d77.537188!3d13.010496!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d0a91486ac1%3A0x9282bffef70830fc!2sNandini%20Layout%20Club!5e1!3m2!1sen!2sin!4v1781184222715!5m2!1sen!2sin"
                className="h-80 w-full md:h-96"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export function NewsEventsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  const defaultNews = [
    { id: 1, title: 'Annual General Meeting 2024', content: 'The AGM will be held on the last Sunday of March. All members are requested to attend.', event_date: '2024-03-31', is_featured: true },
    { id: 2, title: 'Holi Celebration 2024', content: 'Join us for a grand Holi celebration. Special cultural programs, music, and festive delicacies await you.', event_date: '2024-03-25', is_featured: true },
    { id: 3, title: 'New Year\'s Eve Gala', content: 'Ring in the New Year with a spectacular gala dinner and live music.', event_date: '2024-12-31', is_featured: false },
  ];

  useEffect(() => {
    API.get('/news')
      .then(res => setNews(res.data.data?.length ? res.data.data : defaultNews))
      .catch(() => setNews(defaultNews))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <Helmet>
        <title>News & Events | Nandini Layout Club</title>
      </Helmet>
      <div className="pt-24 lg:pt-[190px]">
        <PageHero title="News & Events" subtitle="Stay Updated" />
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'News & Events' }]} />
        <section className="py-16">
          <div className="container-custom">
            {/* {loading ? <LoadingSpinner /> : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item, i) => (
                  <motion.div key={item.id}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="card overflow-hidden">
                    <div className="h-40 bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center">
                      <span className="font-serif text-white text-6xl opacity-20">N</span>
                    </div>
                    <div className="p-6">
                      {item.is_featured && (
                        <span className="text-xs bg-gold text-white px-2 py-0.5 font-sans uppercase tracking-wider mb-3 inline-block">Featured</span>
                      )}
                      <h3 className="font-serif text-lg text-primary font-bold mb-2">{item.title}</h3>
                      {item.event_date && (
                        <p className="text-gold text-xs font-sans mb-3">
                          📅 {new Date(item.event_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      )}
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{item.content?.replace(/<[^>]*>/g, '')}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )} */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.button
                type="button"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setLightbox({ src: events1, alt: 'Events' })}
                className="group relative overflow-hidden rounded-lg shadow-md text-left focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2">
                <img src={events1} alt="Events" className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/35">
                  <span className="text-3xl text-white opacity-0 transition-opacity group-hover:opacity-100">🔍</span>
                </div>
              </motion.button>
            </div>
          </div>
        </section>
      </div>
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
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={e => e.stopPropagation()}>
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-full h-full max-h-[85vh] object-contain"
              />
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center bg-primary text-xl text-white hover:bg-primary-600">
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}

export function RoomsPage() {
  
  return (
    <MainLayout>
      <Helmet><title>Rooms & Accommodation | Nandini Layout Club</title></Helmet>
      <div className="pt-24 lg:pt-[190px]">
        <PageHero title="Guest Rooms" subtitle="Comfortable Stays" />
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Rooms' }]} />
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  <img src={room1} alt="Standard Room" className="w-full h-48 object-cover rounded-lg shadow-md" />
  <img src={room2} alt="Standard Room" className="w-full h-48 object-cover rounded-lg shadow-md" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-20">
<p><strong>Note:</strong> Please Contact For Room Bookings. Phone: 080-23592418 | Email: <a href="mailto:info@nandinilayoutclub.in">info@nandinilayoutclub.in</a></p>
            </div>

          </div>
        </section>
      </div>
    </MainLayout>
  );
}
