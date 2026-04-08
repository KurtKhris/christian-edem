"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { deleteProject } from "../app/actions/portfolio";

interface Props {
  project: any;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ConfirmDeleteModal({ project, isOpen, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !project) return null;

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteProject(project.id);
      toast.success("Project deleted successfully");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error("Failed to delete project");
    }
    setLoading(false);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content text-dark border-0">
          <div className="modal-header bg-danger text-white border-0">
            <h5 className="modal-title fw-bold">Confirm Deletion</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4 text-center">
            <p className="fs-5">Are you completely sure you want to delete the project <strong>"{project.name}"</strong>?</p>
            <p className="text-muted small">This action is permanent and cannot be undone.</p>
          </div>
          <div className="modal-footer border-0 d-flex justify-content-center">
            <button type="button" className="btn btn-secondary px-4" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-danger px-4" onClick={handleDelete} disabled={loading}>
              {loading ? "Deleting..." : "Yes, Delete It"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
