"use client";
import React, { useState, useEffect } from "react";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import pic from "../assets/img/self2.png";
import me from "../assets/img/me.jpg";
import shaking from "../assets/img/shaking.jpg";
import { Footer } from "../components/footer";
import { toast } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import NavBars from "../components/NavBars";
import TechCard from "../components/TechCard";
import { sendContactEmail } from "../app/actions/email";
import { Backdrop, CircularProgress } from "@mui/material";

const ROLES = ["Frontend Engineer", "React Developer", "Mobile App Developer"];
const projectsPerPage = 9;

export const Home = ({ initialProjects = [], initialSkills = [] }: { initialProjects?: any[], initialSkills?: any[] }) => {
  const [verified, setVerified] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(i => (i + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(interval);
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
        <div className="section-wrap w-100">
          <div className="row align-items-center g-5">
            <div className="col-lg-7 hero-content">
              <span className="hero-greeting">👋 Welcome to my world</span>
              <h1 className="hero-name">Hi, I'm Christian</h1>
              <p className="hero-role">
                <span className="rotating">{ROLES[roleIndex]}</span>
              </p>
              <p className="hero-bio">
                Passionate about crafting stunning, high-performance web experiences. I turn complex problems into elegant digital solutions.
              </p>
              <div className="hero-actions">
                <a href="/#portfolio" className="btn-grad">View My Work</a>
                <a
                  href="https://docs.google.com/document/d/1r3WOGWwsnCC6y5ntL2te5uzs002FWzRp4gXz6etb9dI/edit"
                  target="_blank" rel="noreferrer" className="btn-ghost"
                >
                  Download CV
                </a>
              </div>
              <div className="hero-socials">
                <a href="https://www.linkedin.com/in/christian-kpegah-491461165/" target="_blank" rel="noreferrer"><LinkedInIcon fontSize="small" /></a>
                <a href="https://github.com/KurtKhris" target="_blank" rel="noreferrer"><GitHubIcon fontSize="small" /></a>
                <a href="https://twitter.com/kurt_khris" target="_blank" rel="noreferrer"><TwitterIcon fontSize="small" /></a>
                <a href="https://instagram.com/kurtkhris" target="_blank" rel="noreferrer"><InstagramIcon fontSize="small" /></a>
              </div>
            </div>
            <div className="col-lg-5 hero-img-wrap">
              <div className="hero-ring">
                <img src={pic.src} alt="Christian Kpegah" />
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-cue">
          <span>Scroll</span>
          <div className="scroll-dot"></div>
        </div>
      </section>

      <div className="section-sep"></div>

      {/* ── ABOUT ── */}
      <section className="about-section" id="about">
        <div className="section-wrap">
          <div className="row align-items-stretch g-5">
            <div className="col-lg-5" style={{ display: 'flex' }}>
              <div className="about-photo" style={{ flex: 1 }}>
                <img src={me.src} alt="Christian" />
              </div>
            </div>
            <div className="col-lg-7">
              <span className="section-label">Get to know me</span>
              <h2 className="section-heading">About <span className="gradient-text">Me</span></h2>
              <div className="about-bio">
                <p>My name is Christian Edem Kpegah, a Frontend Software Engineer passionate about creating stunning and responsive websites that provide exceptional user experience. With extensive knowledge of HTML, CSS, JavaScript, PHP, Python, React, and React Native, I build dynamic web and mobile applications.</p>
                <p>I pay attention to detail and am committed to delivering high-quality work, constantly staying up-to-date with the latest trends and technologies. I've worked on projects ranging from small landing pages to complex web applications — independently and as part of teams.</p>
                <p>In addition to my technical skills, I have excellent communication and project management abilities, ensuring project goals are met on time and within budget.</p>
              </div>

              <div className="row mt-4 g-4">
                <div className="col-md-6">
                  <h5 className="section-label" style={{ marginBottom: '1rem' }}>Academic Qualification</h5>
                  <div className="timeline">
                    <div className="tl-item">
                      <p className="tl-title">B.Tech in Information & Communication Technology</p>
                      <p className="tl-org">Ho Technical University</p>
                      <p className="tl-period">2021 – 2022</p>
                    </div>
                    <div className="tl-item">
                      <p className="tl-title">HND in Information & Communication Technology</p>
                      <p className="tl-org">Ho Technical University</p>
                      <p className="tl-period">2018 – 2021</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <h5 className="section-label" style={{ marginBottom: '1rem' }}>Work Experience</h5>
                  <div className="timeline">
                    <div className="tl-item">
                      <p className="tl-title">Frontend Engineer / UI/UX</p>
                      <p className="tl-org">Techieszon</p>
                      <p className="tl-period">2021 – Present</p>
                    </div>
                    <div className="tl-item">
                      <p className="tl-title">Web / UI Developer</p>
                      <p className="tl-org">MyGhanaOnline</p>
                      <p className="tl-period">2021 – 2023</p>
                    </div>
                    <div className="tl-item">
                      <p className="tl-title">Junior Frontend Engineer</p>
                      <p className="tl-org">Stanbic Bank Ghana</p>
                      <p className="tl-period">2020 – 2021</p>
                    </div>
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
          <div className="text-center mb-5">
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
            <p className="text-center" style={{ color: 'var(--text-muted)' }}>Skills coming soon...</p>
          )}
        </div>
      </section>

      <div className="section-sep"></div>

      {/* ── PORTFOLIO ── */}
      <section className="portfolio-section" id="portfolio">
        <div className="section-wrap">
          <div className="text-center mb-5">
            <span className="section-label">What I've built</span>
            <h2 className="section-heading">My <span className="gradient-text">Portfolio</span></h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto' }}>
              A selection of projects I've designed and developed. Each one crafted with care and attention to detail.
            </p>
          </div>
          {currentProjects.length > 0 ? (
            <div className="row g-4">
              {currentProjects.map((project: any) => (
                <div className="col-sm-6 col-lg-4" key={project.id}>
                  <div className="port-card">
                    <img src={project.image} alt={project.name} className="port-img" />
                    <div className="port-body">
                      <p className="port-title">{project.name}</p>
                      {project.description && <p className="port-desc">{project.description}</p>}
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noreferrer" className="btn-visit">Visit Website</a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center" style={{ color: 'var(--text-muted)' }}>Projects coming soon...</p>
          )}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center gap-3 mt-5">
              <button className="pag-btn" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>← Previous</button>
              <button className="pag-btn" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next →</button>
            </div>
          )}
        </div>
      </section>

      <div className="section-sep"></div>

      {/* ── CONTACT ── */}
      <section className="contact-section" id="contact">
        <div className="section-wrap">
          <div className="text-center mb-5">
            <span className="section-label">Let's work together</span>
            <h2 className="section-heading">Get In <span className="gradient-text">Touch</span></h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}>
              Feel free to reach out directly or fill the form below — I'll get back to you within 24–48 hours.
            </p>
          </div>
          <div className="row g-5">
            <div className="col-lg-4">
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
              <img src={shaking.src} alt="" style={{ width: '100%', borderRadius: 16, marginTop: '1.5rem', opacity: .85 }} />
              <div className="contact-socials">
                <a href="https://www.linkedin.com/in/christian-kpegah-491461165/" target="_blank" rel="noreferrer" className="soc-link"><LinkedInIcon fontSize="small" /></a>
                <a href="https://github.com/KurtKhris" target="_blank" rel="noreferrer" className="soc-link"><GitHubIcon fontSize="small" /></a>
                <a href="https://twitter.com/kurt_khris" target="_blank" rel="noreferrer" className="soc-link"><TwitterIcon fontSize="small" /></a>
                <a href="https://instagram.com/kurtkhris" target="_blank" rel="noreferrer" className="soc-link"><InstagramIcon fontSize="small" /></a>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="contact-form-wrap">
                <form onSubmit={sendEmail}>
                  <div className="form-row">
                    <input type="text" className="f-input" placeholder="Your Name" value={userName} onChange={e => setUserName(e.target.value)} required />
                    <input type="tel" className="f-input" placeholder="Phone Number" value={userPhone} onChange={e => setUserPhone(e.target.value)} required />
                  </div>
                  <input type="email" className="f-input" style={{ marginBottom: '1rem', display: 'block', width: '100%' }} placeholder="Email Address" value={userEmail} onChange={e => setUserEmail(e.target.value)} required />
                  <textarea className="f-input" placeholder="Your Message" value={userMessage} onChange={e => setUserMessage(e.target.value)} required />
                  <ReCAPTCHA
                    className="mt-2 mb-3"
                    sitekey="6LeHGzQnAAAAADzLZLRxLH-wyHSb76UBIXz9qbQP"
                    onChange={(v) => setVerified(!!v)}
                    theme="dark"
                  />
                  <button className="btn-send" type="submit" disabled={!verified}>
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
      <Footer />
    </div>
  );
};