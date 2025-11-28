"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import CourseCard from "@/components/CourseCard";
import ParticleBackground from "@/components/3d/ParticleBackground";
import FeatureOrb from "@/components/FeatureOrb";
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
            <div className="hero-content fade-in">
              <h1 className="h1 hero-title">
                Visual, interactive learning.
              </h1>
              <p className="body-text hero-subtitle">
                twoplustwoseven is an experiment in building understanding through visualization
                and interaction. No fluff, no gamification—just structured content designed
                to help concepts actually stick.
              </p>
              <div className="hero-actions">
                <Button variant="primary" onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}>
                  See what's available
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What We're Building Section */}
        <section className="features-section section">
          <div className="container">
            <h2 className="h2 section-title">What we're building</h2>
            <div className="features-grid">
              <div className="feature-card">
                <FeatureOrb variant="grid" />
                <h3 className="h3 feature-title">Interactive visualizations</h3>
                <p className="body-text feature-description">
                  Graphs, animations, step-by-step debuggers. We're trying to show
                  concepts, not just describe them.
                </p>
              </div>

              <div className="feature-card">
                <FeatureOrb variant="wave" />
                <h3 className="h3 feature-title">Structured progression</h3>
                <p className="body-text feature-description">
                  Content organized into weekly modules. Learn one thing at a time
                  instead of drowning in everything at once.
                </p>
              </div>

              <div className="feature-card">
                <FeatureOrb variant="nodes" />
                <h3 className="h3 feature-title">Minimal interface</h3>
                <p className="body-text feature-description">
                  No social features, no notifications, no progress bars that mean nothing.
                  Just content and tools to understand it.
                </p>
              </div>


            </div>
          </div>
        </section>

        {/* Why This Approach Section */}
        <section className="why-section section">
          <div className="container">
            <div className="why-content">
              <h2 className="h2 section-title">Why this approach</h2>
              <div className="why-grid">
                <div className="why-item">
                  <div className="why-number">01</div>
                  <div>
                    <h3 className="h3">Traditional learning is often passive</h3>
                    <p className="body-text">
                      Reading text or watching videos isn't enough. We learn better when we can
                      manipulate, explore, and see things change in real-time.
                    </p>
                  </div>
                </div>

                <div className="why-item">
                  <div className="why-number">02</div>
                  <div>
                    <h3 className="h3">Information overload kills learning</h3>
                    <p className="body-text">
                      When everything is thrown at you at once, nothing sticks. Breaking content
                      into manageable chunks lets you actually process and retain it.
                    </p>
                  </div>
                </div>

                <div className="why-item">
                  <div className="why-number">03</div>
                  <div>
                    <h3 className="h3">Complexity needs visual representation</h3>
                    <p className="body-text">
                      Some concepts are nearly impossible to grasp from text alone. Seeing
                      algorithms execute, data structures transform, or mathematical relationships
                      visualized makes them click.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course List Section */}
        <section id="courses" className="courses-section section">
          <div className="container">
            <h2 className="h2 section-title">Available content</h2>
            <p className="body-text courses-subtitle">
              Currently working on computational thinking fundamentals. More to come.
            </p>
            <div className="course-grid">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        <style jsx>{`
          /* Hero Section */
          .hero {
            padding-top: 8rem;
            padding-bottom: 6rem;
            text-align: center;
          }
          .hero-content {
            max-width: 720px;
            margin: 0 auto;
          }
          .hero-title {
            margin-bottom: 1.5rem;
          }
          .gradient-text {
            background: linear-gradient(135deg, var(--accent-color) 0%, #0a84ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .hero-subtitle {
            margin: 0 auto 3rem;
            max-width: 620px;
            font-size: 1.125rem;
            line-height: 1.6;
          }
          .hero-actions {
            display: flex;
            gap: 0.75rem;
            justify-content: center;
          }

          /* Features Section */
          .features-section {
            background: linear-gradient(180deg, transparent 0%, rgba(0, 113, 227, 0.02) 100%);
          }
          .section-title {
            text-align: center;
            margin-bottom: 4rem;
          }
          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 2rem;
          }
          .feature-card {
            background: var(--card-bg);
            backdrop-filter: var(--glass-blur);
            border: 1px solid var(--border-color);
            border-radius: 18px;
            padding: 2.5rem 2rem;
            text-align: center;
            transition: all 0.4s var(--ease-out);
            cursor: default;
          }
          .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-xl);
            border-color: var(--accent-color);
          }
          .feature-title {
            margin-bottom: 1rem;
          }
          .feature-description {
            line-height: 1.6;
          }

          /* Why Section */
          .why-section {
            background: transparent;
          }
          .why-grid {
            display: grid;
            gap: 3rem;
            max-width: 800px;
            margin: 0 auto;
          }
          .why-item {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 2rem;
            align-items: start;
          }
          .why-number {
            font-size: 2.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, var(--accent-color) 0%, #0a84ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1;
            padding-top: 0.25rem;
          }
          .why-item h3 {
            margin-bottom: 0.75rem;
          }
          .why-item p {
            line-height: 1.6;
          }

          /* Courses Section */
          .courses-section {
            background: linear-gradient(180deg, rgba(0, 113, 227, 0.02) 0%, transparent 100%);
          }
          .courses-subtitle {
            text-align: center;
            margin-bottom: 3rem;
            font-size: 1.0625rem;
          }
          .course-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
          }

          /* Animations */
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .fade-in {
            animation: fadeIn 0.8s var(--ease-out) forwards;
          }

          /* Responsive */
          @media (max-width: 1068px) {
            .features-grid {
              grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            }
            .why-item {
              grid-template-columns: 1fr;
              gap: 1rem;
            }
            .why-number {
              font-size: 2rem;
            }
          }

          @media (max-width: 734px) {
            .hero {
              padding-top: 4rem;
              padding-bottom: 3rem;
            }
            .hero-subtitle {
              font-size: 1.0625rem;
            }
            .hero-actions {
              flex-direction: column;
              align-items: stretch;
            }
            .features-grid {
              grid-template-columns: 1fr;
            }
            .course-grid {
              grid-template-columns: 1fr;
            }
            .why-number {
              font-size: 1.75rem;
            }
          }
        `}</style>
      </main>
    </>
  );
}
