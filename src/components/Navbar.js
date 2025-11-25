"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <div className="navbar-left">
          <Link href="/" className="logo">
            WEEKWISE
          </Link>
        </div>
        <div className="navbar-center">
          <Link href="/" className="nav-link">
            Courses
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>
        </div>
        <div className="navbar-right">
          <button
            className="btn-icon theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
      <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          background-color: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border-bottom: 1px solid var(--glass-border);
          z-index: 1000;
          height: 44px;
          display: flex;
          align-items: center;
          transition: background-color 0.3s var(--ease-out);
        }
        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .logo {
          font-weight: 600;
          font-size: 1.3125rem;
          letter-spacing: -0.01em;
          color: var(--text-primary);
        }
        .navbar-center {
          display: flex;
          gap: 2rem;
        }
        .nav-link {
          font-weight: 400;
          font-size: 0.75rem;
          color: var(--text-primary);
          opacity: 0.8;
          transition: opacity 0.2s var(--ease-out);
        }
        .nav-link:hover {
          opacity: 1;
        }
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .small {
          font-size: 0.75rem;
          font-weight: 400;
        }
        .theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-primary);
          opacity: 0.8;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.375rem;
          border-radius: 50%;
          transition: opacity 0.2s var(--ease-out), background-color 0.2s var(--ease-out);
        }
        .theme-toggle:hover {
          opacity: 1;
          background-color: rgba(0, 0, 0, 0.05);
        }
        [data-theme='dark'] .theme-toggle:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </nav>
  );
}
