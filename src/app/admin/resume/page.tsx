'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import {
  getEducation, createEducation, updateEducation, deleteEducation,
  toggleEducationVisibility, updateEducationOrder,
  getWorkExperience, createWorkExperience, updateWorkExperience, deleteWorkExperience,
  toggleWorkExperienceVisibility, updateWorkExperienceOrder,
} from '../../actions/resume';
import { useEffect } from 'react';
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
          <p style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Delete</p>
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

function EducationSection() {
  const [items, setItems] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ title: '', institution: '', period: '' });
  const [showAdd, setShowAdd] = useState(false);
  const [newData, setNewData] = useState({ title: '', institution: '', period: '' });
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => setItems(await getEducation());
  useEffect(() => { load(); }, []);

  const handleAdd = async (e: any) => {
    e.preventDefault(); setSaving(true);
    const fd = new FormData();
    fd.append('title', newData.title);
    fd.append('institution', newData.institution);
    fd.append('period', newData.period);
    await createEducation(fd);
    toast.success('Added!');
    setNewData({ title: '', institution: '', period: '' });
    setShowAdd(false);
    setSaving(false);
    load();
  };

  const handleEdit = async (id: string) => {
    setSaving(true);
    const fd = new FormData();
    fd.append('title', editData.title);
    fd.append('institution', editData.institution);
    fd.append('period', editData.period);
    await updateEducation(id, fd);
    toast.success('Updated!');
    setEditId(null);
    setSaving(false);
    load();
  };

  const handleDelete = async () => {
    setSaving(true);
    await deleteEducation(deleteTarget.id);
    toast.success('Deleted!');
    setDeleteTarget(null);
    setSaving(false);
    load();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Academic Qualifications</h3>
        <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => setShowAdd(true)}>
          + Add
        </button>
      </div>

      {showAdd && (
        <div className="admin-card mb-3">
          <div className="admin-card-body">
            <form onSubmit={handleAdd}>
              <div className="admin-form-group">
                <label className="admin-label">Degree / Title</label>
                <input
                  className="admin-input"
                  placeholder="e.g. B.Tech in IT"
                  value={newData.title}
                  onChange={(e) => setNewData({ ...newData, title: e.target.value })}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Institution</label>
                <input
                  className="admin-input"
                  placeholder="e.g. Ho Technical University"
                  value={newData.institution}
                  onChange={(e) => setNewData({ ...newData, institution: e.target.value })}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Period</label>
                <input
                  className="admin-input"
                  placeholder="e.g. 2018 - 2021"
                  value={newData.period}
                  onChange={(e) => setNewData({ ...newData, period: e.target.value })}
                  required
                />
              </div>
              <div className="d-flex gap-2">
                <button className="admin-btn admin-btn-primary" type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button className="admin-btn admin-btn-secondary" type="button" onClick={() => setShowAdd(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th style={{ width: '60px' }}>#</th>
            <th>Title</th>
            <th>Institution</th>
            <th>Period</th>
            <th style={{ width: '120px' }}>Actions</th>
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
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    className="admin-input"
                    value={editData.institution}
                    onChange={(e) => setEditData({ ...editData, institution: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    className="admin-input"
                    value={editData.period}
                    onChange={(e) => setEditData({ ...editData, period: e.target.value })}
                  />
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="admin-btn admin-btn-success admin-btn-sm" onClick={() => handleEdit(item.id)} disabled={saving}>
                      <SaveIcon fontSize="small" />
                    </button>
                    <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setEditId(null)}>
                      ✕
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
                        updateEducationOrder(item.id, val);
                        load();
                      }
                    }}
                  />
                </td>
                <td className="fw-600">{item.title}</td>
                <td>{item.institution}</td>
                <td>{item.period}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      title="Edit"
                      onClick={() => {
                        setEditId(item.id);
                        setEditData({ title: item.title, institution: item.institution, period: item.period });
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </button>
                    <button
                      className={`admin-btn admin-btn-sm ${item.isVisible ? 'admin-btn-success' : 'admin-btn-secondary'}`}
                      title="Toggle visibility"
                      onClick={async () => {
                        await toggleEducationVisibility(item.id, item.isVisible);
                        load();
                      }}
                    >
                      {item.isVisible ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                    </button>
                    <button
                      className="admin-btn admin-btn-danger admin-btn-sm"
                      title="Delete"
                      onClick={() => setDeleteTarget(item)}
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}
          {items.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                No entries yet
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {deleteTarget && (
        <ConfirmModal
          name={deleteTarget.title}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
          loading={saving}
        />
      )}
    </div>
  );
}

function WorkSection() {
  const [items, setItems] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ title: '', company: '', period: '' });
  const [showAdd, setShowAdd] = useState(false);
  const [newData, setNewData] = useState({ title: '', company: '', period: '' });
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => setItems(await getWorkExperience());
  useEffect(() => { load(); }, []);

  const handleAdd = async (e: any) => {
    e.preventDefault(); setSaving(true);
    const fd = new FormData();
    fd.append('title', newData.title);
    fd.append('company', newData.company);
    fd.append('period', newData.period);
    await createWorkExperience(fd);
    toast.success('Added!');
    setNewData({ title: '', company: '', period: '' });
    setShowAdd(false);
    setSaving(false);
    load();
  };

  const handleEdit = async (id: string) => {
    setSaving(true);
    const fd = new FormData();
    fd.append('title', editData.title);
    fd.append('company', editData.company);
    fd.append('period', editData.period);
    await updateWorkExperience(id, fd);
    toast.success('Updated!');
    setEditId(null);
    setSaving(false);
    load();
  };

  const handleDelete = async () => {
    setSaving(true);
    await deleteWorkExperience(deleteTarget.id);
    toast.success('Deleted!');
    setDeleteTarget(null);
    setSaving(false);
    load();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Work Experience</h3>
        <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => setShowAdd(true)}>
          + Add
        </button>
      </div>

      {showAdd && (
        <div className="admin-card mb-3">
          <div className="admin-card-body">
            <form onSubmit={handleAdd}>
              <div className="admin-form-group">
                <label className="admin-label">Job Title</label>
                <input
                  className="admin-input"
                  placeholder="e.g. Frontend Engineer"
                  value={newData.title}
                  onChange={(e) => setNewData({ ...newData, title: e.target.value })}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Company</label>
                <input
                  className="admin-input"
                  placeholder="e.g. Techieszon"
                  value={newData.company}
                  onChange={(e) => setNewData({ ...newData, company: e.target.value })}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Period</label>
                <input
                  className="admin-input"
                  placeholder="e.g. 2021 - Present"
                  value={newData.period}
                  onChange={(e) => setNewData({ ...newData, period: e.target.value })}
                  required
                />
              </div>
              <div className="d-flex gap-2">
                <button className="admin-btn admin-btn-primary" type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button className="admin-btn admin-btn-secondary" type="button" onClick={() => setShowAdd(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th style={{ width: '60px' }}>#</th>
            <th>Title</th>
            <th>Company</th>
            <th>Period</th>
            <th style={{ width: '120px' }}>Actions</th>
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
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    className="admin-input"
                    value={editData.company}
                    onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    className="admin-input"
                    value={editData.period}
                    onChange={(e) => setEditData({ ...editData, period: e.target.value })}
                  />
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="admin-btn admin-btn-success admin-btn-sm" onClick={() => handleEdit(item.id)} disabled={saving}>
                      <SaveIcon fontSize="small" />
                    </button>
                    <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setEditId(null)}>
                      ✕
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
                        updateWorkExperienceOrder(item.id, val);
                        load();
                      }
                    }}
                  />
                </td>
                <td className="fw-600">{item.title}</td>
                <td>{item.company}</td>
                <td>{item.period}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      title="Edit"
                      onClick={() => {
                        setEditId(item.id);
                        setEditData({ title: item.title, company: item.company, period: item.period });
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </button>
                    <button
                      className={`admin-btn admin-btn-sm ${item.isVisible ? 'admin-btn-success' : 'admin-btn-secondary'}`}
                      title="Toggle visibility"
                      onClick={async () => {
                        await toggleWorkExperienceVisibility(item.id, item.isVisible);
                        load();
                      }}
                    >
                      {item.isVisible ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                    </button>
                    <button
                      className="admin-btn admin-btn-danger admin-btn-sm"
                      title="Delete"
                      onClick={() => setDeleteTarget(item)}
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}
          {items.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', color: 'var(--admin-text-muted)' }}>
                No entries yet
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {deleteTarget && (
        <ConfirmModal
          name={deleteTarget.title}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
          loading={saving}
        />
      )}
    </div>
  );
}

export default function ResumeClient() {
  return (
    <div className="admin-content">
      <AdminHeader title="Resume" userName="Christian Edem" />

      <div className="admin-card mb-4">
        <div className="admin-card-body">
          <EducationSection />
        </div>
      </div>
      <div className="admin-card">
        <div className="admin-card-body">
          <WorkSection />
        </div>
      </div>

      <style jsx>{`
        .fw-600 {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}