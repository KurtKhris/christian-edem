"use client";
import React, { useState, useEffect, useRef } from "react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CodeIcon from '@mui/icons-material/Code';
import pic from "../assets/img/self2.png";
import me from "../assets/img/me.jpg";
import shaking from "../assets/img/shaking.jpg";
import { Footer } from "../components/footer";
import { toast } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import NavBars from "../components/NavBars";
import { getProjectPreviewImage } from "../lib/screenshot";
import TechCard from "../components/TechCard";
import { sendContactEmail } from "../app/actions/email";
import { Backdrop, CircularProgress } from "@mui/material";
import TerminalIcon from '@mui/icons-material/Terminal';
import TerminalOverlay from "../components/TerminalOverlay";
import { trackCVDownload } from "../app/actions/analytics";
import TestimonialSlider from "../components/TestimonialSlider";

const ROLES = ["Full Stack Engineer", "React Developer", "Mobile App Developer"];
const projectsPerPage = 9;

export const Home = ({ initialProjects = [], initialSkills = [], initialEducation = [], initialWork = [], testimonials = [] }: { initialProjects?: any[], initialSkills?: any[], initialEducation?: any[], initialWork?: any[], testimonials?: any[] }) => {
  const [verified, setVerified] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Scroll to top + scroll btn
  useEffect(() => {
    const handleScroll = () => setShowScrollBtn(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Role rotation
  useEffect(() => {
    const interval = setInterval(() => setRoleIndex(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(interval);
  }, []);

  // Terminal toggle hotkey
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") { e.preventDefault(); setIsTerminalOpen(prev => !prev); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // IntersectionObserver scroll animations
  useEffect(() => {
    const els = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const currentProjects = initialProjects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage);
  const totalPages = Math.ceil(initialProjects.length / projectsPerPage);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await sendContactEmail({ name: userName, email: userEmail, phone: userPhone, message: userMessage });
      if (!res.success) { toast.error("Message Not Sent!"); }
      else {
        setUserName(""); setUserEmail(""); setUserPhone(""); setUserMessage("");
        toast.success("Message Sent Successfully!");
      }
    } catch { toast.error("Something went wrong."); }
    finally { setIsLoading(false); }
  };

  return (
    <div>
      <NavBars />
      <Backdrop sx={{ color: '#fff', zIndex: 9999 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* ── HERO ── */}
      <section className="hero-section" id="home">
        {/* Background orbs */}
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        {/* Grid texture overlay */}
        <div className="hero-grid-overlay"></div>

        <div className="section-wrap w-100">
          <div className="row align-items-center g-5">
            <div className="col-lg-7 hero-content">
              <span className="hero-greeting">👋 Welcome to my world</span>
              <h1 className="hero-name">Hi, I'm Christian</h1>
              <p className="hero-role">
                <span className="rotating">{ROLES[roleIndex]}</span>
                <span className="hero-cursor"></span>
              </p>
              <p className="hero-bio">
                Passionate about crafting stunning, high-performance web experiences. I turn complex problems into elegant digital solutions.
              </p>
              <div className="hero-actions">
                <a href="/#portfolio" className="btn-grad">View My Work</a>
                <form action={trackCVDownload} style={{ display: 'inline' }}>
                  <button type="submit" className="btn-ghost">Download CV</button>
                </form>
              </div>
              <div className="hero-socials">
                <a href="https://www.linkedin.com/in/christian-kpegah-491461165/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedInIcon fontSize="small" /></a>
                <a href="https://github.com/KurtKhris" target="_blank" rel="noreferrer" aria-label="GitHub"><GitHubIcon fontSize="small" /></a>
                <a href="https://twitter.com/kurt_khris" target="_blank" rel="noreferrer" aria-label="Twitter"><TwitterIcon fontSize="small" /></a>
                <a href="https://instagram.com/kurtkhris" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon fontSize="small" /></a>
              </div>
            </div>
            <div className="col-lg-5 hero-stats-col">
              <div className="hero-stats-wrap">
                {/* Central glow */}
                <div className="hero-stats-glow"></div>

                <div className="hero-stat-card hero-stat-1">
                  <div className="hero-stat-icon" style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div className="hero-stat-number" style={{ color: '#818cf8' }}>5+</div>
                  <div className="hero-stat-label">Years Experience</div>
                </div>

                <div className="hero-stat-card hero-stat-2">
                  <div className="hero-stat-icon" style={{ background: 'rgba(255,95,109,0.15)', color: '#FF5F6D' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  </div>
                  <div className="hero-stat-number" style={{ color: '#FF5F6D' }}>10+</div>
                  <div className="hero-stat-label">Projects Shipped</div>
                </div>

                <div className="hero-stat-card hero-stat-3">
                  <div className="hero-stat-icon" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                  </div>
                  <div className="hero-stat-number" style={{ color: '#34d399' }}>2</div>
                  <div className="hero-stat-label">Play Store Apps</div>
                </div>

                <div className="hero-stat-card hero-stat-4">
                  <div className="hero-stat-icon" style={{ background: 'rgba(245,158,11,0.15)', color: '#fbbf24' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  </div>
                  <div className="hero-stat-number" style={{ color: '#fbbf24' }}>5</div>
                  <div className="hero-stat-label">Industries Served</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-cue">
          <span>Scroll</span>
          <div className="scroll-chevron"></div>
        </div>
      </section>

      <div className="section-sep"></div>

      {/* ── ABOUT ── */}
      <section className="about-section" id="about">
        <div className="orb orb-1" style={{ width: 400, height: 400, opacity: 0.6 }}></div>
        <div className="section-wrap">
          <div className="row align-items-stretch g-5">
            <div className="col-lg-5 animate-on-scroll" style={{ display: 'flex' }}>
              <div className="about-photo-wrap" style={{ flex: 1 }}>
                <img src={me.src} alt="Christian" />
              </div>
            </div>
            <div className="col-lg-7 animate-on-scroll" style={{ transitionDelay: '0.15s' }}>
              <span className="section-label">Get to know me</span>
              <h2 className="section-heading">About <span className="gradient-text">Me</span></h2>
              <div className="about-bio">
                <p>Full Stack JavaScript Engineer and Technical Lead with 5+ years building production web and mobile applications across fintech, e-commerce, healthcare, banking, and tourism. Specialised in the JavaScript/TypeScript ecosystem, end-to-end React, React Native, and Next.js on the front, Node.js and serverless APIs on the back, with a track record of owning the full product lifecycle from architecture through deployment and support, including apps published to the Google Play Store and systems serving real users.</p>
                <p>Experienced in leading platform development and engineering teams while remaining hands-on in code, with a track record of delivering across fintech, e-commerce, healthcare, and beyond. Experienced in integrating payment gateways (Paystack), real-time systems (Pusher), authentication (NextAuth), and relational databases (PostgreSQL) via modern ORMs (Drizzle, Prisma). Focused on shipping scalable, user-centred products and mentoring the next generation of developers.</p>
              </div>

              <div className="row mt-4 g-4">
                <div className="col-md-6">
                  <h5 className="section-label" style={{ marginBottom: '1rem' }}>Academic Qualification</h5>
                  <div className="timeline">
                    {initialEducation.length > 0 ? initialEducation.map((e: any) => (
                      <div key={e.id} className="tl-item">
                        <p className="tl-title">{e.title}</p>
                        <p className="tl-org">{e.institution}</p>
                        <p className="tl-period">{e.period}</p>
                      </div>
                    )) : (
                      <>
                        <div className="tl-item"><p className="tl-title">B.Tech in Information & Communication Technology</p><p className="tl-org">Ho Technical University</p><p className="tl-period">2021 – 2022</p></div>
                        <div className="tl-item"><p className="tl-title">HND in Information & Communication Technology</p><p className="tl-org">Ho Technical University</p><p className="tl-period">2018 – 2021</p></div>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <h5 className="section-label" style={{ marginBottom: '1rem' }}>Work Experience</h5>
                  <div className="timeline">
                    {initialWork.map((w: any) => (
                      <div key={w.id} className="tl-item">
                        <p className="tl-title">{w.title}</p>
                        <p className="tl-org">{w.company}</p>
                        <p className="tl-period">{w.period}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-sep"></div>

      {/* ── SKILLS ── */}
      <section className="skills-section" id="skills">
        <div className="section-wrap">
          <div className="text-center mb-5 animate-on-scroll">
            <span className="section-label">What I work with</span>
            <h2 className="section-heading">My <span className="gradient-text">Tech Stack</span></h2>
          </div>
          {initialSkills.length > 0 ? (
            <div className="row justify-content-center">
              {initialSkills.map((tech: any, i: number) => (
                <TechCard key={tech.id || i} image={tech.image} name={tech.name} color={tech.color} />
              ))}
            </div>
          ) : (
            <p className="text-center animate-on-scroll" style={{ color: 'var(--text-muted)' }}>Skills coming soon...</p>
          )}
        </div>
      </section>

      <div className="section-sep"></div>

      {/* ── PORTFOLIO ── */}
      <section className="portfolio-section" id="portfolio">
        <div className="orb orb-2" style={{ opacity: 0.5 }}></div>
        <div className="section-wrap">
          <div className="text-center mb-5 animate-on-scroll">
            <span className="section-label">What I've built</span>
            <h2 className="section-heading">My <span className="gradient-text">Portfolio</span></h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto' }}>
              A selection of projects I've designed and developed. Each one crafted with care and attention to detail.
            </p>
          </div>
          {currentProjects.length > 0 ? (
            <div className="row g-4">
              {currentProjects.map((project: any, i: number) => (
                <div className="col-sm-6 col-lg-4" key={project.id}>
                  <div className="port-card">
                    <div className="port-img-wrap">
                      <img src={getProjectPreviewImage(project)} alt={project.name} className="port-img" />
                      <div className="port-img-overlay">
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noreferrer" className="port-overlay-btn" title="Visit Site">
                            <OpenInNewIcon fontSize="small" />
                          </a>
                        )}
                        {project.repoUrl && (
                          <a href={project.repoUrl} target="_blank" rel="noreferrer" className="port-overlay-btn" title="View Code">
                            <CodeIcon fontSize="small" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="port-body">
                      <p className="port-title">{project.name}</p>
                      {project.description && <p className="port-desc">{project.description}</p>}
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="port-tags">
                          {(Array.isArray(project.techStack) ? project.techStack : project.techStack.split(',')).slice(0, 4).map((tag: string, ti: number) => (
                            <span key={ti} className="port-tag">{tag.trim()}</span>
                          ))}
                        </div>
                      )}
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noreferrer" className="btn-visit">Visit Website</a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center animate-on-scroll" style={{ color: 'var(--text-muted)' }}>Projects coming soon...</p>
          )}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center gap-2 mt-5">
              <button className="pag-btn" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} className={`pag-page ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              ))}
              <button className="pag-btn" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
                Next →
              </button>
            </div>
          )}
        </div>
      </section>

      <div className="section-sep"></div>

      <TestimonialSlider testimonials={testimonials} />

      <div className="section-sep"></div>

      {/* ── CONTACT ── */}
      <section className="contact-section" id="contact">
        <div className="orb orb-1" style={{ opacity: 0.5 }}></div>
        <div className="orb orb-2" style={{ width: 300, height: 300, opacity: 0.4 }}></div>
        <div className="section-wrap">
          <div className="text-center mb-5 animate-on-scroll">
            <span className="section-label">Let's work together</span>
            <h2 className="section-heading">Get In <span className="gradient-text">Touch</span></h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}>
              Feel free to reach out directly or fill the form below — I'll get back to you within 24–48 hours.
            </p>
          </div>
          <div className="row g-5">
            <div className="col-lg-4 animate-on-scroll">
              <a href="tel:+233247154259" className="contact-chip">
                <div className="chip-icon"><PhoneIcon fontSize="small" /></div>
                <div><span className="chip-label">Phone</span><span className="chip-value">+233 24 715 4259</span></div>
              </a>
              <a href="https://wa.me/0247154259" target="_blank" rel="noreferrer" className="contact-chip">
                <div className="chip-icon"><WhatsAppIcon fontSize="small" /></div>
                <div><span className="chip-label">WhatsApp</span><span className="chip-value">+233 24 715 4259</span></div>
              </a>
              <a href="mailto:christiankpegah@gmail.com" className="contact-chip">
                <div className="chip-icon"><EmailIcon fontSize="small" /></div>
                <div><span className="chip-label">Email</span><span className="chip-value">christiankpegah@gmail.com</span></div>
              </a>
              <img src={shaking.src} alt="" style={{ width: '100%', borderRadius: 16, marginTop: '1.5rem', opacity: .8, border: '1px solid var(--glass-border)' }} />
              <div className="contact-socials">
                <a href="https://www.linkedin.com/in/christian-kpegah-491461165/" target="_blank" rel="noreferrer" className="soc-link" aria-label="LinkedIn"><LinkedInIcon fontSize="small" /></a>
                <a href="https://github.com/KurtKhris" target="_blank" rel="noreferrer" className="soc-link" aria-label="GitHub"><GitHubIcon fontSize="small" /></a>
                <a href="https://twitter.com/kurt_khris" target="_blank" rel="noreferrer" className="soc-link" aria-label="Twitter"><TwitterIcon fontSize="small" /></a>
                <a href="https://instagram.com/kurtkhris" target="_blank" rel="noreferrer" className="soc-link" aria-label="Instagram"><InstagramIcon fontSize="small" /></a>
              </div>
            </div>
            <div className="col-lg-8 animate-on-scroll" style={{ transitionDelay: '0.15s' }}>
              <div className="contact-form-wrap">
                <form onSubmit={sendEmail}>
                  <div className="form-row">
                    <input type="text" className="f-input" placeholder="Your Name" value={userName} onChange={e => setUserName(e.target.value)} required />
                    <input type="tel" className="f-input" placeholder="Phone Number" value={userPhone} onChange={e => setUserPhone(e.target.value)} required />
                  </div>
                  <input type="email" className="f-input" style={{ marginBottom: '1rem', display: 'block', width: '100%' }} placeholder="Email Address" value={userEmail} onChange={e => setUserEmail(e.target.value)} required />
                  <textarea className="f-input" placeholder="Your Message" value={userMessage} onChange={e => setUserMessage(e.target.value)} required />
                  {/* <ReCAPTCHA
                    className="mt-2 mb-3"
                    sitekey="6LeHGzQnAAAAADzLZLRxLH-wyHSb76UBIXz9qbQP"
                    onChange={(v) => setVerified(!!v)}
                    theme="dark"
                  /> */}
                  <button className="btn-send" type="submit">
                    Send Message →
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FloatingWhatsApp
        phoneNumber="+233247154259"
        accountName="Christian"
        avatar={pic.src}
        statusMessage="Available 24/7"
        allowEsc allowClickAway notification notificationSound darkMode
      />
      <button
        className={`scroll-top-btn ${showScrollBtn ? 'show' : ''}`}
        onClick={scrollToTop}
        title="Scroll to Top"
      >
        <KeyboardArrowUpIcon />
      </button>

      <button
        className="terminal-toggle-btn"
        onClick={() => setIsTerminalOpen(true)}
        title="Open Developer Terminal (~)"
      >
        <TerminalIcon />
      </button>

      <TerminalOverlay isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      <Footer />
    </div>
  );
};
