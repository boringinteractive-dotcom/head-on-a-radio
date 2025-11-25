"use client";

import { useState, useEffect, use } from "react";
import { getCourses } from "@/data/dataManager";
import WeekTile from "@/components/WeekTile";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function CoursePage({ params }) {
  const resolvedParams = use(params);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const courses = getCourses();
    const foundCourse = courses.find(c => c.slug === resolvedParams.slug);
    setCourse(foundCourse);
    setLoading(false);
  }, [resolvedParams.slug]);

  if (loading) {
    return <div className="container section">Loading...</div>;
  }

  if (!course) {
    notFound();
  }

  return (
    <main className="container section" style={{ position: 'relative', zIndex: 1 }}>
      <div className="course-header">
        <Link href="/" className="back-link">
          ← Back to Courses
        </Link>
        <div className="tags">
          {course.tags?.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="h1 course-title">{course.title}</h1>
        <p className="body-text course-description">{course.description}</p>
      </div>

      <div className="week-list">
        {course.weeks?.map((week) => (
          <WeekTile key={week.weekNumber} week={week} courseSlug={course.slug} />
        ))}
      </div>

      <style jsx>{`
        .course-header {
          margin-bottom: 4rem;
        }
        .back-link {
          display: inline-block;
          margin-bottom: 1.5rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 400;
          opacity: 0.8;
          transition: opacity 0.2s var(--ease-out);
        }
        .back-link:hover {
          opacity: 1;
        }
        .tags {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
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
        .course-title {
          margin-bottom: 1rem;
        }
        .course-description {
          font-size: 1.0625rem;
        }
        .week-list {
          max-width: 800px;
        }
      `}</style>
    </main>
  );
}
