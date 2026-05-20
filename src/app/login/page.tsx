"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="login-page">
      {/* Background orbs */}
      <div className="login-orb login-orb-1" />
      <div className="login-orb login-orb-2" />

      <div className="login-card">
        {/* Avatar */}
        <div className="login-avatar">
          <LockOutlinedIcon style={{ fontSize: 26, color: "#fff" }} />
        </div>

        <h1 className="login-heading">Welcome back</h1>
        <p className="login-sub">christian<span style={{ color: "#555" }}>@</span>portfolio<span className="login-cursor" /></p>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <EmailOutlinedIcon className="login-field-icon" fontSize="small" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="login-input"
              required
              autoComplete="email"
            />
          </div>

          <div className="login-field">
            <LockOutlinedIcon className="login-field-icon" fontSize="small" />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="login-input"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="login-eye"
              onClick={() => setShowPass(v => !v)}
              tabIndex={-1}
            >
              {showPass
                ? <VisibilityOffOutlinedIcon fontSize="small" />
                : <VisibilityOutlinedIcon fontSize="small" />}
            </button>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <span className="login-spinner" /> : "Sign In →"}
          </button>
        </form>

        <Link href="/" className="login-back">
          <ArrowBackIcon fontSize="small" />
          Back to Portfolio
        </Link>
      </div>
    </div>
  );
}
