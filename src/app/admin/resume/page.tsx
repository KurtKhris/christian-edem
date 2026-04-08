"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import {
  getEducation, createEducation, updateEducation, deleteEducation,
  toggleEducationVisibility, updateEducationOrder,
  getWorkExperience, createWorkExperience, updateWorkExperience, deleteWorkExperience,
  toggleWorkExperienceVisibility, updateWorkExperienceOrder,
} from "../../actions/resume";
import { useEffect } from "react";

// ── Generic Modal ──────────────────────────────────────────────────────────
function ConfirmModal({ name, onConfirm, onClose, loading }: any) {
  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-danger text-white border-0">
            <h5 className="modal-title fw-bold">Confirm Delete</h5>
            <button className="btn-close btn-close-white" onClick={onClose} disabled={loading} />
          </div>
          <div className="modal-body text-center p-4">
            <p className="fs-5 mb-1">Are you sure you want to delete</p>
            <p className="fw-bold fs-4 text-danger">"{name}"?</p>
            <p className="text-muted small">This cannot be undone.</p>
          </div>
          <div className="modal-footer border-0 justify-content-center gap-2">
            <button className="btn btn-secondary px-4" onClick={onClose} disabled={loading}>Cancel</button>
            <button className="btn btn-danger px-4" onClick={onConfirm} disabled={loading}>
              {loading ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Education Section ──────────────────────────────────────────────────────
function EducationSection() {
  const [items, setItems] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ title: "", institution: "", period: "" });
  const [showAdd, setShowAdd] = useState(false);
  const [newData, setNewData] = useState({ title: "", institution: "", period: "" });
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => setItems(await getEducation());
  useEffect(() => { load(); }, []);

  const handleAdd = async (e: any) => {
    e.preventDefault(); setSaving(true);
    const fd = new FormData();
    fd.append("title", newData.title); fd.append("institution", newData.institution); fd.append("period", newData.period);
    await createEducation(fd);
    toast.success("Added!"); setNewData({ title: "", institution: "", period: "" }); setShowAdd(false); setSaving(false); load();
  };

  const handleEdit = async (id: string) => {
    setSaving(true);
    const fd = new FormData();
    fd.append("title", editData.title); fd.append("institution", editData.institution); fd.append("period", editData.period);
    await updateEducation(id, fd);
    toast.success("Updated!"); setEditId(null); setSaving(false); load();
  };

  const handleDelete = async () => {
    setSaving(true);
    await deleteEducation(deleteTarget.id);
    toast.success("Deleted!"); setDeleteTarget(null); setSaving(false); load();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-white mb-0">🎓 Academic Qualifications</h5>
        <button className="btn btn-sm btn-success" onClick={() => setShowAdd(true)}><AddIcon fontSize="small" /> Add</button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="card bg-dark border-secondary p-3 mb-3">
          <div className="row g-2">
            <div className="col-12">
              <label className="form-label text-white small mb-1 fw-bold">Degree / Title</label>
              <input className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="e.g. B.Tech in IT" value={newData.title} onChange={e => setNewData({ ...newData, title: e.target.value })} required />
            </div>
            <div className="col-md-6">
              <label className="form-label text-white small mb-1 fw-bold">Institution</label>
              <input className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="e.g. Ho Technical University" value={newData.institution} onChange={e => setNewData({ ...newData, institution: e.target.value })} required />
            </div>
            <div className="col-md-6">
              <label className="form-label text-white small mb-1 fw-bold">Period</label>
              <input className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="e.g. 2018 - 2021" value={newData.period} onChange={e => setNewData({ ...newData, period: e.target.value })} required />
            </div>
          </div>
          <div className="mt-2 d-flex gap-2">
            <button className="btn btn-sm btn-success" type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
            <button className="btn btn-sm btn-secondary" type="button" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </form>
      )}

      <table className="table table-dark table-hover table-sm">
        <thead><tr><th>#</th><th>Title</th><th>Institution</th><th>Period</th><th>Actions</th></tr></thead>
        <tbody>
          {items.map((item, i) => editId === item.id ? (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td><input className="form-control form-control-sm bg-dark text-white border-secondary" value={editData.title} onChange={e => setEditData({ ...editData, title: e.target.value })} /></td>
              <td><input className="form-control form-control-sm bg-dark text-white border-secondary" value={editData.institution} onChange={e => setEditData({ ...editData, institution: e.target.value })} /></td>
              <td><input className="form-control form-control-sm bg-dark text-white border-secondary" value={editData.period} onChange={e => setEditData({ ...editData, period: e.target.value })} /></td>
              <td>
                <button className="btn btn-sm btn-success me-1" onClick={() => handleEdit(item.id)} disabled={saving}><SaveIcon fontSize="small" /></button>
                <button className="btn btn-sm btn-secondary" onClick={() => setEditId(null)}>✕</button>
              </td>
            </tr>
          ) : (
            <tr key={item.id}>
              <td>
                <input type="number" className="form-control form-control-sm bg-dark text-white border-secondary" style={{ width: 55 }} value={item.order}
                  onChange={async (e) => { await updateEducationOrder(item.id, parseInt(e.target.value, 10) || 0); load(); }} />
              </td>
              <td className="text-white">{item.title}</td>
              <td className="text-white">{item.institution}</td>
              <td className="text-white">{item.period}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary me-1" title="Edit" onClick={() => { setEditId(item.id); setEditData({ title: item.title, institution: item.institution, period: item.period }); }}><EditIcon fontSize="small" /></button>
                <button className="btn btn-sm btn-outline-warning me-1" title="Toggle visibility" onClick={async () => { await toggleEducationVisibility(item.id, item.isVisible); load(); }}>
                  {item.isVisible ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                </button>
                <button className="btn btn-sm btn-outline-danger" title="Delete" onClick={() => setDeleteTarget(item)}><DeleteIcon fontSize="small" /></button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan={5} className="text-center text-muted">No entries yet</td></tr>}
        </tbody>
      </table>

      {deleteTarget && <ConfirmModal name={deleteTarget.title} onConfirm={handleDelete} onClose={() => setDeleteTarget(null)} loading={saving} />}
    </div>
  );
}

// ── Work Experience Section ────────────────────────────────────────────────
function WorkSection() {
  const [items, setItems] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ title: "", company: "", period: "" });
  const [showAdd, setShowAdd] = useState(false);
  const [newData, setNewData] = useState({ title: "", company: "", period: "" });
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => setItems(await getWorkExperience());
  useEffect(() => { load(); }, []);

  const handleAdd = async (e: any) => {
    e.preventDefault(); setSaving(true);
    const fd = new FormData();
    fd.append("title", newData.title); fd.append("company", newData.company); fd.append("period", newData.period);
    await createWorkExperience(fd);
    toast.success("Added!"); setNewData({ title: "", company: "", period: "" }); setShowAdd(false); setSaving(false); load();
  };

  const handleEdit = async (id: string) => {
    setSaving(true);
    const fd = new FormData();
    fd.append("title", editData.title); fd.append("company", editData.company); fd.append("period", editData.period);
    await updateWorkExperience(id, fd);
    toast.success("Updated!"); setEditId(null); setSaving(false); load();
  };

  const handleDelete = async () => {
    setSaving(true);
    await deleteWorkExperience(deleteTarget.id);
    toast.success("Deleted!"); setDeleteTarget(null); setSaving(false); load();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-white mb-0">💼 Work Experience</h5>
        <button className="btn btn-sm btn-success" onClick={() => setShowAdd(true)}><AddIcon fontSize="small" /> Add</button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="card bg-dark border-secondary p-3 mb-3">
          <div className="row g-2">
            <div className="col-12">
              <label className="form-label text-white small mb-1 fw-bold">Job Title</label>
              <input className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="e.g. Frontend Engineer" value={newData.title} onChange={e => setNewData({ ...newData, title: e.target.value })} required />
            </div>
            <div className="col-md-6">
              <label className="form-label text-white small mb-1 fw-bold">Company</label>
              <input className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="e.g. Techieszon" value={newData.company} onChange={e => setNewData({ ...newData, company: e.target.value })} required />
            </div>
            <div className="col-md-6">
              <label className="form-label text-white small mb-1 fw-bold">Period</label>
              <input className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="e.g. 2021 - Present" value={newData.period} onChange={e => setNewData({ ...newData, period: e.target.value })} required />
            </div>
          </div>
          <div className="mt-2 d-flex gap-2">
            <button className="btn btn-sm btn-success" type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
            <button className="btn btn-sm btn-secondary" type="button" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </form>
      )}

      <table className="table table-dark table-hover table-sm">
        <thead><tr><th>#</th><th>Title</th><th>Company</th><th>Period</th><th>Actions</th></tr></thead>
        <tbody>
          {items.map((item, i) => editId === item.id ? (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td><input className="form-control form-control-sm bg-dark text-white border-secondary" value={editData.title} onChange={e => setEditData({ ...editData, title: e.target.value })} /></td>
              <td><input className="form-control form-control-sm bg-dark text-white border-secondary" value={editData.company} onChange={e => setEditData({ ...editData, company: e.target.value })} /></td>
              <td><input className="form-control form-control-sm bg-dark text-white border-secondary" value={editData.period} onChange={e => setEditData({ ...editData, period: e.target.value })} /></td>
              <td>
                <button className="btn btn-sm btn-success me-1" onClick={() => handleEdit(item.id)} disabled={saving}><SaveIcon fontSize="small" /></button>
                <button className="btn btn-sm btn-secondary" onClick={() => setEditId(null)}>✕</button>
              </td>
            </tr>
          ) : (
            <tr key={item.id}>
              <td>
                <input type="number" className="form-control form-control-sm bg-dark text-white border-secondary" style={{ width: 55 }} value={item.order}
                  onChange={async (e) => { await updateWorkExperienceOrder(item.id, parseInt(e.target.value, 10) || 0); load(); }} />
              </td>
              <td className="text-white">{item.title}</td>
              <td className="text-white">{item.company}</td>
              <td className="text-white">{item.period}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary me-1" title="Edit" onClick={() => { setEditId(item.id); setEditData({ title: item.title, company: item.company, period: item.period }); }}><EditIcon fontSize="small" /></button>
                <button className="btn btn-sm btn-outline-warning me-1" title="Toggle visibility" onClick={async () => { await toggleWorkExperienceVisibility(item.id, item.isVisible); load(); }}>
                  {item.isVisible ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                </button>
                <button className="btn btn-sm btn-outline-danger" title="Delete" onClick={() => setDeleteTarget(item)}><DeleteIcon fontSize="small" /></button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan={5} className="text-center text-muted">No entries yet</td></tr>}
        </tbody>
      </table>

      {deleteTarget && <ConfirmModal name={deleteTarget.title} onConfirm={handleDelete} onClose={() => setDeleteTarget(null)} loading={saving} />}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function ResumeClient() {
  return (
    <div className="container-fluid">
      <h2 className="text-white mb-4">Resume Management</h2>
      <div className="card bg-dark border-secondary p-4 mb-4">
        <EducationSection />
      </div>
      <div className="card bg-dark border-secondary p-4">
        <WorkSection />
      </div>
    </div>
  );
}
