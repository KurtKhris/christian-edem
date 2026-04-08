"use client";

import React, { useState } from "react";
import { createProject, updateProject } from "../app/actions/portfolio";
import { toast } from "react-hot-toast";

interface Props {
  project: any | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProjectModal({ project, isOpen, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const isEditing = !!project;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      let res;
      if (isEditing) {
        res = await updateProject(project.id, formData);
      } else {
        res = await createProject(formData);
      }
      
      if (res.success) {
        toast.success(`Project ${isEditing ? 'updated' : 'created'} successfully!`);
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} project`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex={-1}>
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <form onSubmit={handleSubmit} className="modal-content text-dark shadow-lg">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">{isEditing ? 'Edit Project' : 'Add New Project'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Project Name</label>
                <input type="text" name="name" className="form-control" defaultValue={project?.name || ""} required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Live URL <span className="text-muted fw-normal">(Optional)</span></label>
                <input type="url" name="url" className="form-control" defaultValue={project?.url || ""} />
              </div>
            </div>
            
            <div className="mb-3">
              <label className="form-label fw-bold">Description <span className="text-muted fw-normal">(Optional)</span></label>
              <textarea name="description" className="form-control" rows={4} defaultValue={project?.description || ""}></textarea>
            </div>
            
            <div className="mb-4">
              <label className="form-label fw-bold">Cover Image {isEditing && <span className="text-muted fw-normal">(Leave empty to retain existing)</span>}</label>
              <input type="file" name="image" className="form-control mb-2" accept="image/*" required={!isEditing} />
              {isEditing && project?.image && (
                <div className="mt-2 text-center rounded bg-light p-2 border">
                  <span className="d-block text-muted small mb-1">Current Image</span>
                  <img src={project.image} alt="Current" className="img-thumbnail" style={{ height: 120, objectFit: 'contain' }} />
                </div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary px-4" disabled={loading}>
              {loading ? "Processing..." : isEditing ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
