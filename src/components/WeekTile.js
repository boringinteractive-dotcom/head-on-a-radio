"use client";

import Link from "next/link";
import Button from "./Button";

export default function WeekTile({ week, courseSlug }) {
  return (
    <div className="week-tile">
      <div className="week-info">
        <h3 className="week-title">
          <span className="week-number">Week {week.weekNumber}</span> – {week.title}
        </h3>
        <p className="week-description">{week.description}</p>
      </div>
      <div className="week-action">
        <Link href={`/content/${courseSlug}/week-${week.weekNumber}/index.html`}>
          <Button variant="secondary">Open Week</Button>
        </Link>
      </div>
      <style jsx>{`
        .week-tile {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          margin-bottom: 1rem;
          transition: border-color 0.2s;
        }
        .week-tile:hover {
          border-color: var(--text-color);
        }
        .week-info {
          flex: 1;
          padding-right: 2rem;
        }
        .week-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .week-number {
          color: #666;
          font-weight: 500;
        }
        .week-description {
          font-size: 0.95rem;
          color: #555;
        }
        @media (max-width: 600px) {
          .week-tile {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .week-action {
            width: 100%;
          }
          .week-action :global(button) {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
