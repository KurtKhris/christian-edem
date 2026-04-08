"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { createSkill, updateSkill } from "../app/actions/skills";

interface SkillModalProps {
  show: boolean;
  onHide: () => void;
  skill?: any; // If provided, edit mode. If not, create mode.
  onSuccess: () => void;
}

export const SkillModal: React.FC<SkillModalProps> = ({ show, onHide, skill, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("image") as File;
    
    // Require image on create, optional on edit
    if (!skill && (!imageFile || imageFile.size === 0)) {
      toast.error("Please select an icon image representing the skill", { duration: 3000 });
      setLoading(false);
      return;
    }

    try {
      if (skill) {
        await updateSkill(skill.id, formData);
        toast.success("Skill updated successfully");
      } else {
        await createSkill(formData);
        toast.success("Skill created successfully");
      }
      onSuccess();
      onHide();
    } catch (err: any) {
      toast.error("Error saving skill. Check console or try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark text-white border-secondary">
          <div className="modal-header border-secondary">
            <h5 className="modal-title">{skill ? "Edit Tech Skill" : "Add Tech Skill"}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onHide}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            
            <div className="mb-3">
              <label className="form-label fw-bold">Skill Name <span className="text-danger">*</span></label>
              <input type="text" name="name" className="form-control" required defaultValue={skill?.name || ""} placeholder="e.g. React" />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Hex Color Code</label>
              <input type="text" name="color" className="form-control" defaultValue={skill?.color || ""} placeholder="e.g. #80DEEA" />
              <small className="text-muted">Used for the badge outline decoration.</small>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Skill Logo (transparent PNG recommended) {skill ? "" : <span className="text-danger">*</span>}</label>
              <input type="file" name="image" className="form-control text-dark mb-2" accept="image/*" />
              {skill?.image && (
                <div className="border p-2 rounded bg-light d-inline-block">
                  <img src={skill.image} alt="Current" style={{ height: "40px", objectFit: "contain" }} />
                </div>
              )}
            </div>

            </div>
            <div className="modal-footer border-secondary">
              <button type="button" className="btn btn-secondary" onClick={onHide} disabled={loading}>Close</button>
              <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                {loading ? "Saving..." : "Save Skill"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
