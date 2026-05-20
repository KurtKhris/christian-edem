'use client';

import { signOut } from 'next-auth/react';
import MenuIcon from '@mui/icons-material/Menu';

interface AdminHeaderProps {
  title: string;
  userName?: string;
}

export default function AdminHeader({ title, userName = 'Admin' }: AdminHeaderProps) {
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="admin-header mb-3">
      <div className="admin-header-left">
        <button
          className="admin-btn admin-btn-secondary admin-btn-icon mobile-menu-btn"
          onClick={() => window.dispatchEvent(new Event('admin-sidebar-toggle'))}
          aria-label="Toggle menu"
        >
          <MenuIcon fontSize="small" />
        </button>
        <h1 className="admin-page-title">{title}</h1>
      </div>

      <div className="admin-header-right">
        <div className="header-user">
          <div className="user-avatar">{initials}</div>
          <div className="user-info">
            <span className="user-name">{userName}</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="admin-btn admin-btn-secondary admin-btn-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
