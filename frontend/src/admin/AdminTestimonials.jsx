import React, { useEffect, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import API from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', designation: '', message: '', rating: 5 });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    API.get('/testimonials')
      .then(res => setItems(res.data.data || []))
      .catch(() => toast.error('Failed to load.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openEdit = (item) => {
    setEditing(item);
    setForm({ name: item.name, designation: item.designation || '', message: item.message, rating: item.rating || 5 });
    setShowForm(true);
  };

  const reset = () => {
    setEditing(null);
    setForm({ name: '', designation: '', message: '', rating: 5 });
    setFile(null);
    setShowForm(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (file) fd.append('photo', file);
    try {
      if (editing) {
        await API.put(`/admin/testimonials/${editing.id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Updated!');
      } else {
        await API.post('/admin/testimonials', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Added!');
      }
      reset();
      load();
    } catch { toast.error('Save failed.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async id => {
    if (!confirm('Delete?')) return;
    try {
      await API.delete(`/admin/testimonials/${id}`);
      toast.success('Deleted!');
      load();
    } catch { toast.error('Failed.'); }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-serif text-2xl font-bold text-gray-800">Testimonials</h1>
        <button onClick={() => { reset(); setShowForm(!showForm); }} className="btn-primary text-xs py-2">
          {showForm && !editing ? 'Cancel' : '+ Add Testimonial'}
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 shadow-sm mb-6 border-t-4 border-primary">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Name *</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                required className="input-field" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Designation</label>
              <input value={form.designation} onChange={e => setForm(p => ({ ...p, designation: e.target.value }))}
                className="input-field" placeholder="e.g. Member since 2010" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-600 mb-1">Message *</label>
              <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                rows={3} required className="input-field resize-none" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Rating (1–5)</label>
              <select value={form.rating} onChange={e => setForm(p => ({ ...p, rating: e.target.value }))}
                className="input-field">
                {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Photo (optional)</label>
              <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])}
                className="input-field py-2 text-xs" />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary text-xs py-2.5 disabled:opacity-50">
                {saving ? 'Saving...' : (editing ? 'Update' : 'Add')}
              </button>
              <button type="button" onClick={reset} className="btn-outline text-xs py-2.5">Cancel</button>
            </div>
          </form>
        </motion.div>
      )}

      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(item => (
            <div key={item.id} className="bg-white p-5 shadow-sm border-l-4 border-primary">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.designation}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i} className="text-gold text-sm">★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-xs italic mb-4 line-clamp-3">"{item.message}"</p>
              <div className="flex gap-2">
                <button onClick={() => openEdit(item)}
                  className="text-xs px-3 py-1.5 border border-blue-200 text-blue-600 hover:bg-blue-50">Edit</button>
                <button onClick={() => handleDelete(item.id)}
                  className="text-xs px-3 py-1.5 border border-red-200 text-red-500 hover:bg-red-50">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
