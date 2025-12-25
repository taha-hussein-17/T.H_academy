
// --- Local Data for Offline/Fixing Mode ---
// We'll use a wrapper to handle local data persistence in localStorage for simulation
const getLocalData = (key, fallback) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : fallback;
};

const saveLocalData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

let LOCAL_COURSES = getLocalData('tha_courses', [
  {
    id: 'local-1',
    title: 'React Mastery: From Zero to Hero',
    description: 'Master React.js with hooks, Redux, and modern practices. Build real-world applications with high performance.',
    longDescription: 'This comprehensive course takes you from the absolute basics of React to advanced concepts like server-side rendering, performance optimization, and custom hooks. You will build multiple real-world projects including a social media dashboard and an e-commerce platform.',
    price: '$99',
    rating: 4.9,
    students: '2.5k',
    duration: '24 hours',
    level: 'Intermediate',
    category: 'Development',
    isPremium: true,
    tags: ['React', 'Frontend', 'Web'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
    curriculum: [
      { title: "Introduction to React 19", duration: "45:00", free: true },
      { title: "Hooks & Functional Components", duration: "1:20:00", free: true },
      { title: "State Management with Redux Toolkit", duration: "2:15:00", free: false },
      { title: "Advanced Patterns & Custom Hooks", duration: "1:45:00", free: false },
      { title: "Testing with Vitest", duration: "1:10:00", free: false },
      { title: "Performance Optimization", duration: "55:00", free: false }
    ],
    learningPoints: [
      "Master React 19 features & compiler",
      "Advanced State Management with Redux",
      "Building Custom Hooks for reusability",
      "Performance optimization techniques",
      "Professional testing & debugging",
      "Fullstack React with Next.js concepts"
    ]
  },
  {
    id: 'local-2',
    title: 'Advanced Tailwind CSS',
    description: 'Learn how to build beautiful, responsive, and maintainable UIs with Tailwind CSS and modern design systems.',
    longDescription: 'Take your styling skills to the next level. Learn about design tokens, custom plugins, container queries, and how to build a scalable design system using Tailwind CSS v4.',
    price: '$49',
    rating: 4.8,
    students: '1.8k',
    duration: '10 hours',
    level: 'Beginner',
    category: 'Design',
    isPremium: false,
    tags: ['CSS', 'Design', 'UI/UX'],
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60',
    curriculum: [
      { title: "Tailwind CSS Fundamentals", duration: "30:00", free: true },
      { title: "Responsive Design Patterns", duration: "1:05:00", free: true },
      { title: "Customizing Tailwind & Plugins", duration: "1:40:00", free: false },
      { title: "Building a Design System", duration: "2:30:00", free: false },
      { title: "Animations & Transitions", duration: "1:15:00", free: false }
    ],
    learningPoints: [
      "Understand Utility-First workflow",
      "Build complex responsive layouts",
      "Create custom Tailwind plugins",
      "Implement Dark Mode & Theming",
      "Modern CSS features in Tailwind",
      "Optimization for production"
    ]
  },
  {
    id: 'local-3',
    title: 'JavaScript Deep Dive',
    description: 'Understand the core concepts of JavaScript: Closures, Prototypes, Async/Await and more in-depth.',
    longDescription: 'Master the language that powers the web. This course goes beyond syntax to explore the engine internals, memory management, and advanced functional programming patterns in JavaScript.',
    price: '$79',
    rating: 4.9,
    students: '3.2k',
    duration: '30 hours',
    level: 'All Levels',
    category: 'Development',
    isPremium: true,
    tags: ['JavaScript', 'Coding', 'Logic'],
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&auto=format&fit=crop&q=60',
    curriculum: [
      { title: "The JavaScript Engine Internals", duration: "55:00", free: true },
      { title: "Closures & Scope Chain", duration: "1:15:00", free: true },
      { title: "Prototypes & Inheritance", duration: "1:45:00", free: false },
      { title: "Asynchronous JavaScript Mastery", duration: "2:30:00", free: false },
      { title: "Functional Programming Patterns", duration: "1:50:00", free: false }
    ],
    learningPoints: [
      "Deep understanding of JS Engine",
      "Advanced Async/Await patterns",
      "Prototypal inheritance in-depth",
      "Memory management & GC",
      "Clean code & SOLID in JS",
      "Modern ESNext features"
    ]
  },
  {
    id: 'local-4',
    title: 'Next.js 15 Fullstack Course',
    description: 'Build modern fullstack applications with Next.js 15, Server Actions, and Prisma. The ultimate guide.',
    longDescription: 'The most complete Next.js course on the market. Learn the App Router, Server Components, Server Actions, and how to integrate with modern databases using Prisma and PostgreSQL.',
    price: '$129',
    rating: 5.0,
    students: '1.2k',
    duration: '15 hours',
    level: 'Advanced',
    category: 'Development',
    isPremium: true,
    tags: ['Next.js', 'Fullstack', 'React'],
    image: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=800',
    curriculum: [
      { title: "Next.js 15 App Router Essentials", duration: "1:10:00", free: true },
      { title: "Server Components & Streaming", duration: "1:45:00", free: true },
      { title: "Data Mutation with Server Actions", duration: "2:20:00", free: false },
      { title: "Auth & Middleware Security", duration: "1:55:00", free: false },
      { title: "Prisma & Database Integration", duration: "2:40:00", free: false }
    ],
    learningPoints: [
      "Master Next.js 15 App Router",
      "Fullstack development with Prisma",
      "Server-side data fetching & caching",
      "Advanced authentication patterns",
      "Deployment to Vercel & Edge",
      "Performance optimization (SEO/LCP)"
    ]
  },
  {
    id: 'local-5',
    title: 'UI/UX Principles for Developers',
    description: 'Learn the fundamental principles of design to build better products as a developer.',
    longDescription: 'Design is not just about how it looks, but how it works. This course teaches developers the psychological principles of design, typography, color theory, and user testing.',
    price: '$59',
    rating: 4.7,
    students: '900',
    duration: '8 hours',
    level: 'Beginner',
    category: 'Design',
    isPremium: false,
    tags: ['UI/UX', 'Design', 'Product'],
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800',
    curriculum: [
      { title: "The Psychology of Design", duration: "45:00", free: true },
      { title: "Typography & Visual Hierarchy", duration: "1:15:00", free: true },
      { title: "Color Theory for Web", duration: "1:00:00", free: false },
      { title: "User Testing & Iteration", duration: "1:30:00", free: false },
      { title: "Building Accessible UIs", duration: "1:10:00", free: false }
    ],
    learningPoints: [
      "Design thinking for developers",
      "Effective use of white space",
      "Choosing fonts & color palettes",
      "Accessibility (WCAG) compliance",
      "User research & prototyping",
      "Design-to-code handoff workflow"
    ]
  }
]);

let LOCAL_BLOG = getLocalData('tha_blog', [
  {
    id: 'blog-1',
    title: 'Mastering React 19: New Features and Best Practices',
    excerpt: 'Explore the latest updates in React 19, including the new Use hook, compiler, and improved performance.',
    content: `
      React 19 is a major milestone in the evolution of the React library. It introduces several groundbreaking features that simplify development and enhance performance.
      
      ### 1. The React Compiler
      The new compiler automatically optimizes your components, reducing the need for manual memoization with useMemo and useCallback.
      
      ### 2. The 'use' Hook
      A new way to consume resources like promises or context directly in your render function.
      
      ### 3. Improved Server Components
      Server components are now more stable and integrate seamlessly with client-side interactivity.
    `,
    author: 'Taha Ahmed',
    date: new Date().toISOString(),
    category: 'React',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    comments: 12
  },
  {
    id: 'blog-2',
    title: 'Tailwind CSS v4 is here! The Future of CSS',
    excerpt: 'Tailwind CSS v4 is faster than ever with its new engine. Learn how to migrate and use the new features.',
    content: `
      Tailwind CSS v4 is a complete rewrite of the framework, focusing on performance and ease of use.
      
      ### 1. New Engine
      The new engine is significantly faster and more efficient, making your build process almost instantaneous.
      
      ### 2. Native CSS Features
      v4 leverages modern CSS features like cascade layers and container queries more effectively.
      
      ### 3. Simplified Configuration
      Configuring Tailwind is now even easier with a more intuitive configuration structure.
    `,
    author: 'Sarah Dev',
    date: new Date().toISOString(),
    category: 'CSS',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800',
    comments: 8
  },
  {
    id: 'blog-3',
    title: '10 Tips for Better Web Performance',
    excerpt: 'Optimizing your web applications for speed is crucial. Here are 10 practical tips to get you started.',
    content: `
      Performance is key to a great user experience. Here are some actionable tips to speed up your web apps:
      
      1. **Optimize Images**: Use modern formats like WebP.
      2. **Lazy Load Components**: Only load what's needed.
      3. **Minimize HTTP Requests**: Bundle your assets.
      4. **Use a CDN**: Deliver content faster from global servers.
      5. **Optimize CSS/JS**: Minify and compress your code.
    `,
    author: 'Alex Chen',
    date: new Date().toISOString(),
    category: 'Performance',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    comments: 15
  }
]);

let LOCAL_LEADERBOARD = getLocalData('tha_leaderboard', [
  { id: 'u1', name: 'Ahmed Ali', points: 12500, courses: 12, avatar: 'https://i.pravatar.cc/150?img=11', rank: 1, badge: 'Elite' },
  { id: 'u2', name: 'Sarah Hassan', points: 11200, courses: 10, avatar: 'https://i.pravatar.cc/150?img=5', rank: 2, badge: 'Expert' },
  { id: 'u3', name: 'Mohamed Omar', points: 10800, courses: 9, avatar: 'https://i.pravatar.cc/150?img=12', rank: 3, badge: 'Professional' },
  { id: 'u4', name: 'Laila Karim', points: 9500, courses: 7, avatar: 'https://i.pravatar.cc/150?img=1', rank: 4, badge: 'Advancer' }
]);

let LOCAL_FAQS = getLocalData('tha_faqs', [
  {
    id: 'faq-1',
    category: 'General',
    questions: [
      { q: "What is T.H Academy?", a: "A premium online learning platform for frontend development." },
      { q: "How do I start?", a: "Create an account and enroll in any course." }
    ]
  },
  {
    id: 'faq-2',
    category: 'Payments',
    questions: [
      { q: "Are the courses free?", a: "We have both free and premium paid courses available." },
      { q: "Can I get a refund?", a: "Yes, within 30 days of purchase if you haven't completed more than 20%." }
    ]
  }
]);

let LOCAL_ATTENDANCE = getLocalData('tha_attendance', {
  stats: {
    present: 42,
    absent: 3,
    late: 5,
    total: 50,
    percentage: 84
  },
  records: [
    { id: 1, subject: 'React.js Mastery', date: '2025-12-24', status: 'Present', time: '10:00 AM' },
    { id: 2, subject: 'Advanced CSS', date: '2025-12-23', status: 'Late', time: '10:15 AM' },
    { id: 3, subject: 'Backend Node.js', date: '2025-12-22', status: 'Present', time: '02:00 PM' },
    { id: 4, subject: 'UI/UX Design', date: '2025-12-21', status: 'Absent', time: '11:00 AM' },
    { id: 5, subject: 'Soft Skills', date: '2025-12-20', status: 'Present', time: '09:00 AM' },
    { id: 6, subject: 'JavaScript Deep Dive', date: '2025-12-19', status: 'Present', time: '12:00 PM' },
    { id: 7, subject: 'Next.js 15', date: '2025-12-18', status: 'Present', time: '10:00 AM' }
  ]
});

let LOCAL_SCHEDULE = getLocalData('tha_schedule', [
  { 
    day: 'Sunday', 
    classes: [
      { id: 1, subject: 'React.js', instructor: 'Taha Ahmed', room: 'Lab 101', time: '10:00 AM - 12:00 PM', type: 'Lecture' },
      { id: 2, subject: 'UI/UX Design', instructor: 'Sarah Dev', room: 'Studio A', time: '01:00 PM - 03:00 PM', type: 'Workshop' }
    ]
  },
  { 
    day: 'Monday', 
    classes: [
      { id: 3, subject: 'Advanced CSS', instructor: 'Alex Chen', room: 'Room 202', time: '09:00 AM - 11:00 AM', type: 'Lecture' },
      { id: 4, subject: 'JavaScript Deep Dive', instructor: 'Taha Ahmed', room: 'Lab 101', time: '12:00 PM - 02:00 PM', type: 'Practical' }
    ]
  },
  { 
    day: 'Tuesday', 
    classes: [
      { id: 5, subject: 'Node.js Backend', instructor: 'Mohamed Omar', room: 'Lab 103', time: '10:00 AM - 01:00 PM', type: 'Lecture' }
    ]
  },
  { 
    day: 'Wednesday', 
    classes: [
      { id: 6, subject: 'Testing & QA', instructor: 'Laila Karim', room: 'Room 205', time: '11:00 AM - 01:00 PM', type: 'Workshop' },
      { id: 7, subject: 'Career Development', instructor: 'Ahmed Ali', room: 'Online', time: '03:00 PM - 04:30 PM', type: 'Seminar' }
    ]
  },
  { 
    day: 'Thursday', 
    classes: [
      { id: 8, subject: 'Final Project', instructor: 'Taha Ahmed', room: 'Lab 101', time: '10:00 AM - 04:00 PM', type: 'Studio' }
    ]
  }
]);

// --- In-Memory Cache ---
let cache = {
  courses: null,
  blog_posts: null,
  faqs: null,
  leaderboard: null,
  users: null,
  attendance: null,
  schedule: null
};

// Fetch all courses
export const getCourses = async () => {
  return LOCAL_COURSES;
};

// Get a single course
export const getCourseById = async (id) => {
  if (!id) return null;
  return LOCAL_COURSES.find(c => c.id === id) || null;
};

// Enroll user in a course
export const enrollInCourse = async (userId, courseId) => {
  return { id: 'local-enroll-' + Date.now() };
};

// Get user's enrolled courses with details
export const getUserEnrollments = async (userId) => {
  return [LOCAL_COURSES[0], LOCAL_COURSES[1]]; // Return 2 courses as demo
};

// Get user stats (points, hours, etc.)
export const getUserStats = async (userId) => {
  return { points: '1,250', hours: '4.5h', courses: 2 };
};

// Update user's lesson progress
export const updateLessonProgress = async (userId, courseId, lessonId) => {
  return true;
};

// Get user's progress for a course
export const getCourseProgress = async (userId, courseId) => {
  return [];
};

// Blog Functions
export const getBlogPosts = async () => {
  return LOCAL_BLOG;
};

export const getBlogPostById = async (id) => {
  return LOCAL_BLOG.find(p => p.id === id) || null;
};

// Leaderboard Functions
export const getLeaderboard = async (limitNum = 10) => {
  return LOCAL_LEADERBOARD.slice(0, limitNum);
};

// Get all users for admin
export const getUsers = async () => {
  return [
    { id: '1', name: 'John Doe', email: 'john@example.com', points: 1250, courses: 3, avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', points: 950, courses: 2, avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Admin Taha', email: 'taha@thacademy.com', points: 5000, courses: 10, avatar: 'https://i.pravatar.cc/150?img=3' }
  ];
};

// FAQ Functions
export const getFAQs = async () => {
  return LOCAL_FAQS;
};

// Attendance Functions
export const getAttendance = async (userId) => {
  return LOCAL_ATTENDANCE;
};

// Schedule Functions
export const getSchedule = async () => {
  return LOCAL_SCHEDULE;
};

// Certificate Verification
export const verifyCertificateById = async (certId) => {
  const LOCAL_CERTS = [
    { id: 'THA-12345', student: 'Ahmed Ali', course: 'React Mastery: From Zero to Hero', issuedDate: 'Dec 15, 2025', status: 'success' },
    { id: 'THA-67890', student: 'Sarah Hassan', course: 'Advanced Tailwind CSS', issuedDate: 'Dec 10, 2025', status: 'success' },
    { id: 'THA-DEMO', student: 'Demo Student', course: 'Local Course', issuedDate: 'Dec 25, 2025', status: 'success' }
  ];

  const localMatch = LOCAL_CERTS.find(c => c.id === certId.toUpperCase());
  if (localMatch) return localMatch;
  return { status: 'error', message: 'Certificate not found.' };
};

// --- Admin Management Functions ---

// Generic Add function
export const addData = async (collectionName, data) => {
  const localKey = collectionName === 'courses' ? 'tha_courses' : 
                   collectionName === 'blog_posts' ? 'tha_blog' : 
                   collectionName === 'faqs' ? 'tha_faqs' : null;
  
  if (localKey) {
    const localData = getLocalData(localKey, []);
    const newItem = { id: 'local-' + Date.now(), ...data };
    localData.push(newItem);
    saveLocalData(localKey, localData);
    return newItem;
  }
  return { id: 'local-' + Date.now(), ...data };
};

// Generic Update function
export const updateData = async (collectionName, id, data) => {
  const localKey = collectionName === 'courses' ? 'tha_courses' : 
                   collectionName === 'blog_posts' ? 'tha_blog' : 
                   collectionName === 'faqs' ? 'tha_faqs' : null;
  
  if (localKey) {
    const localData = getLocalData(localKey, []);
    const index = localData.findIndex(item => item.id === id);
    if (index !== -1) {
      localData[index] = { ...localData[index], ...data };
      saveLocalData(localKey, localData);
      return true;
    }
  }
  return true;
};

// Generic Delete function
export const deleteData = async (collectionName, id) => {
  const localKey = collectionName === 'courses' ? 'tha_courses' : 
                   collectionName === 'blog_posts' ? 'tha_blog' : 
                   collectionName === 'faqs' ? 'tha_faqs' : null;
  
  if (localKey) {
    const localData = getLocalData(localKey, []);
    const filtered = localData.filter(item => item.id !== id);
    saveLocalData(localKey, filtered);
    return true;
  }
  return true;
};

// Seed Initial Data (Empty as we use local directly now)
export const seedInitialData = async () => {
  return true;
};
