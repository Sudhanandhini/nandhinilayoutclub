import React, { useEffect, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import API, { getImageUrl } from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const initialForm = { sort_order: 0, is_active: 1 };

export default function AdminCommittee() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    API.get('/admin/committee')
      .then(res => setItems(res.data.data || []))
      .catch(() => toast.error('Failed to load committee members.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const reset = () => {
    setEditing(null);
    setForm(initialForm);
    setFile(null);
    setShowForm(false);
  };

  const openEdit = item => {
    setEditing(item);
    setForm({
      sort_order: item.sort_order || 0,
      is_active: Number(item.is_active ?? 1),
    });
    setFile(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!editing && !file) { toast.error('Please select a photo.'); return; }
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (file) fd.append('photo', file);
    try {
      if (editing) {
        await API.put(`/admin/committee/${editing.id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Updated!');
      } else {
        await API.post('/admin/committee', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Committee member added!');
      }
      reset();
      load();
    } catch {
      toast.error('Save failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async id => {
    if (!confirm('Delete this committee member?')) return;
    try {
      await API.delete(`/admin/committee/${id}`);
      toast.success('Deleted!');
      load();
    } catch {
      toast.error('Delete failed.');
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-800">Managing Committee</h1>
          <p className="text-gray-500 text-sm">{items.length} image{items.length === 1 ? '' : 's'} — add as many as you need. Shown full-width on the website.</p>
        </div>
        <button
          onClick={() => (showForm && !editing ? reset() : (setEditing(null), setForm(initialForm), setFile(null), setShowForm(true)))}
          className="btn-primary text-xs py-2">
          {showForm && !editing ? 'Cancel' : '+ Add Image'}
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 shadow-sm mb-6 border-t-4 border-primary">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Image {editing ? '(leave empty to keep current)' : '*'}</label>
              <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])}
                className="input-field py-2 text-xs" required={!editing} />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Sort Order</label>
              <input type="number" value={form.sort_order}
                onChange={e => setForm(p => ({ ...p, sort_order: e.target.value }))}
                className="input-field" />
            </div>
            {editing && (
              <div>
                <label className="block text-xs text-gray-600 mb-1">Status</label>
                <select value={form.is_active}
                  onChange={e => setForm(p => ({ ...p, is_active: Number(e.target.value) }))}
                  className="input-field">
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>
            )}
            <div className="sm:col-span-3 flex gap-3">
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
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-white shadow-sm">No committee images yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item.id} className="group relative bg-white shadow-sm overflow-hidden">
              <img src={getImageUrl(item.photo_url)} alt="Managing Committee"
                className="w-full object-contain" loading="lazy" />
              {!item.is_active && (
                <span className="absolute top-2 left-2 text-xs px-2 py-0.5 bg-gray-800/80 text-white">Inactive</span>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button onClick={() => openEdit(item)}
                  className="bg-white text-gray-800 text-xs px-3 py-1.5 hover:bg-gray-100">Edit</button>
                <button onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white text-xs px-3 py-1.5 hover:bg-red-700">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
