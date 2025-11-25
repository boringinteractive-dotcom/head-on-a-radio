"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import CourseCard from "@/components/CourseCard";
import ParticleBackground from "@/components/3d/ParticleBackground";
import { getCourses } from "@/data/dataManager";

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(getCourses());
  }, []);
  return (
    <>
      <ParticleBackground />
      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <section className="hero section">
          <div className="container">
            <div className="hero-content">
              <h1 className="h1 hero-title">Learn Week by Week.</h1>
              <p className="body-text hero-subtitle">
                Master complex subjects through structured, weekly learning.
              </p>
              <div className="hero-actions">
                <Button variant="primary" onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}>
                  Browse Courses
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Course List Section */}
        <section id="courses" className="courses-section section">
          <div className="container">
            <h2 className="h2 section-title">Available Courses</h2>
            <div className="course-grid">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        <style jsx>{`
          .hero {
            padding-top: 6rem;
            padding-bottom: 6rem;
            text-align: center;
          }
          .hero-content {
            max-width: 640px;
            margin: 0 auto;
          }
          .hero-title {
            margin-bottom: 1rem;
          }
          .hero-subtitle {
            margin: 0 auto 2.5rem;
            max-width: 540px;
          }
          .hero-actions {
            display: flex;
            gap: 0.75rem;
            justify-content: center;
          }
          .courses-section {
            background-color: transparent;
          }
          .section-title {
            margin-bottom: 3rem;
            text-align: center;
          }
          .course-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
          }
          @media (max-width: 734px) {
            .hero {
              padding-top: 3rem;
              padding-bottom: 3rem;
            }
            .hero-actions {
              flex-direction: column;
              align-items: stretch;
            }
            .course-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </main>
    </>
  );
}
