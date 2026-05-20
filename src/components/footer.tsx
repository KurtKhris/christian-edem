import React from 'react';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="portfolio-footer">
      <div className="section-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-content mb-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div className="footer-links d-flex gap-4">
            <a href="/#about">About</a>
            <a href="/#portfolio">Portfolio</a>
            <a href="/#contact">Contact</a>
          </div>
          <div className="footer-credits">
            <p className="footer-text m-0">
              © {year} <strong className="gradient-text">Christian Edem Kpegah</strong>
            </p>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', opacity: 0.5, fontSize: '.8rem', margin: 0, textAlign: 'center' }}>
          Designed & Developed by Christian — Ghana
        </p>
      </div>
    </footer>
  );
};
