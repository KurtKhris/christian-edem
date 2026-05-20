import type { Metadata } from 'next';
import AdminSidebar from './components/AdminSidebar';
import './admin.css';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Portfolio admin dashboard',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-body">
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}