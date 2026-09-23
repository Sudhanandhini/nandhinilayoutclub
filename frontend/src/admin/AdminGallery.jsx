import React, { useEffect, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import API, { getImageUrl } from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'General', sort_order: 0 });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    API.get('/gallery')
      .then(res => setImages(res.data.data || []))
      .catch(() => toast.error('Failed to load gallery.'))
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
      await API.post('/admin/gallery', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Image uploaded!');
      setShowForm(false);
      setFile(null);
      setForm({ title: '', category: 'General', sort_order: 0 });
      load();
    } catch { toast.error('Upload failed.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async id => {
    if (!confirm('Delete this image?')) return;
    try {
      await API.delete(`/admin/gallery/${id}`);
      toast.success('Deleted!');
      load();
    } catch { toast.error('Delete failed.'); }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-2xl text-gray-800 font-bold">Gallery</h1>
          <p className="text-gray-500 text-sm">{images.length} images</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-xs py-2">
          {showForm ? 'Cancel' : '+ Upload Image'}
        </button>
      </div>

      {/* Upload form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 shadow-sm mb-6 border-t-4 border-primary">
          <h2 className="font-serif text-lg font-bold text-gray-700 mb-4">Upload New Image</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Title</label>
              <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                className="input-field" placeholder="Image title" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="input-field">
                {['General', 'Club', 'Sports', 'Events', 'Dining', 'Wellness', 'Accommodation'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Image *</label>
              <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])}
                className="input-field py-2 text-xs" required />
            </div>
            <button type="submit" disabled={saving} className="btn-primary text-xs py-3 disabled:opacity-50">
              {saving ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </motion.div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {images.map(img => (
            <div key={img.id} className="group relative aspect-square bg-gray-100 overflow-hidden">
              <img src={getImageUrl(img.image_url)} alt={img.title}
                className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <span className="text-white text-xs text-center px-2">{img.title || img.category}</span>
                <button onClick={() => handleDelete(img.id)}
                  className="bg-red-600 text-white text-xs px-3 py-1 hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
