import React, { useEffect, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import API, { getImageUrl } from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const CATEGORIES = ['Sports', 'Wellness', 'Accommodation', 'Events', 'Dining', 'General'];

export default function AdminFacilities() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', category: 'General', sort_order: 0 });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    API.get('/facilities')
      .then(res => setFacilities(res.data.data || []))
      .catch(() => toast.error('Failed to load.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openEdit = (fac) => {
    setEditing(fac);
    setForm({ name: fac.name, description: fac.description || '', category: fac.category || 'General', sort_order: fac.sort_order || 0 });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditing(null);
    setForm({ name: '', description: '', category: 'General', sort_order: 0 });
    setFile(null);
    setShowForm(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name) { toast.error('Name is required.'); return; }
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (file) fd.append('image', file);
    try {
      if (editing) {
        await API.put(`/admin/facilities/${editing.id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Facility updated!');
      } else {
        await API.post('/admin/facilities', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Facility added!');
      }
      resetForm();
      load();
    } catch { toast.error('Save failed.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async id => {
    if (!confirm('Delete this facility?')) return;
    try {
      await API.delete(`/admin/facilities/${id}`);
      toast.success('Deleted!');
      load();
    } catch { toast.error('Failed.'); }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-800">Facilities</h1>
          <p className="text-gray-500 text-sm">{facilities.length} facilities listed</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="btn-primary text-xs py-2">
          {showForm && !editing ? 'Cancel' : '+ Add Facility'}
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 shadow-sm mb-6 border-t-4 border-primary">
          <h2 className="font-serif text-lg font-bold text-gray-700 mb-4">
            {editing ? 'Edit Facility' : 'Add New Facility'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Name *</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="input-field" required />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="input-field">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-600 mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                rows={3} className="input-field resize-none" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Sort Order</label>
              <input type="number" value={form.sort_order} onChange={e => setForm(p => ({ ...p, sort_order: e.target.value }))}
                className="input-field" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Image {editing ? '(leave blank to keep current)' : ''}</label>
              <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])}
                className="input-field py-2 text-xs" />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary text-xs py-2.5 disabled:opacity-50">
                {saving ? 'Saving...' : (editing ? 'Update' : 'Add Facility')}
              </button>
              <button type="button" onClick={resetForm} className="btn-outline text-xs py-2.5">Cancel</button>
            </div>
          </form>
        </motion.div>
      )}

      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {facilities.map(fac => (
            <div key={fac.id} className="bg-white shadow-sm overflow-hidden">
              {fac.image_url && (
                <div className="h-32 overflow-hidden">
                  <img src={getImageUrl(fac.image_url)} alt={fac.name}
                    className="w-full h-full object-cover" loading="lazy" />
                </div>
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-serif font-bold text-gray-800">{fac.name}</h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5">{fac.category}</span>
                </div>
                <p className="text-gray-500 text-xs line-clamp-2 mb-3">{fac.description}</p>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(fac)}
                    className="text-xs px-3 py-1.5 border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(fac.id)}
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
