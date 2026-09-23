import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AdminLayout from '../layouts/AdminLayout';
import API from '../services/api';

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];

const initialForm = {
  state: '',
  region: '',
  club_name: '',
  location: '',
  contact_info: '',
  email: '',
  notes: '',
  sort_order: 0,
  is_active: 1,
};

export default function AdminAffiliatedClubs() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    API.get('/admin/affiliated-clubs')
      .then(res => setItems(res.data.data || []))
      .catch(() => toast.error('Failed to load affiliated clubs.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const reset = () => {
    setEditing(null);
    setForm(initialForm);
    setShowForm(false);
  };

  const openEdit = item => {
    setEditing(item);
    setForm({
      state: item.state || '',
      region: item.region || '',
      club_name: item.club_name || '',
      location: item.location || '',
      contact_info: item.contact_info || '',
      email: item.email || '',
      notes: item.notes || '',
      sort_order: item.sort_order || 0,
      is_active: Number(item.is_active ?? 1),
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await API.put(`/admin/affiliated-clubs/${editing.id}`, form);
        toast.success('Affiliated club updated!');
      } else {
        await API.post('/admin/affiliated-clubs', form);
        toast.success('Affiliated club added!');
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
    if (!confirm('Delete this affiliated club entry?')) return;
    try {
      await API.delete(`/admin/affiliated-clubs/${id}`);
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
          <h1 className="font-serif text-2xl font-bold text-gray-800">Affiliated Clubs</h1>
          <p className="text-gray-500 text-sm">Manage club entries shown on the affiliated club page.</p>
        </div>
        <button
          onClick={() => {
            if (showForm && !editing) {
              reset();
            } else {
              setEditing(null);
              setForm(initialForm);
              setShowForm(true);
            }
          }}
          className="btn-primary text-xs py-2">
          {showForm && !editing ? 'Cancel' : '+ Add Club'}
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 shadow-sm mb-6 border-t-4 border-primary">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">State *</label>
              <select
                value={form.state}
                onChange={e => setForm(p => ({ ...p, state: e.target.value }))}
                required
                className="input-field">
                <option value="">Select state / UT</option>
                {INDIAN_STATES.map(state => (
                  <option key={state} value={state.toUpperCase()}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Region</label>
              <input
                value={form.region}
                onChange={e => setForm(p => ({ ...p, region: e.target.value }))}
                className="input-field"
                placeholder="Optional, e.g. HASSAN"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-gray-600 mb-1">Club Name *</label>
              <input
                value={form.club_name}
                onChange={e => setForm(p => ({ ...p, club_name: e.target.value }))}
                required
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Location</label>
              <input
                value={form.location}
                onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Contact</label>
              <input
                value={form.contact_info}
                onChange={e => setForm(p => ({ ...p, contact_info: e.target.value }))}
                className="input-field"
                placeholder="Phone or primary contact"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Sort Order</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={e => setForm(p => ({ ...p, sort_order: e.target.value }))}
                className="input-field"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-gray-600 mb-1">Notes</label>
              <textarea
                value={form.notes}
                onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                rows={3}
                className="input-field resize-none"
                placeholder="Optional extra line shown under the club card"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Status</label>
              <select
                value={form.is_active}
                onChange={e => setForm(p => ({ ...p, is_active: Number(e.target.value) }))}
                className="input-field">
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary text-xs py-2.5 disabled:opacity-50">
                {saving ? 'Saving...' : editing ? 'Update Club' : 'Add Club'}
              </button>
              <button type="button" onClick={reset} className="btn-outline text-xs py-2.5">Cancel</button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No affiliated club entries yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="text-left py-3 px-4">Club</th>
                  <th className="text-left py-3 px-4">State / Region</th>
                  <th className="text-left py-3 px-4">Location</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-800">{item.club_name}</p>
                      {item.contact_info && <p className="text-xs text-gray-500 mt-1">{item.contact_info}</p>}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      <p>{item.state}</p>
                      {item.region && <p className="text-xs text-gray-400 mt-1">{item.region}</p>}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{item.location || '—'}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-0.5 ${item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {item.is_active ? 'Active' : 'Inactive'}
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
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
