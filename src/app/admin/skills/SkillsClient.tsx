'use client';

import React, { useState } from 'react';
import { SkillModal } from '../../../components/SkillModal';
import { deleteSkill, toggleSkillVisibility, updateSkillOrder } from '../../actions/skills';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

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
      toast.success('Skill deleted');
      router.refresh();
    } catch (e) {
      toast.error('Failed to delete skill');
    }
  };

  const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
    try {
      await toggleSkillVisibility(id, !currentStatus);
      toast.success(`Skill ${!currentStatus ? 'visible' : 'hidden'}`);
      router.refresh();
    } catch (error) {
      toast.error('Failed to update visibility');
    }
  };

  const handleOrderChange = async (id: string, newOrder: number) => {
    try {
      await updateSkillOrder(id, newOrder);
      toast.success('Order updated');
      router.refresh();
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="admin-badge admin-badge-info">{initialSkills.length} skills</span>
        <button className="admin-btn admin-btn-primary" onClick={handleCreateNew}>
          + Add Skill
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-card-body" style={{ padding: 0 }}>
          {initialSkills.length === 0 ? (
            <div className="admin-empty">
              <div className="admin-empty-icon">⚡</div>
              <h3 className="admin-empty-title">No skills yet</h3>
              <p className="admin-empty-text">Add your first tech skill</p>
              <button className="admin-btn admin-btn-primary" onClick={handleCreateNew}>
                + Add Skill
              </button>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>Icon</th>
                  <th>Name</th>
                  <th style={{ width: '120px' }}>Color</th>
                  <th style={{ width: '100px' }}>Order</th>
                  <th style={{ width: '140px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {initialSkills.map((s) => (
                  <tr key={s.id}>
                    <td>
                      {s.image ? (
                        <img
                          src={s.image}
                          alt={s.name}
                          style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                        />
                      ) : (
                        <span style={{ color: 'var(--admin-text-muted)' }}>-</span>
                      )}
                    </td>
                    <td className="fw-600">{s.name}</td>
                    <td>
                      <span
                        className="admin-badge"
                        style={{
                          backgroundColor: s.color || '#333',
                          color: '#fff',
                        }}
                      >
                        {s.color || 'None'}
                      </span>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="admin-input"
                        style={{ width: '70px', padding: '0.4rem 0.6rem', fontSize: '0.8rem' }}
                        defaultValue={s.order}
                        onBlur={(e) => {
                          const val = parseInt(e.target.value);
                          if (val !== s.order) handleOrderChange(s.id, val);
                        }}
                      />
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          onClick={() => handleToggleVisibility(s.id, s.isVisible)}
                          className={`admin-btn admin-btn-sm admin-btn-icon ${
                            s.isVisible ? 'admin-btn-success' : 'admin-btn-secondary'
                          }`}
                          title={s.isVisible ? 'Hide from homepage' : 'Show on homepage'}
                        >
                          {s.isVisible ? '👁️' : '👁️‍🗨️'}
                        </button>
                        <button
                          className="admin-btn admin-btn-secondary admin-btn-sm admin-btn-icon"
                          onClick={() => handleEdit(s)}
                          title="Edit Skill"
                        >
                          ✏️
                        </button>
                        <button
                          className="admin-btn admin-btn-danger admin-btn-sm admin-btn-icon"
                          onClick={() => confirmDelete(s)}
                          title="Delete Skill"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <SkillModal
        show={showModal}
        onHide={() => setShowModal(false)}
        skill={selectedSkill}
        onSuccess={() => router.refresh()}
      />

      {showConfirm && selectedSkill && (
        <div className="admin-modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Delete Skill</h3>
              <button className="admin-modal-close" onClick={() => setShowConfirm(false)}>
                ✕
              </button>
            </div>
            <div className="admin-modal-body">
              <p style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                Delete the skill
              </p>
              <p style={{ textAlign: 'center', fontWeight: 600, color: 'var(--admin-danger)' }}>
                &quot;{selectedSkill.name}&quot;?
              </p>
              <p style={{ textAlign: 'center', color: 'var(--admin-text-muted)', fontSize: '0.85rem', marginTop: '1rem' }}>
                This action is permanent and cannot be undone.
              </p>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
              <button className="admin-btn admin-btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .fw-600 {
          font-weight: 600;
        }
      `}</style>
    </>
  );
};