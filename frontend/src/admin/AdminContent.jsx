import React, { useEffect, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import API from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

// ─── NEWS & EVENTS ─────────────────────────────────
export function AdminNews() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', event_date: '', is_featured: 0 });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    API.get('/admin/news')
      .then(res => setItems(res.data.data || []))
      .catch(() => toast.error('Failed to load.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title,
      content: item.content?.replace(/<[^>]*>/g, '') || '',
      event_date: item.event_date ? item.event_date.split('T')[0] : '',
      is_featured: item.is_featured || 0,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reset = () => {
    setEditing(null);
    setForm({ title: '', content: '', event_date: '', is_featured: 0 });
    setFile(null);
    setShowForm(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (file) fd.append('image', file);
    try {
      if (editing) {
        await API.put(`/admin/news/${editing.id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Updated!');
      } else {
        await API.post('/admin/news', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Added!');
      }
      reset();
      load();
    } catch { toast.error('Save failed.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async id => {
    if (!confirm('Delete?')) return;
    try { await API.delete(`/admin/news/${id}`); toast.success('Deleted!'); load(); }
    catch { toast.error('Failed.'); }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-serif text-2xl font-bold text-gray-800">News & Events</h1>
        <button onClick={() => { reset(); setShowForm(!showForm); }} className="btn-primary text-xs py-2">
          {showForm && !editing ? 'Cancel' : '+ Add News'}
        </button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 shadow-sm mb-6 border-t-4 border-primary">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-600 mb-1">Title *</label>
              <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                required className="input-field" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-600 mb-1">Content</label>
              <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                rows={5} className="input-field resize-none" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Event Date</label>
              <input type="date" value={form.event_date} onChange={e => setForm(p => ({ ...p, event_date: e.target.value }))}
                className="input-field" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Featured?</label>
              <select value={form.is_featured} onChange={e => setForm(p => ({ ...p, is_featured: e.target.value }))}
                className="input-field">
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-600 mb-1">Image</label>
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

      <div className="bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="text-left py-3 px-4">Title</th>
                <th className="text-left py-3 px-4">Event Date</th>
                <th className="text-left py-3 px-4">Featured</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium max-w-xs truncate">{item.title}</td>
                  <td className="py-3 px-4 text-gray-400 text-xs">
                    {item.event_date ? new Date(item.event_date).toLocaleDateString('en-IN') : '—'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-0.5 ${item.is_featured ? 'bg-gold text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {item.is_featured ? 'Featured' : 'Regular'}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button onClick={() => openEdit(item)} className="text-blue-600 text-xs hover:underline">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 text-xs hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}

// ─── PAGES ─────────────────────────────────────────
export function AdminPages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', content: '', meta_title: '', meta_description: '', is_active: 1 });
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    API.get('/admin/pages')
      .then(res => setPages(res.data.data || []))
      .catch(() => toast.error('Failed to load.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openEdit = (page) => {
    setEditing(page);
    setForm({ title: page.title, slug: page.slug, content: page.content || '', meta_title: page.meta_title || '', meta_description: page.meta_description || '', is_active: page.is_active });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    try {
      if (editing) {
        await API.put(`/admin/pages/${editing.id}`, fd);
        toast.success('Page updated!');
      } else {
        await API.post('/admin/pages', fd);
        toast.success('Page created!');
      }
      setEditing(null);
      load();
    } catch { toast.error('Save failed.'); }
    finally { setSaving(false); }
  };

  if (editing) {
    return (
      <AdminLayout>
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-serif text-2xl font-bold text-gray-800">Edit: {editing.title}</h1>
          <button onClick={() => setEditing(null)} className="btn-outline text-xs py-2">← Back</button>
        </div>
        <div className="bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Title *</label>
                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  required className="input-field" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Slug</label>
                <input value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))}
                  className="input-field" readOnly />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Content (HTML)</label>
              <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                rows={12} className="input-field resize-none font-mono text-xs" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Meta Title</label>
                <input value={form.meta_title} onChange={e => setForm(p => ({ ...p, meta_title: e.target.value }))}
                  className="input-field" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Meta Description</label>
                <input value={form.meta_description} onChange={e => setForm(p => ({ ...p, meta_description: e.target.value }))}
                  className="input-field" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary text-xs py-2.5 disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Page'}
              </button>
              <button type="button" onClick={() => setEditing(null)} className="btn-outline text-xs py-2.5">Cancel</button>
            </div>
          </form>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-gray-800">Pages</h1>
        <p className="text-gray-500 text-sm">Manage website content pages</p>
      </div>
      <div className="bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="text-left py-3 px-4">Title</th>
                <th className="text-left py-3 px-4">Slug</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Updated</th>
                <th className="text-left py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pages.map(page => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{page.title}</td>
                  <td className="py-3 px-4 text-gray-400 font-mono text-xs">{page.slug}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-0.5 ${page.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {page.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-xs">
                    {new Date(page.updated_at || page.created_at).toLocaleDateString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => openEdit(page)} className="text-blue-600 text-xs hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
