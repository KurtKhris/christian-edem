"use client";
import React, { useState, useEffect } from 'react';
import logo from "../assets/img/Logo.png";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const NAV_SECTIONS = ['home', 'about', 'skills', 'portfolio', 'contact'];

function NavBars() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const isActive = (section: string) => activeSection === section ? 'active-link' : '';

  return (
    <>
      <nav className={`portfolio-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="/"><img src={logo.src} className="nav-logo" alt="Christian Kpegah" /></a>
          <ul className="nav-links">
            <li><a href="/#about" className={isActive('about')}>About</a></li>
            <li><a href="/#skills" className={isActive('skills')}>Skills</a></li>
            <li><a href="/#portfolio" className={isActive('portfolio')}>Portfolio</a></li>
          </ul>
          <a href="/#contact" className="nav-cta">Contact Me</a>
          <button className="nav-toggler" onClick={() => setMobileOpen(!mobileOpen)} aria-label="toggle menu">
            {mobileOpen ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
          </button>
        </div>
      </nav>
      <div className={`nav-mobile ${mobileOpen ? 'open' : ''}`}>
        <a href="/#about" onClick={() => setMobileOpen(false)}>About</a>
        <a href="/#skills" onClick={() => setMobileOpen(false)}>Skills</a>
        <a href="/#portfolio" onClick={() => setMobileOpen(false)}>Portfolio</a>
        <a href="/#contact" onClick={() => setMobileOpen(false)} className="nav-cta" style={{ textAlign: 'center' }}>Contact Me</a>
      </div>
    </>
  );
}

export default NavBars;
