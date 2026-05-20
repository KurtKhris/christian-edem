"use client";

import { useEffect, useRef, useState } from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
}

export default function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setActive(i => (i + 1) % testimonials.length); setAnimating(false); }, 300);
  };

  const prev = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setActive(i => (i - 1 + testimonials.length) % testimonials.length); setAnimating(false); }, 300);
  };

  useEffect(() => {
    if (testimonials.length <= 1) return;
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  const t = testimonials[active];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="section-wrap">
        <div className="text-center mb-5 animate-on-scroll">
          <span className="section-label">What people say</span>
          <h2 className="section-heading">Client <span className="gradient-text">Testimonials</span></h2>
        </div>

        <div className="testimonial-carousel">
          <button className="tcarousel-btn" onClick={prev} aria-label="Previous">
            <ArrowBackIosNewIcon fontSize="small" />
          </button>

          <div className={`testimonial-card ${animating ? "fading" : ""}`}>
            <FormatQuoteIcon className="quote-icon" />
            <p className="testimonial-content">"{t.content}"</p>
            <div className="testimonial-author">
              <div className="author-avatar">{t.author.charAt(0).toUpperCase()}</div>
              <div>
                <p className="author-name">{t.author}</p>
                <p className="author-role">{t.role}</p>
              </div>
            </div>
          </div>

          <button className="tcarousel-btn" onClick={next} aria-label="Next">
            <ArrowForwardIosIcon fontSize="small" />
          </button>
        </div>

        <div className="tcarousel-dots">
          {testimonials.map((_, i) => (
            <button key={i} className={`tdot ${i === active ? "active" : ""}`} onClick={() => setActive(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
