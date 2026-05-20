"use client";

import React, { useState, useEffect, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface TerminalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// Animates string output character by character
function TypedText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    if (!text) return;
    let i = 0;
    const speed = text.length > 120 ? 6 : 16;
    const t = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text]);
  return <span style={{ whiteSpace: "pre-wrap" }}>{displayed}</span>;
}

// Matrix rain easter egg
function MatrixRain() {
  const [chars, setChars] = useState("");
  useEffect(() => {
    const g = "01アイウエオカキクケコﾊﾐﾋｰｳｼﾅﾓﾆｻﾜ@#$%<>{}[]";
    const gen = () =>
      Array.from({ length: 320 }, () => g[Math.floor(Math.random() * g.length)]).join("");
    setChars(gen());
    const t = setInterval(() => setChars(gen()), 60);
    const stop = setTimeout(() => clearInterval(t), 3500);
    return () => { clearInterval(t); clearTimeout(stop); };
  }, []);
  return (
    <div style={{ color: "#00ff41", wordBreak: "break-all", lineHeight: 1.25, fontSize: "0.78rem" }}>
      {chars}
    </div>
  );
}

const NEOFETCH_ASCII = `  ██████╗██╗  ██╗██████╗ ██╗███████╗████████╗
 ██╔════╝██║  ██║██╔══██╗██║██╔════╝╚══██╔══╝
 ██║     ███████║██████╔╝██║███████╗   ██║
 ██║     ██╔══██║██╔══██╗██║╚════██║   ██║
 ╚██████╗██║  ██║██║  ██║██║███████║   ██║
  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝  ╚═╝   `;

const NEOFETCH_INFO = [
  ["OS",        "ChristianOS v1.0.0"],
  ["Host",      "Vercel Cloud · Ghana 🇬🇭"],
  ["Shell",     "Next.js 16 + TypeScript"],
  ["Editor",    "VS Code + GitHub Copilot"],
  ["Languages", "JS · TS · Python · PHP"],
  ["Frontend",  "React · Next.js · React Native"],
  ["Backend",   "Node.js · Prisma · PostgreSQL"],
  ["Uptime",    "5+ years"],
  ["Projects",  "10+ shipped to production"],
  ["Status",    "open-to-work"],
];

const COLORS = ["#ff5f56","#ffbd2e","#27c93f","#8be9fd","#bd93f9","#ff79c6","#50fa7b","#f1fa8c"];

const ALL_CMDS = [
  "help","whoami","neofetch","ls","cat","skills","projects",
  "contact","date","hire","open","download","matrix","clear","exit","sudo",
];

type Entry = { cmd: string; output: React.ReactNode; typed?: boolean };

const WELCOME: Entry = {
  cmd: "",
  output: "ChristianOS v1.0.0 — Type 'help' to see available commands.\nPress ↑↓ for history. Tab to autocomplete.",
  typed: true,
};

