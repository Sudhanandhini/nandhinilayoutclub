import React, { useEffect, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import API from '../services/api';
import toast from 'react-hot-toast';

// ─── CONTACTS ─────────────────────────────────────
export function AdminContacts() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const load = () => {
    setLoading(true);
    API.get(`/admin/contact${filter ? `?status=${filter}` : ''}`)
      .then(res => setInquiries(res.data.data || []))
      .catch(() => toast.error('Failed to load.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/contact/${id}/status`, { status });
      toast.success('Status updated!');
      load();
    } catch { toast.error('Failed to update.'); }
  };

  const handleDelete = async id => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await API.delete(`/admin/contact/${id}`);
      toast.success('Deleted!');
      load();
    } catch { toast.error('Failed.'); }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-800">Contact Inquiries</h1>
          <p className="text-gray-500 text-sm">{inquiries.length} inquiries</p>
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="input-field w-auto py-2 text-sm">
          <option value="">All Status</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      <div className="bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading...</div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-10 text-gray-400">No inquiries found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Subject</th>
                  <th className="text-left py-3 px-4">Message</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.map(inq => (
                  <tr key={inq.id} className={`hover:bg-gray-50 ${inq.status === 'unread' ? 'font-medium' : ''}`}>
                    <td className="py-3 px-4">{inq.name}</td>
                    <td className="py-3 px-4 text-blue-600">{inq.email}</td>
                    <td className="py-3 px-4 max-w-xs truncate">{inq.subject || '—'}</td>
                    <td className="py-3 px-4 max-w-sm">
                      <p className="truncate text-gray-600">{inq.message}</p>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-xs">{new Date(inq.created_at).toLocaleDateString('en-IN')}</td>
                    <td className="py-3 px-4">
                      <select value={inq.status} onChange={e => updateStatus(inq.id, e.target.value)}
                        className={`text-xs border px-2 py-1 ${inq.status === 'unread' ? 'border-red-300 text-red-600' : 'border-gray-200 text-gray-500'}`}>
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedInquiry(inq)}
                        className="text-blue-600 text-xs hover:underline">
                        View
                      </button>
                      <button onClick={() => handleDelete(inq.id)} className="text-red-500 text-xs hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedInquiry(null)}>
          <div
            className="w-full max-w-2xl rounded bg-white shadow-xl"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-gray-800">Contact Inquiry</h2>
                <p className="text-xs text-gray-500">{new Date(selectedInquiry.created_at).toLocaleString('en-IN')}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="text-2xl leading-none text-gray-400 hover:text-gray-700">
                ×
              </button>
            </div>
            <div className="space-y-4 px-6 py-5 text-sm text-gray-700">
              <p><strong>Name:</strong> {selectedInquiry.name}</p>
              <p><strong>Email:</strong> {selectedInquiry.email}</p>
              <p><strong>Subject:</strong> {selectedInquiry.subject || '—'}</p>
              <div>
                <p className="mb-2 font-semibold text-gray-800">Message</p>
                <div className="rounded border bg-gray-50 p-4 whitespace-pre-wrap break-words text-gray-600">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

// ─── MEMBERSHIPS ──────────────────────────────────
export function AdminMemberships() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const load = () => {
    setLoading(true);
    API.get(`/admin/memberships${filter ? `?status=${filter}` : ''}`)
      .then(res => setMemberships(res.data.data || []))
      .catch(() => toast.error('Failed to load.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/memberships/${id}/status`, { status });
      toast.success('Status updated!');
      load();
    } catch { toast.error('Failed.'); }
  };

  const statusColors = { pending: 'text-yellow-600', approved: 'text-green-600', rejected: 'text-red-600' };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-800">Membership Applications</h1>
          <p className="text-gray-500 text-sm">{memberships.length} applications</p>
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="input-field w-auto py-2 text-sm">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading...</div>
        ) : memberships.length === 0 ? (
          <div className="text-center py-10 text-gray-400">No applications found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Phone</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {memberships.map(m => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{m.full_name}</td>
                    <td className="py-3 px-4">{m.email}</td>
                    <td className="py-3 px-4">{m.phone}</td>
                    <td className="py-3 px-4 capitalize">{m.membership_type}</td>
                    <td className="py-3 px-4 text-gray-400 text-xs">{new Date(m.created_at).toLocaleDateString('en-IN')}</td>
                    <td className="py-3 px-4">
                      <select value={m.status} onChange={e => updateStatus(m.id, e.target.value)}
                        className={`text-xs border px-2 py-1 ${statusColors[m.status]} border-gray-200`}>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
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
