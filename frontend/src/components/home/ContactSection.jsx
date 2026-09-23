import React, { useState } from 'react';
import { motion } from 'framer-motion';
import API from '../../services/api';
import toast from 'react-hot-toast';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill required fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await API.post('/contact', form);
      toast.success(res.data.message);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-cream">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}>
            <p className="section-subtitle">Get In Touch</p>
            <h2 className="section-title mb-4">Contact Us</h2>
            <div className="section-divider"></div>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We would love to hear from you. Whether you have questions about membership, 
              facilities, or want to plan an event, our team is here to help.
            </p>
            <div className="space-y-5">
              {[
                { icon: '📍', label: 'Address', value: 'Nandini Layout, Chord Road, West Bangalore - 560 086, Karnataka' },
                { icon: '📞', label: 'Phone', value: '+91 80 2345 6789 / +91 98765 43210' },
                { icon: '✉', label: 'Email', value: 'info@nandinilayoutclub.in' },
                { icon: '🕒', label: 'Hours', value: 'Mon–Sun: 6:00 AM – 11:30 PM' },
              ].map(item => (
                <div key={item.label} className="flex gap-4">
                  <span className="text-2xl w-8 text-center flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs text-gold uppercase tracking-widest font-sans font-semibold mb-1">{item.label}</p>
                    <p className="text-gray-700 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 shadow-lg border-t-4 border-primary">
            <h3 className="font-serif text-xl text-primary font-bold mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required
                    className="input-field" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required
                    className="input-field" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Subject</label>
                <input name="subject" value={form.subject} onChange={handleChange}
                  className="input-field" placeholder="Subject" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} required
                  rows={5} className="input-field resize-none" placeholder="Your message..." />
              </div>
              <button type="submit" disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