export default function TerminalOverlay({ isOpen, onClose }: TerminalOverlayProps) {
  const [history, setHistory] = useState<Entry[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [cmdHist, setCmdHist] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
    if (!isOpen) setPosition(null);
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  const push = (cmd: string, output: React.ReactNode, typed = false) =>
    setHistory(prev => [...prev, { cmd, output, typed }]);

  const handleCommand = (raw: string) => {
    const cmd = raw.trim();
    const lower = cmd.toLowerCase();

    if (!cmd) return;

    setCmdHist(prev => [cmd, ...prev]);
    setHistIdx(-1);

    if (lower === "clear") { setHistory([]); return; }
    if (lower === "exit")  { onClose(); return; }

    if (lower === "help") {
      push(cmd, (
        <div>
          <div style={{ color: "#8be9fd", marginBottom: "0.4rem" }}>Available commands:</div>
          {[
            ["help",           "Show this help menu"],
            ["whoami",         "About Christian"],
            ["neofetch",       "System info (show-off edition)"],
            ["ls",             "List portfolio files"],
            ["cat <file>",     "Read a file — try about.md or skills.txt"],
            ["skills",         "Tech stack summary"],
            ["projects",       "Link to portfolio section"],
            ["open <section>", "Navigate: about · portfolio · skills · contact"],
            ["hire",           "Make the smartest decision of your day"],
            ["contact",        "Contact details"],
            ["date",           "Current date & time"],
            ["download",       "Open CV download"],
            ["matrix",         "???"],
            ["clear",          "Clear terminal"],
            ["exit",           "Close terminal"],
          ].map(([c, d]) => (
            <div key={c}>
              <span style={{ color: "var(--accent-from)", display: "inline-block", minWidth: 160 }}>{c}</span>
              <span style={{ color: "#a0a0b8" }}>{d}</span>
            </div>
          ))}
        </div>
      ));
      return;
    }

    if (lower === "whoami") {
      push(cmd,
        "Christian Edem Kpegah — Software Engineer & Technical Lead.\n" +
        "Building full-stack web and mobile applications for 5+ years.\n" +
        "Currently leading platform development at Gilkup Technologies, Ghana.",
        true
      );
      return;
    }

    if (lower === "neofetch") {
      push(cmd, (
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
          <pre style={{ color: "#50fa7b", fontSize: "0.58rem", lineHeight: 1.22, margin: 0, flexShrink: 0 }}>
            {NEOFETCH_ASCII}
          </pre>
          <div style={{ fontSize: "0.82rem", lineHeight: 1.85 }}>
            <div>
              <span style={{ color: "#50fa7b" }}>christian</span>
              <span style={{ color: "#888" }}>@</span>
              <span style={{ color: "#50fa7b" }}>portfolio</span>
            </div>
            <div style={{ borderBottom: "1px solid #333", marginBottom: "0.3rem" }}>──────────────────────</div>
            {NEOFETCH_INFO.map(([k, v]) => (
              <div key={k}>
                <span style={{ color: "var(--accent-from)" }}>{k}</span>
                <span style={{ color: "#888" }}>: </span>
                {k === "Status"
                  ? <span style={{ color: "#50fa7b" }}>Open to work ✓</span>
                  : <span style={{ color: "#f8f8f2" }}>{v}</span>
                }
              </div>
            ))}
            <div style={{ marginTop: "0.6rem", display: "flex", gap: 6 }}>
              {COLORS.map(c => (
                <span key={c} style={{ background: c, width: 14, height: 14, borderRadius: 2, display: "inline-block" }} />
              ))}
            </div>
          </div>
        </div>
      ));
      return;
    }

    if (lower === "ls") {
      push(cmd, (
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {[
            { name: "about.md",   color: "#8be9fd" },
            { name: "skills.txt", color: "#8be9fd" },
            { name: "projects/",  color: "#50fa7b" },
            { name: "contact/",   color: "#50fa7b" },
            { name: "MyCV.pdf",   color: "#ffb86c" },
          ].map(f => <span key={f.name} style={{ color: f.color }}>{f.name}</span>)}
        </div>
      ));
      return;
    }

    if (lower === "cat about.md") {
      push(cmd,
        "Christian Edem Kpegah\n" +
        "─────────────────────────────────────\n" +
        "Role    : Software Engineer & Technical Lead\n" +
        "Company : Gilkup Technologies (Ghana)\n" +
        "Focus   : Full-stack Web & Mobile Apps\n" +
        "Sectors : Fintech · E-commerce · Healthcare · Banking · Tourism\n" +
        "Apps    : 2 on Google Play Store\n" +
        "Passion : Mentorship & growing engineering teams",
        true
      );
      return;
    }

    if (lower === "cat skills.txt") {
      push(cmd,
        "Frontend  : React · Next.js · TypeScript · HTML/CSS · Bootstrap · Tailwind\n" +
        "Mobile    : React Native (Android & iOS)\n" +
        "Backend   : Node.js · PHP · Python\n" +
        "Database  : PostgreSQL · MySQL · Prisma ORM\n" +
        "Tools     : Git · Docker · VS Code · Figma · GitHub Copilot\n" +
        "Platforms : Vercel · Render · cPanel · Google Play Store",
        true
      );
      return;
    }

    if (lower === "cat mycv.pdf" || lower === "cat cv.pdf") {
      push(cmd, "Binary file. Run 'download' or click the Download CV button in the hero section.", true);
      return;
    }

    if (lower.startsWith("cat ")) {
      push(cmd, `cat: ${cmd.slice(4)}: No such file or directory`, true);
      return;
    }

    if (lower === "skills") {
      push(cmd,
        "React · Next.js · React Native · TypeScript · JavaScript\n" +
        "Node.js · Python · PHP · PostgreSQL · Prisma · Git · Docker · Tailwind · Figma",
        true
      );
      return;
    }

    if (lower === "projects") {
      push(cmd, "10+ projects shipped. Scroll to Portfolio or type 'open portfolio' to jump there.", true);
      return;
    }

    if (lower === "contact") {
      push(cmd,
        "Email    : christiankpegah@gmail.com\n" +
        "Phone    : +233 24 715 4259\n" +
        "LinkedIn : linkedin.com/in/christian-kpegah-491461165\n" +
        "GitHub   : github.com/KurtKhris\n" +
        "Status   : Available for new projects ✓",
        true
      );
      return;
    }

    if (lower === "date") {
      push(cmd, new Date().toLocaleString("en-US", {
        weekday: "long", year: "numeric", month: "long",
        day: "numeric", hour: "2-digit", minute: "2-digit",
        second: "2-digit", timeZoneName: "short",
      }), true);
      return;
    }

    if (lower === "hire" || lower === "hire me") {
      push(cmd,
        "⚡ Excellent taste! Scrolling to contact section...\n\n" +
        "Seriously though — I'd love to hear about your project.",
        true
      );
      setTimeout(() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }), 800);
      return;
    }

    if (lower.startsWith("open ")) {
      const sec = lower.slice(5).trim();
      const map: Record<string, string> = {
        about: "#about", portfolio: "#portfolio",
        skills: "#skills", contact: "#contact", home: "#home",
      };
      if (map[sec]) {
        push(cmd, `Navigating to #${sec}...`, true);
        setTimeout(() => document.querySelector(map[sec])?.scrollIntoView({ behavior: "smooth" }), 400);
      } else {
        push(cmd, `No section '${sec}'. Options: about · portfolio · skills · contact · home`, true);
      }
      return;
    }

    if (lower === "download" || lower === "download cv") {
      push(cmd, "Opening CV in a new tab...", true);
      setTimeout(() => window.open("/MyCV.pdf", "_blank"), 600);
      return;
    }

    if (lower === "matrix") {
      push(cmd, <MatrixRain />);
      return;
    }

    if (lower === "sudo rm -rf /" || lower === "rm -rf /") {
      push(cmd, "Nice try. Access denied. This incident will be reported. 🚨", true);
      return;
    }

    if (lower === "sudo") {
      push(cmd, "Permission denied. You are not in the sudoers file.", true);
      return;
    }

    push(cmd, `command not found: ${cmd}\nType 'help' for available commands.`, true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const trimmed = input.toLowerCase().trim();
      if (!trimmed) return;
      const matches = ALL_CMDS.filter(c => c.startsWith(trimmed));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        push(input, matches.join("   "), false);
      }
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, cmdHist.length - 1);
      setHistIdx(idx);
      if (cmdHist[idx] !== undefined) setInput(cmdHist[idx]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? "" : (cmdHist[idx] ?? ""));
      return;
    }
  };

  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button, .tb-close, .tb-min, .tb-max")) return;
    e.preventDefault();
    const rect = windowRef.current!.getBoundingClientRect();
    dragRef.current = { sx: e.clientX, sy: e.clientY, ox: rect.left, oy: rect.top };

    const onMove = (me: MouseEvent) => {
      if (!dragRef.current) return;
      setPosition({
        x: Math.max(0, dragRef.current.ox + me.clientX - dragRef.current.sx),
        y: Math.max(0, dragRef.current.oy + me.clientY - dragRef.current.sy),
      });
    };
    const onUp = () => {
      dragRef.current = null;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const windowStyle: React.CSSProperties = position
    ? { position: "fixed", left: position.x, top: position.y, transform: "none", width: 740 }
    : {};

  return (
    <div className="terminal-overlay" onClick={() => inputRef.current?.focus()}>
      <div
        ref={windowRef}
        className="terminal-window"
        style={windowStyle}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="terminal-header"
          onMouseDown={onDragStart}
          style={{ cursor: "grab", userSelect: "none" }}
        >
          <div className="terminal-buttons">
            <span className="tb-close" onClick={onClose} title="Close" />
            <span className="tb-min" title="Minimize" />
            <span className="tb-max" title="Maximize" />
          </div>
          <div className="terminal-title">christian@portfolio: ~</div>
          <button className="terminal-close-btn" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </button>
        </div>

        <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
          {history.map((entry, i) => (
            <div key={i} className="terminal-entry">
              {entry.cmd && (
                <div className="terminal-cmd-line">
                  <span className="terminal-prompt">christian@portfolio:~$</span>{" "}{entry.cmd}
                </div>
              )}
              {entry.output !== "" && entry.output != null && (
                <div className="terminal-output">
                  {typeof entry.output === "string" && entry.typed
                    ? <TypedText text={entry.output} />
                    : entry.output}
                </div>
              )}
            </div>
          ))}

          <div className="terminal-input-line">
            <span className="terminal-prompt">christian@portfolio:~$</span>{" "}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
