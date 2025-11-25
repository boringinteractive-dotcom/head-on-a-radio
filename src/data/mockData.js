export const courses = [
    {
        id: "cs101",
        slug: "data-structures",
        title: "Data Structures – CS",
        description: "Master the fundamental building blocks of computer science. Learn arrays, linked lists, trees, and graphs.",
        tags: ["Sem 3", "CS"],
        weeks: [
            {
                weekNumber: 1,
                title: "Introduction & Overview",
                description: "Understanding why data structures matter and Big O notation basics.",
            },
            {
                weekNumber: 2,
                title: "Arrays & Complexity",
                description: "Deep dive into static vs dynamic arrays and time complexity analysis.",
            },
            {
                weekNumber: 3,
                title: "Linked Lists",
                description: "Building flexible linear data structures from scratch.",
            },
        ],
    },
    {
        id: "des201",
        slug: "ui-design-basics",
        title: "UI Design Basics",
        description: "Learn to design clean, functional interfaces. Typography, color theory, and layout grids.",
        tags: ["Design", "Beginner"],
        weeks: [
            {
                weekNumber: 1,
                title: "Typography & Hierarchy",
                description: "How to use type to guide the user's eye.",
            },
            {
                weekNumber: 2,
                title: "Color Theory",
                description: "Creating harmonious color palettes for digital products.",
            },
        ],
    },
];

export function getCourseBySlug(slug) {
    return courses.find((course) => course.slug === slug);
}
