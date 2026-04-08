"use client";

import { useEffect, useState } from "react";
import { getProjects, toggleProjectVisibility, updateProjectOrder } from "../../actions/portfolio";
import ProjectModal from "../../../components/ProjectModal";
import ConfirmDeleteModal from "../../../components/ConfirmDeleteModal";
import { toast } from "react-hot-toast";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LaunchIcon from '@mui/icons-material/Launch';

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
      toast.error("Failed to update visibility");
    }
  };

  const handleOrderChange = async (id: string, newOrder: number) => {
    try {
      await updateProjectOrder(id, newOrder);
      toast.success("Order updated");
      fetchProjects();
    } catch (error) {
      toast.error("Failed to update order");
    }
  };

  if (loading) return <div className="text-white p-4">Loading portfolio...</div>;

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-white mb-0">Manage Portfolio</h2>
        <button className="btn btn-primary" onClick={handleOpenCreate}>
          + Add New Project
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

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-dark table-hover align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" style={{ width: '100px' }}>Image</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Priority</th>
              <th scope="col" className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-5 text-muted fs-5">No projects found. Add one!</td>
              </tr>
            ) : (
              projects.map(proj => (
                <tr key={proj.id}>
                  <td>
                    {proj.image ? (
                      <img src={proj.image} alt={proj.name} className="img-thumbnail" style={{ width: 80, height: 50, objectFit: 'cover' }} />
                    ) : (
                      <div className="bg-secondary rounded text-center text-white" style={{ width: 80, height: 50, lineHeight: '50px', fontSize: '10px' }}>No Img</div>
                    )}
                  </td>
                  <td className="fw-bold">{proj.name}</td>
                  <td>
                    <div className="text-truncate" style={{ maxWidth: '300px' }}>
                      {proj.description || <span className="text-muted fst-italic">No description</span>}
                    </div>
                  </td>
                  <td>
                    <input 
                      type="number" 
                      className="form-control form-control-sm bg-dark text-white border-secondary" 
                      style={{ width: '80px' }}
                      defaultValue={proj.order}
                      onBlur={(e) => {
                        const val = parseInt(e.target.value);
                        if (val !== proj.order) handleOrderChange(proj.id, val);
                      }}
                    />
                  </td>
                  <td className="text-end">
                    <button 
                      onClick={() => handleToggleVisibility(proj.id, proj.isVisible)} 
                      className={`btn btn-sm me-1 ${proj.isVisible ? 'btn-success' : 'btn-outline-secondary'}`}
                      title={proj.isVisible ? "Hide from homepage" : "Show on homepage"}
                      style={{ borderRadius: '8px' }}
                    >
                      {proj.isVisible ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                    </button>
                    {proj.url && (
                      <a 
                        href={proj.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn btn-sm btn-outline-light me-1"
                        title="Visit Website"
                        style={{ borderRadius: '8px' }}
                      >
                        <LaunchIcon fontSize="small" />
                      </a>
                    )}
                    <button 
                      onClick={() => handleOpenEdit(proj)} 
                      className="btn btn-sm btn-info me-1 text-white"
                      title="Edit Project"
                      style={{ borderRadius: '8px' }}
                    >
                      <EditIcon fontSize="small" />
                    </button>
                    <button 
                      onClick={() => handleOpenDelete(proj)} 
                      className="btn btn-sm btn-danger px-1"
                      title="Delete Project"
                      style={{ borderRadius: '8px' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
