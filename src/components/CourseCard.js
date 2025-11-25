"use client";

import Link from "next/link";
import Button from "./Button";

export default function CourseCard({ course }) {
  return (
    <div className="course-card">
      <div className="card-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description}</p>
        <div className="tags">
          {course.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="card-footer">
        <Link href={`/course/${course.slug}`}>
          <Button variant="secondary" className="full-width">
            View Course
          </Button>
        </Link>
      </div>
      <style jsx>{`
        .course-card {
          background: var(--card-bg);
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 18px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          transition: transform 0.3s var(--ease-out), box-shadow 0.3s var(--ease-out);
          position: relative;
          z-index: 1;
        }
        .course-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        .card-content {
          margin-bottom: 1.5rem;
        }
        .course-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          line-height: 1.2;
          letter-spacing: -0.005em;
          color: var(--text-primary);
        }
        .course-description {
          font-size: 1.0625rem;
          color: var(--text-secondary);
          line-height: 1.47059;
          letter-spacing: -0.022em;
          margin-bottom: 1rem;
        }
        .tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .tag {
          font-size: 0.6875rem;
          font-weight: 400;
          background-color: var(--bg-color);
          color: var(--text-secondary);
          padding: 0.25rem 0.625rem;
          border-radius: 100px;
          border: 1px solid var(--border-color);
        }
        .full-width {
          width: 100%;
        }
      `}</style>
    </div>
  );
}
