'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import DescriptionIcon from '@mui/icons-material/Description';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ArticleIcon from '@mui/icons-material/Article';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const navItems = [
  { href: '/admin',              label: 'Dashboard',    icon: <DashboardIcon fontSize="small" /> },
  { href: '/admin/portfolio',    label: 'Portfolio',    icon: <WorkIcon fontSize="small" /> },
  { href: '/admin/skills',       label: 'Skills',       icon: <FlashOnIcon fontSize="small" /> },
  { href: '/admin/resume',       label: 'Resume',       icon: <DescriptionIcon fontSize="small" /> },
  { href: '/admin/testimonials', label: 'Testimonials', icon: <FormatQuoteIcon fontSize="small" /> },
  { href: '/admin/blog',         label: 'Blog',         icon: <ArticleIcon fontSize="small" /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('admin-sidebar-collapsed');
    if (stored === 'true') setCollapsed(true);
  }, []);

  useEffect(() => {
    const handler = () => setMobileOpen(prev => !prev);
    window.addEventListener('admin-sidebar-toggle', handler);
    return () => window.removeEventListener('admin-sidebar-toggle', handler);
  }, []);

  const toggleCollapse = () => {
    setCollapsed(prev => {
      localStorage.setItem('admin-sidebar-collapsed', String(!prev));
      return !prev;
    });
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link href="/admin" className="sidebar-logo">
            <div className="sidebar-logo-icon">C</div>
            {!collapsed && <span className="sidebar-logo-text">Christian</span>}
          </Link>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section">
            {!collapsed && <div className="sidebar-section-title">Main Menu</div>}
            {navItems.slice(0, 1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${pathname === item.href ? 'active' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <div className="nav-icon">{item.icon}</div>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </div>

          <div className="sidebar-section">
            {!collapsed && <div className="sidebar-section-title">Content</div>}
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${pathname === item.href ? 'active' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <div className="nav-icon">{item.icon}</div>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        </nav>

        <div className="sidebar-footer">
          <Link href="/" className="back-link" title={collapsed ? 'Back to Site' : undefined}>
            <ArrowBackIcon fontSize="small" />
            {!collapsed && <span>Back to Site</span>}
          </Link>
          <button className="sidebar-collapse-btn" onClick={toggleCollapse} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            {collapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
          </button>
        </div>
      </aside>
    </>
  );
}
