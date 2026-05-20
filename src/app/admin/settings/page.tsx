"use client";

import { useState } from "react";
import { changePassword } from "@/app/actions/auth";
import AdminHeader from "../components/AdminHeader";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function SettingsPage() {
  const [current, setCurrent]   = useState("");
  const [next, setNext]         = useState("");
  const [confirm, setConfirm]   = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (next !== confirm) { setError("New passwords do not match."); return; }
    if (next.length < 8)  { setError("New password must be at least 8 characters."); return; }

    setLoading(true);
    const res = await changePassword(current, next);
    setLoading(false);

    if (!res.success) {
      setError(res.error ?? "Something went wrong.");
    } else {
      setSuccess(true);
      setCurrent(""); setNext(""); setConfirm("");
    }
  };

  return (
    <div>
      <AdminHeader title="Settings" />

      <div style={{ maxWidth: 480 }}>
        <div className="admin-card" style={{ padding: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "linear-gradient(135deg, #FF5F6D, #FFC371)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <LockOutlinedIcon style={{ fontSize: 18, color: "#fff" }} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>Change Password</h2>
              <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--admin-text-muted)" }}>Update your admin login password</p>
            </div>
          </div>

          {error && (
            <div className="admin-alert-error" style={{ marginBottom: "1.25rem" }}>
              {error}
            </div>
          )}

          {success && (
            <div className="admin-alert-success" style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CheckCircleOutlineIcon fontSize="small" />
              Password updated successfully.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <PasswordField
              label="Current Password"
              value={current}
              onChange={setCurrent}
              show={showCurrent}
              onToggle={() => setShowCurrent(v => !v)}
            />
            <PasswordField
              label="New Password"
              value={next}
              onChange={setNext}
              show={showNext}
              onToggle={() => setShowNext(v => !v)}
              hint="Minimum 8 characters"
            />
            <PasswordField
              label="Confirm New Password"
              value={confirm}
              onChange={setConfirm}
              show={showConfirm}
              onToggle={() => setShowConfirm(v => !v)}
            />

            <button
              type="submit"
              className="admin-btn-primary"
              disabled={loading || !current || !next || !confirm}
              style={{ marginTop: "0.5rem" }}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function PasswordField({
  label, value, onChange, show, onToggle, hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  hint?: string;
}) {
  return (
    <div>
      <label className="admin-label">{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="admin-input"
          style={{ paddingRight: "3rem" }}
          required
          autoComplete="off"
        />
        <button
          type="button"
          onClick={onToggle}
          style={{
            position: "absolute", right: "0.75rem", top: "50%",
            transform: "translateY(-50%)", background: "none", border: "none",
            color: "var(--admin-text-muted)", cursor: "pointer", display: "flex",
            padding: 4,
          }}
          tabIndex={-1}
        >
          {show ? <VisibilityOffOutlinedIcon fontSize="small" /> : <VisibilityOutlinedIcon fontSize="small" />}
        </button>
      </div>
      {hint && <p style={{ margin: "0.3rem 0 0", fontSize: "0.78rem", color: "var(--admin-text-muted)" }}>{hint}</p>}
    </div>
  );
}
