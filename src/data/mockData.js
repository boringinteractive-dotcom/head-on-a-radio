export const courses = [
    {
        id: "maths1",
        slug: "maths-1",
        title: "Mathematics 1",
        description: "Fundamental concepts of mathematics including calculus and algebra.",
        tags: ["Sem 1", "Maths"],
        weeks: [
            {
                weekNumber: 9,
                title: "Week 9",
                description: "Topics for Week 9.",
            },
            {
                weekNumber: 10,
                title: "Week 10",
                description: "Topics for Week 10.",
            },
            {
                weekNumber: 11,
                title: "Week 11",
                description: "Topics for Week 11.",
            },
            {
                weekNumber: 12,
                title: "Week 12",
                description: "Topics for Week 12.",
            },
        ],
    },
    {
        id: "stats1",
        slug: "statistics-1",
        title: "Statistics 1",
        description: "Introduction to statistical methods and data analysis.",
        tags: ["Sem 1", "Stats"],
        weeks: [
            {
                weekNumber: 9,
                title: "Week 9",
                description: "Topics for Week 9.",
            },
            {
                weekNumber: 10,
                title: "Week 10",
                description: "Topics for Week 10.",
            },
            {
                weekNumber: 11,
                title: "Week 11",
                description: "Topics for Week 11.",
            },
            {
                weekNumber: 12,
                title: "Week 12",
                description: "Topics for Week 12.",
            },
        ],
    },
    {
        id: "ct",
        slug: "ct",
        title: "Computational Thinking",
        description: "Developing problem-solving skills and algorithmic thinking.",
        tags: ["Sem 1", "CT"],
        weeks: [
            {
                weekNumber: 9,
                title: "Backtracking & Recursion",
                description: "Exploring backtracking algorithms, tree structures, depth-first search (DFS), and recursive problem-solving.",
            },
            {
                weekNumber: 10,
                title: "Trains, Graphs & Shortest Paths",
                description: "TTurn train routes into matrices and algorithms; explore hops, reachability, and shortest paths using real-world graph thinking.",
            },
            {
                weekNumber: 11,
                title: "Week 11",
                description: "Topics for Week 11.",
            },
            {
                weekNumber: 12,
                title: "Week 12",
                description: "Topics for Week 12.",
            },
        ],
    },
    {
        id: "eng1",
        slug: "english-1",
        title: "English 1",
        description: "Enhancing communication skills and literary analysis.",
        tags: ["Sem 1", "English"],
        weeks: [
            {
                weekNumber: 9,
                title: "Week 9",
                description: "Topics for Week 9.",
            },
            {
                weekNumber: 10,
                title: "Week 10",
                description: "Topics for Week 10.",
            },
            {
                weekNumber: 11,
                title: "Week 11",
                description: "Topics for Week 11.",
            },
            {
                weekNumber: 12,
                title: "Week 12",
                description: "Topics for Week 12.",
            },
        ],
    },
];

export function getCourseBySlug(slug) {
    return courses.find((course) => course.slug === slug);
}
