"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";

export default function WeekPage({ params }) {
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Load HTML content from public/content folder
    const loadContent = async () => {
      try {
        const response = await fetch(`/content/${params.slug}/week-${params.weekId}.html`);
        if (response.ok) {
          const html = await response.text();
          setHtmlContent(html);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [params.slug, params.weekId]);

  if (loading) {
    return (
      <div className="container section" style={{ position: 'relative', zIndex: 1 }}>
        <p>Loading content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container section" style={{ position: 'relative', zIndex: 1 }}>
        <Link href={`/course/${params.slug}`} className="back-link">
          ← Back to Course
        </Link>
        <div className="error-box">
          <h2 className="h3">Content Not Found</h2>
          <p className="body-text">
            The HTML file for this week hasn't been created yet.
          </p>
          <p className="body-text">
            Create a file at: <code>public/content/{params.slug}/week-{params.weekId}.html</code>
          </p>
        </div>
        <style jsx>{`
                    .back-link {
                        display: inline-block;
                        margin-bottom: 2rem;
                        font-size: 0.75rem;
                        color: var(--text-secondary);
                        opacity: 0.8;
                        transition: opacity 0.2s var(--ease-out);
                    }
                    .back-link:hover {
                        opacity: 1;
                    }
                    .error-box {
                        background: var(--card-bg);
                        backdrop-filter: saturate(180%) blur(20px);
                        border: 1px solid var(--glass-border);
                        border-radius: 18px;
                        padding: 2rem;
                        max-width: 600px;
                    }
                    .error-box code {
                        background: var(--bg-color);
                        padding: 0.25rem 0.5rem;
                        border-radius: 4px;
                        font-size: 0.875rem;
                        color: var(--accent-color);
                    }
                `}</style>
      </div>
    );
  }

  return (
    <div className="week-page">
      <div className="container section" style={{ position: 'relative', zIndex: 1 }}>
        <Link href={`/course/${params.slug}`} className="back-link">
          ← Back to Course
        </Link>
        <div className="content-wrapper">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
      <style jsx>{`
                .week-page {
                    min-height: 100vh;
                }
                .back-link {
                    display: inline-block;
                    margin-bottom: 2rem;
                    font-size: 0.75rem;
                    color: var(--text-secondary);
                    opacity: 0.8;
                    transition: opacity 0.2s var(--ease-out);
                }
                .back-link:hover {
                    opacity: 1;
                }
                .content-wrapper {
                    background: var(--card-bg);
                    backdrop-filter: saturate(180%) blur(20px);
                    -webkit-backdrop-filter: saturate(180%) blur(20px);
                    border: 1px solid var(--glass-border);
                    border-radius: 18px;
                    padding: 3rem;
                    box-shadow: var(--shadow-md);
                    max-width: 900px;
                }
                .content-wrapper :global(h1) {
                    font-size: 2.5rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    letter-spacing: -0.01em;
                    color: var(--text-primary);
                }
                .content-wrapper :global(h2) {
                    font-size: 1.75rem;
                    font-weight: 600;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: var(--text-primary);
                }
                .content-wrapper :global(p) {
                    margin-bottom: 1rem;
                    font-size: 1.0625rem;
                    letter-spacing: -0.022em;
                    line-height: 1.47059;
                    color: var(--text-secondary);
                }
                .content-wrapper :global(code) {
                    background: var(--bg-color);
                    padding: 0.2rem 0.4rem;
                    border-radius: 4px;
                    font-family: 'Monaco', 'Courier New', monospace;
                    font-size: 0.9em;
                    color: var(--accent-color);
                }
                .content-wrapper :global(pre) {
                    background: var(--bg-color);
                    padding: 1rem;
                    border-radius: 8px;
                    overflow-x: auto;
                    margin: 1rem 0;
                }
                .content-wrapper :global(pre code) {
                    background: none;
                    padding: 0;
                }
                .content-wrapper :global(ul),
                .content-wrapper :global(ol) {
                    margin-left: 1.5rem;
                    margin-bottom: 1rem;
                }
                .content-wrapper :global(li) {
                    margin-bottom: 0.5rem;
                    line-height: 1.6;
                }
                @media (max-width: 734px) {
                    .content-wrapper {
                        padding: 1.5rem;
                    }
                }
            `}</style>
    </div>
  );
}
