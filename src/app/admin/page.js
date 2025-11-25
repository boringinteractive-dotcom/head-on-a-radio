"use client";

import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { getCourses, addCourse, updateCourse, deleteCourse, addWeek, updateWeek, deleteWeek } from "@/data/dataManager";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Modal states
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showEditCourse, setShowEditCourse] = useState(false);
  const [showAddWeek, setShowAddWeek] = useState(false);
  const [showEditWeek, setShowEditWeek] = useState(false);
  const [editingWeek, setEditingWeek] = useState(null);

  // Form states
  const [courseForm, setCourseForm] = useState({ title: "", description: "", tags: "" });
  const [weekForm, setWeekForm] = useState({ title: "", description: "" });

  useEffect(() => {
    if (isLoggedIn) {
      loadCourses();
    }
  }, [isLoggedIn]);

  const loadCourses = () => {
    const loadedCourses = getCourses();
    setCourses(loadedCourses);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin") {
      setIsLoggedIn(true);
    } else {
      alert("Incorrect password (try 'admin')");
    }
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const newCourse = addCourse({
      title: courseForm.title,
      description: courseForm.description,
      tags: courseForm.tags.split(',').map(t => t.trim()).filter(Boolean)
    });
    loadCourses();
    setShowAddCourse(false);
    setCourseForm({ title: "", description: "", tags: "" });
  };

  const handleEditCourse = (e) => {
    e.preventDefault();
    updateCourse(selectedCourse.id, {
      title: courseForm.title,
      description: courseForm.description,
      tags: courseForm.tags.split(',').map(t => t.trim()).filter(Boolean)
    });
    loadCourses();
    setShowEditCourse(false);
    setCourseForm({ title: "", description: "", tags: "" });
  };

  const handleDeleteCourse = (courseId) => {
    if (confirm("Are you sure you want to delete this course?")) {
      deleteCourse(courseId);
      loadCourses();
      setSelectedCourse(null);
    }
  };

  const handleAddWeek = (e) => {
    e.preventDefault();
    addWeek(selectedCourse.id, weekForm);
    loadCourses();
    setShowAddWeek(false);
    setWeekForm({ title: "", description: "" });
  };

  const handleEditWeek = (e) => {
    e.preventDefault();
    updateWeek(selectedCourse.id, editingWeek.weekNumber, weekForm);
    loadCourses();
    setShowEditWeek(false);
    setEditingWeek(null);
    setWeekForm({ title: "", description: "" });
  };

  const handleDeleteWeek = (weekNumber) => {
    if (confirm("Are you sure you want to delete this week?")) {
      deleteWeek(selectedCourse.id, weekNumber);
      loadCourses();
    }
  };

  const openEditCourse = (course) => {
    setCourseForm({
      title: course.title,
      description: course.description,
      tags: course.tags.join(', ')
    });
    setShowEditCourse(true);
  };

  const openEditWeek = (week) => {
    setEditingWeek(week);
    setWeekForm({
      title: week.title,
      description: week.description || ""
    });
    setShowEditWeek(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h1 className="h2 title">Admin Access</h1>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="full-width">Login</Button>
          </form>
        </div>
        <style jsx>{`
          .login-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 80vh;
          }
          .login-card {
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            padding: 3rem;
            border-radius: 24px;
            border: 1px solid var(--glass-border);
            width: 100%;
            max-width: 400px;
            text-align: center;
            box-shadow: var(--shadow-lg);
            position: relative;
            z-index: 1;
          }
          .title {
            margin-bottom: 2rem;
            color: var(--text-primary);
          }
          .login-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .input {
            padding: 0.75rem;
            border: 1px solid var(--border-color);
            background-color: var(--bg-color);
            color: var(--text-primary);
            border-radius: 8px;
            font-size: 1rem;
            width: 100%;
            transition: border-color 0.2s;
          }
          .input:focus {
            outline: none;
            border-color: var(--accent-color);
            box-shadow: 0 0 0 2px rgba(0, 113, 227, 0.1);
          }
          .full-width {
            width: 100%;
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <div className="admin-dashboard container section">
        <div className="dashboard-header">
          <h1 className="h2">Admin Dashboard</h1>
          <Button variant="secondary" onClick={() => setIsLoggedIn(false)}>Logout</Button>
        </div>

        <div className="dashboard-grid">
          <div className="course-list-col">
            <div className="col-header">
              <h2 className="h3">Courses</h2>
              <Button variant="primary" className="small-btn" onClick={() => setShowAddCourse(true)}>Add New</Button>
            </div>
            <div className="list">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className={`list-item ${selectedCourse?.id === course.id ? "active" : ""}`}
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className="item-info">
                    <div className="item-title">{course.title}</div>
                    <div className="item-meta">{course.weeks?.length || 0} weeks</div>
                  </div>
                  <div className="item-actions">
                    <Button variant="secondary" className="tiny-btn" onClick={(e) => { e.stopPropagation(); openEditCourse(course); }}>Edit</Button>
                    <Button variant="secondary" className="tiny-btn danger" onClick={(e) => { e.stopPropagation(); handleDeleteCourse(course.id); }}>Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="details-col">
            {selectedCourse ? (
              <>
                <div className="col-header">
                  <h2 className="h3">{selectedCourse.title}</h2>
                  <Button variant="primary" className="small-btn" onClick={() => setShowAddWeek(true)}>Add Week</Button>
                </div>
                <div className="weeks-list">
                  {selectedCourse.weeks?.map((week) => (
                    <div key={week.weekNumber} className="week-item">
                      <div className="week-info">
                        <span className="week-num">Week {week.weekNumber}</span>
                        <span className="week-title">{week.title}</span>
                      </div>
                      <div className="week-actions">
                        <Button variant="secondary" className="tiny-btn" onClick={() => openEditWeek(week)}>Edit</Button>
                        <Button variant="secondary" className="tiny-btn danger" onClick={() => handleDeleteWeek(week.weekNumber)}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="empty-state">
                Select a course to manage its content.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Course Modal */}
      <Modal isOpen={showAddCourse} onClose={() => setShowAddCourse(false)} title="Add New Course">
        <form onSubmit={handleAddCourse} className="form">
          <input
            type="text"
            placeholder="Course Title"
            className="input"
            value={courseForm.title}
            onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            className="input textarea"
            value={courseForm.description}
            onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="input"
            value={courseForm.tags}
            onChange={(e) => setCourseForm({ ...courseForm, tags: e.target.value })}
          />
          <Button type="submit" className="full-width">Add Course</Button>
        </form>
      </Modal>

      {/* Edit Course Modal */}
      <Modal isOpen={showEditCourse} onClose={() => setShowEditCourse(false)} title="Edit Course">
        <form onSubmit={handleEditCourse} className="form">
          <input
            type="text"
            placeholder="Course Title"
            className="input"
            value={courseForm.title}
            onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            className="input textarea"
            value={courseForm.description}
            onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="input"
            value={courseForm.tags}
            onChange={(e) => setCourseForm({ ...courseForm, tags: e.target.value })}
          />
          <Button type="submit" className="full-width">Save Changes</Button>
        </form>
      </Modal>

      {/* Add Week Modal */}
      <Modal isOpen={showAddWeek} onClose={() => setShowAddWeek(false)} title="Add New Week">
        <form onSubmit={handleAddWeek} className="form">
          <input
            type="text"
            placeholder="Week Title"
            className="input"
            value={weekForm.title}
            onChange={(e) => setWeekForm({ ...weekForm, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description (optional)"
            className="input textarea"
            value={weekForm.description}
            onChange={(e) => setWeekForm({ ...weekForm, description: e.target.value })}
          />
          <div className="info-box">
            <p>After adding the week, create an HTML file at:</p>
            <code>public/content/{selectedCourse?.slug}/week-{(selectedCourse?.weeks?.length || 0) + 1}.html</code>
          </div>
          <Button type="submit" className="full-width">Add Week</Button>
        </form>
      </Modal>

      {/* Edit Week Modal */}
      <Modal isOpen={showEditWeek} onClose={() => setShowEditWeek(false)} title="Edit Week">
        <form onSubmit={handleEditWeek} className="form">
          <input
            type="text"
            placeholder="Week Title"
            className="input"
            value={weekForm.title}
            onChange={(e) => setWeekForm({ ...weekForm, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description (optional)"
            className="input textarea"
            value={weekForm.description}
            onChange={(e) => setWeekForm({ ...weekForm, description: e.target.value })}
          />
          <Button type="submit" className="full-width">Save Changes</Button>
        </form>
      </Modal>

      <style jsx>{`
        .admin-dashboard {
          position: relative;
          z-index: 1;
        }
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          min-height: 600px;
        }
        .course-list-col, .details-col {
          background: var(--card-bg);
          backdrop-filter: saturate(180%) blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 18px;
          padding: 1.5rem;
          overflow-y: auto;
          box-shadow: var(--shadow-sm);
        }
        .col-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border: 1px solid var(--border-color);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s var(--ease-out);
          background-color: var(--bg-color);
        }
        .list-item:hover {
          border-color: var(--accent-color);
          transform: translateX(2px);
        }
        .list-item.active {
          border-color: var(--accent-color);
          background-color: rgba(0, 113, 227, 0.05);
        }
        .item-info {
          flex: 1;
        }
        .item-title {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        .item-meta {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .item-actions {
          display: flex;
          gap: 0.5rem;
        }
        .week-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        .week-info {
          display: flex;
          flex-direction: column;
        }
        .week-num {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .week-title {
          font-weight: 500;
          color: var(--text-primary);
        }
        .week-actions {
          display: flex;
          gap: 0.5rem;
        }
        .empty-state {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          color: var(--text-secondary);
        }
        .tiny-btn {
          padding: 0.375rem 0.75rem;
          font-size: 0.75rem;
        }
        .small-btn {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }
        .danger {
          color: var(--danger-color);
          border-color: var(--danger-color);
        }
        .danger:hover {
          background-color: var(--danger-color);
          color: white;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .input {
          padding: 0.75rem;
          border: 1px solid var(--border-color);
          background-color: var(--bg-color);
          color: var(--text-primary);
          border-radius: 8px;
          font-size: 1rem;
          font-family: var(--font-sans);
          transition: border-color 0.2s var(--ease-out);
        }
        .input:focus {
          outline: none;
          border-color: var(--accent-color);
          box-shadow: 0 0 0 2px rgba(0, 113, 227, 0.1);
        }
        .textarea {
          min-height: 100px;
          resize: vertical;
        }
        .info-box {
          background: var(--bg-color);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
          font-size: 0.875rem;
        }
        .info-box p {
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
        }
        .info-box code {
          display: block;
          background: var(--card-bg);
          padding: 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          overflow-x: auto;
          color: var(--accent-color);
        }
        .full-width {
          width: 100%;
        }
        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
