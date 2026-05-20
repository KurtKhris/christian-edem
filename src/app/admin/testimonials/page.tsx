'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  getAllTestimonials, createTestimonial, updateTestimonial,
  deleteTestimonial, toggleTestimonialVisibility, updateTestimonialOrder,
} from '../../actions/testimonials';
import AdminHeader from '../components/AdminHeader';

function ConfirmModal({ name, onConfirm, onClose, loading }: any) {
  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h3 className="admin-modal-title">Confirm Delete</h3>
          <button className="admin-modal-close" onClick={onClose} disabled={loading}>✕</button>
        </div>
        <div className="admin-modal-body">
          <p style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Delete testimonial from</p>
          <p style={{ textAlign: 'center', fontWeight: 600, color: 'var(--admin-danger)' }}>&quot;{name}&quot;?</p>
          <p style={{ textAlign: 'center', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>
            This action cannot be undone.
          </p>
        </div>
        <div className="admin-modal-footer">
          <button className="admin-btn admin-btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="admin-btn admin-btn-danger" onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ author: '', role: '', content: '' });
  const [showAdd, setShowAdd] = useState(false);
  const [newData, setNewData] = useState({ author: '', role: '', content: '' });
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setItems(await getAllTestimonials());
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e: any) => {
    e.preventDefault(); setSaving(true);
    const fd = new FormData();
    fd.append('author', newData.author);
    fd.append('role', newData.role);
    fd.append('content', newData.content);
    await createTestimonial(fd);
    toast.success('Testimonial added!');
    setNewData({ author: '', role: '', content: '' });
    setShowAdd(false);
    setSaving(false);
    load();
  };

  const handleEdit = async (id: string) => {
    setSaving(true);
    const fd = new FormData();
    fd.append('author', editData.author);
    fd.append('role', editData.role);
    fd.append('content', editData.content);
    await updateTestimonial(id, fd);
    toast.success('Updated!');
    setEditId(null);
    setSaving(false);
    load();
  };

  const handleDelete = async () => {
    setSaving(true);
    await deleteTestimonial(deleteTarget.id);
    toast.success('Deleted!');
    setDeleteTarget(null);
    setSaving(false);
    load();
  };

  if (loading) {
    return (
      <div className="admin-content">
        <AdminHeader title="Testimonials" userName="Christian Edem" />
        <div className="admin-loading">
          <div className="admin-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-content">
      <AdminHeader title="Testimonials" userName="Christian Edem" />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="admin-badge admin-badge-success">{items.length} testimonials</span>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowAdd(true)}>
          + Add Testimonial
        </button>
      </div>

      {showAdd && (
        <div className="admin-card mb-4">
          <div className="admin-card-header">
            <h3 className="admin-card-title">New Testimonial</h3>
            <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setShowAdd(false)}>
              Cancel
            </button>
          </div>
          <div className="admin-card-body">
            <form onSubmit={handleAdd}>
              <div className="admin-form-group">
                <label className="admin-label">Author Name</label>
                <input
                  className="admin-input"
                  placeholder="e.g. John Doe"
                  value={newData.author}
                  onChange={(e) => setNewData({ ...newData, author: e.target.value })}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Role / Company</label>
                <input
                  className="admin-input"
                  placeholder="e.g. CEO at Techcorp"
                  value={newData.role}
                  onChange={(e) => setNewData({ ...newData, role: e.target.value })}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Testimonial Text</label>
                <textarea
                  className="admin-input admin-textarea"
                  rows={3}
                  placeholder="What did they say about your work?"
                  value={newData.content}
                  onChange={(e) => setNewData({ ...newData, content: e.target.value })}
                  required
                />
              </div>
              <button className="admin-btn admin-btn-primary" type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="admin-card">
        <div className="admin-card-body" style={{ padding: 0 }}>
          {items.length === 0 ? (
            <div className="admin-empty">
              <div className="admin-empty-icon">💬</div>
              <h3 className="admin-empty-title">No testimonials yet</h3>
              <p className="admin-empty-text">Add your first testimonial</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>#</th>
                  <th>Author</th>
                  <th>Role</th>
                  <th>Preview</th>
                  <th style={{ width: '140px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) =>
                  editId === item.id ? (
                    <tr key={item.id}>
                      <td>{i + 1}</td>
                      <td>
                        <input
                          className="admin-input"
                          value={editData.author}
                          onChange={(e) => setEditData({ ...editData, author: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          className="admin-input"
                          value={editData.role}
                          onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                        />
                      </td>
                      <td colSpan={2}>
                        <textarea
                          className="admin-input admin-textarea"
                          rows={2}
                          value={editData.content}
                          onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                        />
                        <div className="d-flex gap-2 mt-2">
                          <button
                            className="admin-btn admin-btn-success admin-btn-sm"
                            onClick={() => handleEdit(item.id)}
                            disabled={saving}
                          >
                            Save
                          </button>
                          <button
                            className="admin-btn admin-btn-secondary admin-btn-sm"
                            onClick={() => setEditId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={item.id}>
                      <td>
                        <input
                          type="number"
                          className="admin-input"
                          style={{ width: '55px', padding: '0.4rem' }}
                          defaultValue={item.order}
                          onBlur={(e) => {
                            const val = parseInt(e.target.value, 10) || 0;
                            if (val !== item.order) {
                              updateTestimonialOrder(item.id, val);
                              load();
                            }
                          }}
                        />
                      </td>
                      <td className="fw-600">{item.author}</td>
                      <td>{item.role}</td>
                      <td>
                        <div
                          style={{
                            maxWidth: 250,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: '0.85rem',
                            color: 'var(--admin-text-secondary)',
                          }}
                        >
                          &quot;{item.content}&quot;
                        </div>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            className="admin-btn admin-btn-secondary admin-btn-sm admin-btn-icon"
                            title="Edit"
                            onClick={() => {
                              setEditId(item.id);
                              setEditData({ author: item.author, role: item.role, content: item.content });
                            }}
                          >
                            ✏️
                          </button>
                          <button
                            className={`admin-btn admin-btn-sm admin-btn-icon ${
                              item.isVisible ? 'admin-btn-success' : 'admin-btn-secondary'
                            }`}
                            title="Toggle visibility"
                            onClick={async () => {
                              await toggleTestimonialVisibility(item.id, item.isVisible);
                              load();
                            }}
                          >
                            {item.isVisible ? '👁️' : '👁️‍🗨️'}
                          </button>
                          <button
                            className="admin-btn admin-btn-danger admin-btn-sm admin-btn-icon"
                            title="Delete"
                            onClick={() => setDeleteTarget(item)}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {deleteTarget && (
        <ConfirmModal
          name={deleteTarget.author}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
          loading={saving}
        />
      )}

      <style jsx>{`
        .fw-600 {
          font-weight: 600;
        }
        .mt-2 {
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}