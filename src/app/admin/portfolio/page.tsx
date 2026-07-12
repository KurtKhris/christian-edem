'use client';

import { useEffect, useState } from 'react';
import { getProjects, toggleProjectVisibility, updateProjectOrder } from '../../actions/portfolio';
import ProjectModal from '../../../components/ProjectModal';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import { toast } from 'react-hot-toast';
import AdminHeader from '../components/AdminHeader';
import { getProjectPreviewImage } from '../../../lib/screenshot';

export default function AdminPortfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenCreate = () => {
    setSelectedProject(null);
    setIsProjectModalOpen(true);
  };

  const handleOpenEdit = (project: any) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleOpenDelete = (project: any) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
    try {
      await toggleProjectVisibility(id, !currentStatus);
      toast.success(`Project ${!currentStatus ? 'visible' : 'hidden'}`);
      fetchProjects();
    } catch (error) {
      toast.error('Failed to update visibility');
    }
  };

  const handleOrderChange = async (id: string, newOrder: number) => {
    try {
      await updateProjectOrder(id, newOrder);
      toast.success('Order updated');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  if (loading) {
    return (
      <div className="admin-content">
        <AdminHeader title="Portfolio" />
        <div className="admin-loading">
          <div className="admin-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-content">
      <AdminHeader title="Portfolio" userName="Christian Edem" />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="admin-badge admin-badge-info">{projects.length} projects</span>
        <button className="admin-btn admin-btn-primary" onClick={handleOpenCreate}>
          + Add Project
        </button>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSuccess={fetchProjects}
      />

      <ConfirmDeleteModal
        project={selectedProject}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={fetchProjects}
      />

      <div className="admin-card">
        <div className="admin-card-body" style={{ padding: 0 }}>
          {projects.length === 0 ? (
            <div className="admin-empty">
              <div className="admin-empty-icon">💼</div>
              <h3 className="admin-empty-title">No projects yet</h3>
              <p className="admin-empty-text">Create your first portfolio project</p>
              <button className="admin-btn admin-btn-primary" onClick={handleOpenCreate}>
                + Add Project
              </button>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th style={{ width: '100px' }}>Priority</th>
                  <th style={{ width: '160px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((proj) => (
                  <tr key={proj.id}>
                    <td>
                      {getProjectPreviewImage(proj) ? (
                        <img
                          src={getProjectPreviewImage(proj)}
                          alt={proj.name}
                          style={{
                            width: 60,
                            height: 40,
                            objectFit: 'cover',
                            borderRadius: '6px',
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 60,
                            height: 40,
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.65rem',
                            color: 'var(--admin-text-muted)',
                          }}
                        >
                          No Img
                        </div>
                      )}
                    </td>
                    <td>
                      <span className="fw-600">{proj.name}</span>
                      {proj.isVisible ? (
                        <span className="admin-badge admin-badge-success ms-2">Visible</span>
                      ) : (
                        <span className="admin-badge admin-badge-warning ms-2">Hidden</span>
                      )}
                    </td>
                    <td>
                      <div
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--admin-text-secondary)',
                          maxWidth: '250px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {proj.description || (
                          <span style={{ fontStyle: 'italic', color: 'var(--admin-text-muted)' }}>
                            No description
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="admin-input"
                        style={{ width: '70px', padding: '0.4rem 0.6rem', fontSize: '0.8rem' }}
                        defaultValue={proj.order}
                        onBlur={(e) => {
                          const val = parseInt(e.target.value);
                          if (val !== proj.order) handleOrderChange(proj.id, val);
                        }}
                      />
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          onClick={() => handleToggleVisibility(proj.id, proj.isVisible)}
                          className={`admin-btn admin-btn-sm admin-btn-icon ${
                            proj.isVisible ? 'admin-btn-success' : 'admin-btn-secondary'
                          }`}
                          title={proj.isVisible ? 'Hide project' : 'Show project'}
                        >
                          {proj.isVisible ? '👁️' : '👁️‍🗨️'}
                        </button>
                        {proj.url && (
                          <a
                            href={proj.url}
                            target="_blank"
                            rel="noreferrer"
                            className="admin-btn admin-btn-secondary admin-btn-sm admin-btn-icon"
                            title="Visit website"
                          >
                            🔗
                          </a>
                        )}
                        <button
                          onClick={() => handleOpenEdit(proj)}
                          className="admin-btn admin-btn-secondary admin-btn-sm admin-btn-icon"
                          title="Edit project"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleOpenDelete(proj)}
                          className="admin-btn admin-btn-danger admin-btn-sm admin-btn-icon"
                          title="Delete project"
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

      <style jsx>{`
        .fw-600 {
          font-weight: 600;
        }
        .ms-2 {
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  );
}