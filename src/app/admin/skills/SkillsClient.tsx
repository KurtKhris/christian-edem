"use client";

import React, { useState } from 'react';
import { SkillModal } from '../../../components/SkillModal';
import { deleteSkill, toggleSkillVisibility, updateSkillOrder } from '../../actions/skills';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const SkillsClient = ({ initialSkills }: { initialSkills: any[] }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  const handleCreateNew = () => {
    setSelectedSkill(null);
    setShowModal(true);
  };

  const handleEdit = (skill: any) => {
    setSelectedSkill(skill);
    setShowModal(true);
  };

  const confirmDelete = (skill: any) => {
    setSelectedSkill(skill);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    if (!selectedSkill) return;
    try {
      await deleteSkill(selectedSkill.id);
      toast.success("Skill deleted");
      router.refresh();
    } catch (e) {
      toast.error("Failed to delete skill");
    }
  };

  const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
    try {
      await toggleSkillVisibility(id, !currentStatus);
      toast.success(`Skill ${!currentStatus ? 'visible' : 'hidden'}`);
      router.refresh();
    } catch (error) {
      toast.error("Failed to update visibility");
    }
  };

  const handleOrderChange = async (id: string, newOrder: number) => {
    try {
      await updateSkillOrder(id, newOrder);
      toast.success("Order updated");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update order");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={handleCreateNew}>+ Add New Skill</button>
      </div>

      <div className="bg-dark rounded p-3 text-white border border-secondary mb-5">
        <table className="table table-dark table-hover mb-0">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>Hex Color</th>
              <th>Order</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialSkills.map((s) => (
              <tr key={s.id} className="align-middle">
                <td>
                  {s.image ? (
                    <img src={s.image} alt={s.name} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                  ) : (
                    <span className="text-secondary">-</span>
                  )}
                </td>
                <td className="fw-bold">{s.name}</td>
                <td>
                  <span className="badge rounded-pill" style={{ backgroundColor: s.color || '#333' }}>
                    {s.color || 'None'}
                  </span>
                </td>
                <td>
                  <input 
                    type="number" 
                    className="form-control form-control-sm bg-dark text-white border-secondary" 
                    style={{ width: '80px' }}
                    defaultValue={s.order}
                    onBlur={(e) => {
                      const val = parseInt(e.target.value);
                      if (val !== s.order) handleOrderChange(s.id, val);
                    }}
                  />
                </td>
                <td className="text-end">
                  <button 
                    onClick={() => handleToggleVisibility(s.id, s.isVisible)} 
                    className={`btn btn-sm me-1 ${s.isVisible ? 'btn-success' : 'btn-outline-secondary'}`}
                    title={s.isVisible ? "Hide from homepage" : "Show on homepage"}
                    style={{ borderRadius: '8px' }}
                  >
                    {s.isVisible ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-info me-1" 
                    onClick={() => handleEdit(s)}
                    title="Edit Skill"
                    style={{ borderRadius: '8px' }}
                  >
                    <EditIcon fontSize="small" />
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger px-1" 
                    onClick={() => confirmDelete(s)}
                    title="Delete Skill"
                    style={{ borderRadius: '8px' }}
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
            {initialSkills.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-secondary py-4">No skills found. Add your first skillset!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <SkillModal
        show={showModal}
        onHide={() => setShowModal(false)}
        skill={selectedSkill}
        onSuccess={() => router.refresh()}
      />

      {showConfirm && selectedSkill && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-dark border-0">
              <div className="modal-header bg-danger text-white border-0">
                <h5 className="modal-title fw-bold">Confirm Deletion</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowConfirm(false)}></button>
              </div>
              <div className="modal-body p-4 text-center">
                <p className="fs-5">Are you completely sure you want to delete the tech skill <strong>"{selectedSkill.name}"</strong>?</p>
                <p className="text-muted small">This action is permanent and cannot be undone.</p>
              </div>
              <div className="modal-footer border-0 d-flex justify-content-center">
                <button type="button" className="btn btn-secondary px-4" onClick={() => setShowConfirm(false)}>Cancel</button>
                <button type="button" className="btn btn-danger px-4" onClick={handleDelete}>Yes, Delete It</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
