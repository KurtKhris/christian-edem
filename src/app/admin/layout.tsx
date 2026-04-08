import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex flex-column flex-md-row" style={{ minHeight: '100vh', backgroundColor: '#1a1a1a', height: '100vh', overflow: 'hidden' }}>
      <div className="p-3 text-white bg-dark border-end border-secondary" style={{ width: '250px', overflowY: 'auto' }}>
        <h2>Dashboard</h2>
        <hr />
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link href="/admin" className="nav-link text-white">
              Messages
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link href="/admin/portfolio" className="nav-link text-white">
              Portfolio Projects
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link href="/admin/skills" className="nav-link text-info fw-bold">
              Tech Skills
            </Link>
          </li>
          <li className="nav-item mt-5">
            <Link href="/" className="nav-link text-warning">
              &larr; Back to Site
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-grow-1 p-4" style={{ overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
}
