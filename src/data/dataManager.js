import { courses as defaultCourses } from './mockData';

// Data management utilities for courses
const STORAGE_KEY = 'weekwise_courses_v2';

export function getCourses() {
    if (typeof window === 'undefined') return defaultCourses;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }

    // Return default courses from mockData
    return defaultCourses;
}

export function saveCourses(courses) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}

export function addCourse(course) {
    const courses = getCourses();
    const newCourse = {
        id: Date.now().toString(),
        slug: course.title.toLowerCase().replace(/\s+/g, '-'),
        ...course,
        weeks: []
    };
    courses.push(newCourse);
    saveCourses(courses);
    return newCourse;
}

export function updateCourse(courseId, updates) {
    const courses = getCourses();
    const index = courses.findIndex(c => c.id === courseId);
    if (index !== -1) {
        courses[index] = { ...courses[index], ...updates };
        saveCourses(courses);
        return courses[index];
    }
    return null;
}

export function deleteCourse(courseId) {
    const courses = getCourses();
    const filtered = courses.filter(c => c.id !== courseId);
    saveCourses(filtered);
    return filtered;
}

export function addWeek(courseId, week) {
    const courses = getCourses();
    const course = courses.find(c => c.id === courseId);
    if (course) {
        const newWeek = {
            weekNumber: course.weeks.length + 1,
            ...week
        };
        course.weeks.push(newWeek);
        saveCourses(courses);
        return newWeek;
    }
    return null;
}

export function updateWeek(courseId, weekNumber, updates) {
    const courses = getCourses();
    const course = courses.find(c => c.id === courseId);
    if (course) {
        const weekIndex = course.weeks.findIndex(w => w.weekNumber === weekNumber);
        if (weekIndex !== -1) {
            course.weeks[weekIndex] = { ...course.weeks[weekIndex], ...updates };
            saveCourses(courses);
            return course.weeks[weekIndex];
        }
    }
    return null;
}

export function deleteWeek(courseId, weekNumber) {
    const courses = getCourses();
    const course = courses.find(c => c.id === courseId);
    if (course) {
        course.weeks = course.weeks.filter(w => w.weekNumber !== weekNumber);
        // Renumber remaining weeks
        course.weeks.forEach((week, index) => {
            week.weekNumber = index + 1;
        });
        saveCourses(courses);
        return course.weeks;
    }
    return null;
}
