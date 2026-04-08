import React from 'react';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="portfolio-footer">
      <div className="section-wrap">
        <p className="footer-text">
          © {year} <strong className="gradient-text">Christian Edem Kpegah</strong> — All Rights Reserved
        </p>
      </div>
    </footer>
  );
};