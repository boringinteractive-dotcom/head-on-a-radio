"use client";

import { useEffect, useState } from "react";

export default function Sidebar({ sections }) {
    const [activeSection, setActiveSection] = useState(sections[0].id);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100; // Offset

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sections]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80, // Offset for sticky navbar
                behavior: "smooth",
            });
        }
    };

    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        className={`sidebar-item ${activeSection === section.id ? "active" : ""}`}
                        onClick={() => scrollToSection(section.id)}
                    >
                        <span className="icon">{activeSection === section.id ? "●" : "○"}</span>
                        <span className="label">{section.title}</span>
                    </button>
                ))}
            </nav>
            <style jsx>{`
        .sidebar {
          position: sticky;
          top: 80px;
          height: calc(100vh - 80px);
          overflow-y: auto;
          padding-right: 1rem;
        }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border: none;
          background: none;
          cursor: pointer;
          text-align: left;
          color: #666;
          font-size: 1rem;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .sidebar-item:hover {
          background-color: #f0f0f0;
          color: var(--text-color);
        }
        .sidebar-item.active {
          color: var(--accent-color);
          font-weight: 600;
          background-color: rgba(0, 85, 255, 0.05);
        }
        .icon {
          font-size: 0.8rem;
          width: 1rem;
          display: flex;
          justify-content: center;
        }
        @media (max-width: 900px) {
          .sidebar {
            display: none; /* Mobile handling to be added */
          }
        }
      `}</style>
        </aside>
    );
}
