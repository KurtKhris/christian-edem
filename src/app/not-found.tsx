"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import NavBars from "../components/NavBars";

const LINES = [
  { text: "christian@portfolio:~$ cd /this-page", color: "#50fa7b", delay: 500 },
  { text: "bash: cd: /this-page: No such file or directory", color: "#ff5555", delay: 1300 },
  { text: "christian@portfolio:~$ ▌", color: "#50fa7b", delay: 2100 },
];

function TypeLine({ text, color, startDelay }: { text: string; color: string; startDelay: number }) {
  const [displayed, setDisplayed] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setActive(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!active) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, 28);
    return () => clearInterval(t);
  }, [active, text]);

  if (!active) return null;
  return <div style={{ color, whiteSpace: "pre", lineHeight: 1.8 }}>{displayed}</div>;
}

export default function NotFound() {
  return (
    <div className="nf-page">
      <NavBars />
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="nf-content">
        <div className="nf-404" data-text="404">404</div>

        <p className="nf-label">// page_not_found</p>

        <p className="nf-message">
          Looks like this URL took a wrong turn somewhere in the codebase.
        </p>

        <div className="nf-terminal">
          {LINES.map((line, i) => (
            <TypeLine key={i} text={line.text} color={line.color} startDelay={line.delay} />
          ))}
        </div>

        <div className="nf-actions">
          <Link href="/" className="btn-grad">← Back Home</Link>
          <Link href="/#portfolio" className="btn-ghost">View Portfolio</Link>
        </div>
      </div>
    </div>
  );
}
