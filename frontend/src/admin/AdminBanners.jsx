import React, { useEffect, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import API, { getImageUrl } from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function AdminBanners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', subtitle: '', link_url: '', sort_order: 0 });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    API.get('/admin/banners')
      .then(res => setBanners(res.data.data || []))
      .catch(() => toast.error('Failed to load banners.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) { toast.error('Please select an image.'); return; }
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append('image', file);
    try {
      await API.post('/admin/banners', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Banner created!');
      setShowForm(false);
      setFile(null);
      setForm({ title: '', subtitle: '', link_url: '', sort_order: 0 });
      load();
    } catch { toast.error('Failed to save banner.'); }
    finally { setSaving(false); }
  };

  const handleToggle = async (banner) => {
    try {
      const fd = new FormData();
      fd.append('title', banner.title || '');
      fd.append('subtitle', banner.subtitle || '');
      fd.append('link_url', banner.link_url || '');
      fd.append('sort_order', banner.sort_order);
      fd.append('is_active', banner.is_active ? 0 : 1);
      await API.put(`/admin/banners/${banner.id}`, fd);
      toast.success('Updated!');
      load();
    } catch { toast.error('Failed.'); }
  };

  const handleDelete = async id => {
    if (!confirm('Delete this banner?')) return;
    try {
      await API.delete(`/admin/banners/${id}`);
      toast.success('Deleted!');
      load();
    } catch { toast.error('Delete failed.'); }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-800">Hero Banners</h1>
          <p className="text-gray-500 text-sm">Manage homepage slider images</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-xs py-2">
          {showForm ? 'Cancel' : '+ Add Banner'}
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 shadow-sm mb-6 border-t-4 border-primary">
          <h2 className="font-serif text-lg font-bold text-gray-700 mb-4">New Banner</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Title</label>
              <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                className="input-field" placeholder="Banner heading" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Subtitle</label>
              <input value={form.subtitle} onChange={e => setForm(p => ({ ...p, subtitle: e.target.value }))}
                className="input-field" placeholder="Banner subtitle" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Link URL (optional)</label>
              <input value={form.link_url} onChange={e => setForm(p => ({ ...p, link_url: e.target.value }))}
                className="input-field" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Sort Order</label>
              <input type="number" value={form.sort_order} onChange={e => setForm(p => ({ ...p, sort_order: e.target.value }))}
                className="input-field" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-600 mb-1">Banner Image * (recommended: 1920×800px)</label>
              <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])}
                className="input-field py-2 text-xs" required />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary text-xs py-2.5 disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Banner'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline text-xs py-2.5">Cancel</button>
            </div>
          </form>
        </motion.div>
      )}

      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {banners.map(banner => (
            <div key={banner.id} className="bg-white shadow-sm overflow-hidden">
              <div className="h-40 overflow-hidden relative">
                <img src={getImageUrl(banner.image_url)} alt={banner.title}
                  className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 flex gap-2">
                  <span className={`text-xs px-2 py-0.5 font-sans ${banner.is_active ? 'bg-green-500' : 'bg-gray-400'} text-white`}>
                    {banner.is_active ? 'Active' : 'Inactive'}
                  </span>
                  <span className="bg-dark/70 text-white text-xs px-2 py-0.5">#{banner.sort_order}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-sm">{banner.title || '(No title)'}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{banner.subtitle || ''}</p>
                <div className="flex gap-3 mt-3">
                  <button onClick={() => handleToggle(banner)}
                    className={`text-xs px-3 py-1.5 border transition-colors ${banner.is_active ? 'border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-600' : 'border-green-300 text-green-600 hover:bg-green-50'}`}>
                    {banner.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button onClick={() => handleDelete(banner.id)}
                    className="text-xs px-3 py-1.5 border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
