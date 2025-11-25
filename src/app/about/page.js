"use client";

import GeometricSphere from "@/components/3d/GeometricSphere";
import Button from "@/components/Button";
import Link from "next/link";

export default function AboutPage() {
    return (
        <>
            <GeometricSphere />
            <div className="about-container">
                <div className="content-card">
                    <h1 className="h1 title">About twoplustwoseven</h1>

                    <p className="body-text lead">
                        twoplustwoseven is a simple, no-nonsense way to learn your courses week by week.
                    </p>

                    <div className="divider"></div>

                    <p className="body-text">
                        We take real lecture transcripts and turn them into clear, interactive lessons with small chunks, quick checks, and clean visuals—so you actually understand what’s being taught, not just copy notes.
                    </p>

                    <div className="highlight-box">
                        <p className="highlight-text">
                            No logins, no clutter, no distractions.
                            <br />
                            Just: pick a course → pick a week → learn.
                        </p>
                    </div>

                    <div className="actions">
                        <Link href="/">
                            <Button variant="primary">Start Learning</Button>
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .about-container {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        
        .content-card {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 4rem;
          max-width: 700px;
          width: 100%;
          box-shadow: var(--shadow-xl);
          animation: floatUp 0.8s var(--ease-out);
        }

        .title {
          text-align: center;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .lead {
          font-size: 1.5rem;
          font-weight: 500;
          text-align: center;
          color: var(--text-primary);
          line-height: 1.4;
          margin-bottom: 2rem;
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-color), transparent);
          margin: 2rem 0;
        }

        .highlight-box {
          background: rgba(0, 113, 227, 0.05);
          border: 1px solid rgba(0, 113, 227, 0.1);
          border-radius: 16px;
          padding: 2rem;
          margin: 2.5rem 0;
          text-align: center;
        }

        .highlight-text {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--accent-color);
          line-height: 1.6;
        }

        .actions {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }

        @keyframes floatUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .content-card {
            padding: 2rem;
          }
          .title {
            font-size: 2.5rem;
          }
          .lead {
            font-size: 1.25rem;
          }
        }
      `}</style>
        </>
    );
}
