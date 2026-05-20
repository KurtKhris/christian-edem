"use client";

import React, { useState, useEffect, useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';

interface TerminalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TerminalOverlay({ isOpen, onClose }: TerminalOverlayProps) {
  const [history, setHistory] = useState<{ cmd: string; output: React.ReactNode }[]>([
    { cmd: "", output: "Welcome to ChristianOS v1.0.0.\nType 'help' to see available commands." }
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let output: React.ReactNode = "";

    switch (trimmed) {
      case "help":
        output = (
          <div>
            Available commands:<br />
            <span style={{ color: "var(--accent-from)" }}>whoami</span>   - About me<br />
            <span style={{ color: "var(--accent-from)" }}>skills</span>   - List my technical skills<br />
            <span style={{ color: "var(--accent-from)" }}>projects</span> - Link to portfolio<br />
            <span style={{ color: "var(--accent-from)" }}>contact</span>  - Get my contact info<br />
            <span style={{ color: "var(--accent-from)" }}>clear</span>    - Clear terminal output<br />
            <span style={{ color: "var(--accent-from)" }}>exit</span>     - Close the terminal<br />
          </div>
        );
        break;
      case "whoami":
        output = "Christian Edem Kpegah. Frontend Software Engineer who turns complex problems into elegant digital solutions.";
        break;
      case "skills":
        output = "React.js, Next.js, React Native, JavaScript, HTML, CSS, Bootstrap, Tailwind, PHP, Python, Git/GitHub, WordPress.";
        break;
      case "projects":
        output = "I have built various web and mobile apps. Scroll down to the Portfolio section to see the magic!";
        break;
      case "contact":
        output = "Email: christiankpegah@gmail.com\nPhone: +233 24 715 4259\nStatus: Available 24/7";
        break;
      case "clear":
        setHistory([]);
        return;
      case "exit":
        onClose();
        return;
      case "sudo rm -rf /":
      case "rm -rf /":
        output = "Nice try. Access denied. This incident will be reported. 🚨";
        break;
      case "":
        output = "";
        break;
      default:
        output = `Command not found: ${trimmed}. Type 'help' for a list of commands.`;
    }

    setHistory((prev) => [...prev, { cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div className="terminal-overlay" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-window" onClick={(e) => e.stopPropagation()}>
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="tb-close" onClick={onClose}></span>
            <span className="tb-min"></span>
            <span className="tb-max"></span>
          </div>
          <div className="terminal-title">christian@portfolio: ~</div>
          <button className="terminal-close-btn" onClick={onClose}><CloseIcon fontSize="small" /></button>
        </div>
        <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
          {history.map((entry, i) => (
            <div key={i} className="terminal-entry">
              {entry.cmd && (
                <div className="terminal-cmd-line">
                  <span className="terminal-prompt">christian@portfolio:~$</span> {entry.cmd}
                </div>
              )}
              {entry.output && (
                <div className="terminal-output" style={{ whiteSpace: "pre-wrap" }}>{entry.output}</div>
              )}
            </div>
          ))}
          <div className="terminal-input-line">
            <span className="terminal-prompt">christian@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="terminal-input"
              autoComplete="off"
            />
          </div>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
}
