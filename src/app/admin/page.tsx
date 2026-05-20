'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getContactMessages, deleteContactMessage } from '../actions/email';
import { getDownloadCount } from '../actions/analytics';
import { toast } from 'react-hot-toast';
import AdminHeader from './components/AdminHeader';
import MetricCard from './components/MetricCard';
import WorkIcon from '@mui/icons-material/Work';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import DescriptionIcon from '@mui/icons-material/Description';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DownloadIcon from '@mui/icons-material/Download';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const shortcuts = [
  { href: '/admin/portfolio',    label: 'Portfolio',    icon: <WorkIcon />,          desc: 'Manage projects',        color: '#6366f1', glow: 'rgba(99,102,241,0.25)' },
  { href: '/admin/skills',       label: 'Skills',       icon: <FlashOnIcon />,       desc: 'Tech stack',             color: '#f59e0b', glow: 'rgba(245,158,11,0.25)' },
  { href: '/admin/resume',       label: 'Resume',       icon: <DescriptionIcon />,   desc: 'Education & work',       color: '#10b981', glow: 'rgba(16,185,129,0.25)' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: <FormatQuoteIcon />,   desc: 'Client reviews',         color: '#ec4899', glow: 'rgba(236,72,153,0.25)' },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { text: 'Good morning', icon: <WbSunnyIcon /> };
  if (h < 17) return { text: 'Good afternoon', icon: <WbTwilightIcon /> };
  return { text: 'Good evening', icon: <NightsStayIcon /> };
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadCount, setDownloadCount] = useState<number>(0);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [msgs, dl] = await Promise.all([getContactMessages(), getDownloadCount()]);
      setMessages(msgs);
      setDownloadCount(dl);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openDelete = (msg: any) => { setSelectedMessage(msg); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setSelectedMessage(null); };
  const openView = (msg: any) => { setSelectedMessage(msg); setShowViewModal(true); };
  const closeView = () => { setShowViewModal(false); setSelectedMessage(null); };

  const confirmDelete = async () => {
    if (!selectedMessage) return;
    setDeleting(true);
    try {
      await deleteContactMessage(selectedMessage.id);
      toast.success('Message deleted');
      fetchData();
      closeModal();
    } catch {
      toast.error('Failed to delete');
    }
    setDeleting(false);
  };

  const greeting = getGreeting();

  if (loading) {
    return (
      <div className="admin-content">
        <AdminHeader title="Dashboard" />
        <div className="dash-skeleton-wrap">
          <div className="dash-skeleton dash-skeleton-banner" />
          <div className="dash-skeleton-row">
            <div className="dash-skeleton dash-skeleton-metric" />
            <div className="dash-skeleton dash-skeleton-metric" />
          </div>
          <div className="dash-skeleton dash-skeleton-section" />
          <div className="dash-skeleton dash-skeleton-section" />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-content">
      <AdminHeader title="Dashboard" userName="Christian Edem" />

      {/* ── Welcome Banner ── */}
      <div className="dash-welcome">
        <div className="dash-welcome-orb dash-welcome-orb-1" />
        <div className="dash-welcome-orb dash-welcome-orb-2" />
        <div className="dash-welcome-inner">
          <div className="dash-greeting-chip">
            {greeting.icon}
            <span>{greeting.text}</span>
          </div>
          <h2 className="dash-welcome-title">Welcome back, <span>Christian</span> 👋</h2>
          <p className="dash-welcome-sub">Here's what's happening with your portfolio today.</p>
          <a href="/" target="_blank" rel="noreferrer" className="dash-visit-btn">
            <OpenInNewIcon fontSize="small" />
            View Live Site
          </a>
        </div>
      </div>

      {/* ── Metric Cards ── */}
      <div className="dash-metrics-row">
        <MetricCard
          label="CV Downloads"
          value={downloadCount}
          icon={<DownloadIcon />}
          gradient="linear-gradient(135deg, #6366f1, #a855f7)"
          glowColor="rgba(99,102,241,0.3)"
          subLabel="All time"
        />
        <MetricCard
          label="Messages"
          value={messages.length}
          icon={<MailOutlineIcon />}
          gradient="linear-gradient(135deg, #10b981, #34d399)"
          glowColor="rgba(16,185,129,0.3)"
          subLabel="In inbox"
        />
      </div>

      {/* ── Quick Access ── */}
      <div className="dash-section-label">Quick Access</div>
      <div className="dash-shortcuts">
        {shortcuts.map(s => (
          <Link key={s.href} href={s.href} className="dash-shortcut" style={{ '--sc-color': s.color, '--sc-glow': s.glow } as React.CSSProperties}>
            <div className="dash-shortcut-icon" style={{ background: s.color + '22', color: s.color }}>
              {s.icon}
            </div>
            <div className="dash-shortcut-label">{s.label}</div>
            <div className="dash-shortcut-desc">{s.desc}</div>
          </Link>
        ))}
      </div>

      {/* ── Messages ── */}
      <div className="dash-section-label" style={{ marginTop: '2rem' }}>
        Recent Messages
        <span className="dash-count-badge">{messages.length}</span>
      </div>
      <div className="admin-card">
        <div className="admin-card-body" style={{ padding: 0 }}>
          {messages.length === 0 ? (
            <div className="admin-empty">
              <div className="admin-empty-icon"><MailOutlineIcon /></div>
              <h3 className="admin-empty-title">No messages yet</h3>
              <p className="admin-empty-text">Contact form submissions will appear here</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Sender</th>
                  <th>Contact</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th style={{ width: 52 }} />
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg.id} className="dash-msg-row" onClick={() => openView(msg)}>
                    <td>
                      <div className="dash-sender">
                        <div className="dash-avatar">{msg.name.charAt(0).toUpperCase()}</div>
                        <span>{msg.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="dash-contact-info">
                        <span>{msg.email}</span>
                        <span>{msg.phone}</span>
                      </div>
                    </td>
                    <td className="dash-msg-preview">{msg.message}</td>
                    <td className="dash-date">
                      {new Date(msg.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td onClick={e => e.stopPropagation()}>
                      <button className="dash-delete-btn" onClick={() => openDelete(msg)} title="Delete">
                        <DeleteOutlineIcon fontSize="small" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── View Message Modal ── */}
      {showViewModal && selectedMessage && (
        <div className="admin-modal-overlay" onClick={closeView}>
          <div className="admin-modal" style={{ maxWidth: 520 }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Message from {selectedMessage.name}</h3>
              <button className="admin-modal-close" onClick={closeView}><CloseIcon fontSize="small" /></button>
            </div>
            <div className="admin-modal-body">
              {/* Sender info */}
              <div className="view-msg-sender">
                <div className="dash-avatar" style={{ width: 46, height: 46, fontSize: '1rem' }}>
                  {selectedMessage.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--admin-text)' }}>{selectedMessage.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)' }}>
                    {new Date(selectedMessage.createdAt).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </div>
              {/* Contact chips */}
              <div className="view-msg-chips">
                <a href={`mailto:${selectedMessage.email}`} className="view-msg-chip">
                  <EmailIcon fontSize="small" />
                  {selectedMessage.email}
                </a>
                {selectedMessage.phone && (
                  <a href={`tel:${selectedMessage.phone}`} className="view-msg-chip">
                    <PhoneIcon fontSize="small" />
                    {selectedMessage.phone}
                  </a>
                )}
              </div>
              {/* Message body */}
              <div className="view-msg-body">
                <div className="view-msg-body-label">Message</div>
                <p className="view-msg-text">{selectedMessage.message}</p>
              </div>
            </div>
            <div className="admin-modal-footer" style={{ justifyContent: 'space-between' }}>
              <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => { const m = selectedMessage; closeView(); openDelete(m); }}>
                <DeleteOutlineIcon fontSize="small" /> Delete
              </button>
              <a href={`mailto:${selectedMessage.email}`} className="admin-btn admin-btn-primary admin-btn-sm">
                <EmailIcon fontSize="small" /> Reply
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Modal ── */}
      {showModal && selectedMessage && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Delete Message</h3>
              <button className="admin-modal-close" onClick={closeModal}><CloseIcon fontSize="small" /></button>
            </div>
            <div className="admin-modal-body" style={{ textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: 'var(--admin-danger)' }}>
                <DeleteOutlineIcon />
              </div>
              <p style={{ marginBottom: '0.5rem', color: 'var(--admin-text)' }}>Delete message from</p>
              <p style={{ fontWeight: 700, color: 'var(--admin-danger)', fontSize: '1.1rem', marginBottom: '0.75rem' }}>"{selectedMessage.name}"?</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>This action cannot be undone.</p>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={closeModal} disabled={deleting}>Cancel</button>
              <button className="admin-btn admin-btn-danger" onClick={confirmDelete} disabled={deleting}>
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .dash-skeleton-wrap { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
        .dash-skeleton { border-radius: 12px; background: linear-gradient(90deg, var(--admin-card-bg) 25%, rgba(255,255,255,0.06) 50%, var(--admin-card-bg) 75%); background-size: 200% 100%; animation: skeleton 1.4s infinite; }
        @keyframes skeleton { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .dash-skeleton-banner { height: 140px; }
        .dash-skeleton-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .dash-skeleton-metric { height: 110px; }
        .dash-skeleton-section { height: 180px; }

        .dash-welcome {
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.08) 50%, rgba(6,8,22,0) 100%);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 16px; padding: 2rem 2.5rem; margin-bottom: 1.5rem;
        }
        .dash-welcome-orb { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(50px); }
        .dash-welcome-orb-1 { width: 260px; height: 260px; background: radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%); top: -80px; right: -60px; }
        .dash-welcome-orb-2 { width: 180px; height: 180px; background: radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%); bottom: -60px; left: 30%; }
        .dash-welcome-inner { position: relative; z-index: 1; }
        .dash-greeting-chip {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.25);
          border-radius: 50px; padding: 0.3rem 0.85rem; font-size: 0.78rem; font-weight: 500;
          color: #a5b4fc; margin-bottom: 0.85rem;
        }
        .dash-welcome-title {
          font-family: 'Space Grotesk', sans-serif; font-size: 1.6rem; font-weight: 700;
          color: var(--admin-text); margin: 0 0 0.4rem; line-height: 1.2;
        }
        .dash-welcome-title span {
          background: var(--admin-gradient); -webkit-background-clip: text;
          -webkit-text-fill-color: transparent; background-clip: text;
        }
        .dash-welcome-sub { color: var(--admin-text-secondary); font-size: 0.875rem; margin: 0 0 1.25rem; }
        .dash-visit-btn {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; padding: 0.45rem 1rem; font-size: 0.8rem; font-weight: 500;
          color: var(--admin-text); text-decoration: none; transition: var(--admin-transition);
        }
        .dash-visit-btn:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.18); color: var(--admin-text); }

        .dash-metrics-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.75rem; }
        @media (max-width: 600px) { .dash-metrics-row { grid-template-columns: 1fr; } }

        .dash-section-label {
          display: flex; align-items: center; gap: 0.6rem;
          font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
          color: var(--admin-text-muted); margin-bottom: 0.75rem;
        }
        .dash-count-badge {
          background: var(--admin-gradient); color: #fff; font-size: 0.65rem;
          font-weight: 700; padding: 0.1rem 0.45rem; border-radius: 50px;
        }

        .dash-shortcuts { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.75rem; margin-bottom: 0; }
        @media (max-width: 1024px) { .dash-shortcuts { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 600px)  { .dash-shortcuts { grid-template-columns: repeat(2, 1fr); } }

        .dash-shortcut {
          display: flex; flex-direction: column; align-items: flex-start;
          padding: 1.1rem 1rem; border-radius: 12px;
          border: 1px solid var(--admin-border);
          background: rgba(255,255,255,0.03);
          text-decoration: none; color: var(--admin-text);
          transition: var(--admin-transition); gap: 0.6rem;
        }
        .dash-shortcut:hover {
          border-color: var(--sc-color); background: var(--sc-glow);
          transform: translateY(-3px); color: var(--admin-text);
          box-shadow: 0 8px 24px var(--sc-glow);
        }
        .dash-shortcut-icon {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          transition: var(--admin-transition);
        }
        .dash-shortcut:hover .dash-shortcut-icon { transform: scale(1.1); }
        .dash-shortcut-label { font-weight: 700; font-size: 0.875rem; color: var(--admin-text); }
        .dash-shortcut-desc { font-size: 0.72rem; color: var(--admin-text-muted); }

        .dash-sender { display: flex; align-items: center; gap: 0.6rem; }
        .dash-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          background: var(--admin-gradient); display: flex; align-items: center;
          justify-content: center; font-weight: 700; font-size: 0.8rem; color: #fff; flex-shrink: 0;
        }
        .dash-sender span { font-weight: 600; font-size: 0.9rem; }
        .dash-contact-info { display: flex; flex-direction: column; gap: 0.15rem; font-size: 0.82rem; color: var(--admin-text-secondary); }
        .dash-msg-preview { max-width: 280px; font-size: 0.82rem; color: var(--admin-text-secondary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .dash-date { font-size: 0.78rem; color: var(--admin-text-muted); white-space: nowrap; }
        .dash-delete-btn {
          width: 32px; height: 32px; border-radius: 8px; background: transparent;
          border: 1px solid var(--admin-border); color: var(--admin-text-muted);
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          transition: var(--admin-transition);
        }
        .dash-delete-btn:hover { background: rgba(239,68,68,0.1); border-color: var(--admin-danger); color: var(--admin-danger); }

        .dash-msg-row { cursor: pointer; }
        .dash-msg-row:hover td { background: rgba(255,255,255,0.03); }

        .view-msg-sender {
          display: flex; align-items: center; gap: 0.85rem;
          padding: 1rem; border-radius: 10px;
          background: rgba(255,255,255,0.03); border: 1px solid var(--admin-border);
          margin-bottom: 1rem;
        }
        .view-msg-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.25rem; }
        .view-msg-chip {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.4rem 0.85rem; border-radius: 50px;
          background: rgba(255,255,255,0.04); border: 1px solid var(--admin-border);
          color: var(--admin-text-secondary); font-size: 0.82rem; text-decoration: none;
          transition: var(--admin-transition);
        }
        .view-msg-chip:hover { border-color: var(--admin-accent); color: var(--admin-accent-hover); background: rgba(99,102,241,0.08); }
        .view-msg-body { background: rgba(255,255,255,0.03); border: 1px solid var(--admin-border); border-radius: 10px; padding: 1rem 1.1rem; }
        .view-msg-body-label { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--admin-text-muted); margin-bottom: 0.6rem; }
        .view-msg-text { color: var(--admin-text); font-size: 0.925rem; line-height: 1.75; margin: 0; white-space: pre-wrap; }
      `}</style>
    </div>
  );
}
