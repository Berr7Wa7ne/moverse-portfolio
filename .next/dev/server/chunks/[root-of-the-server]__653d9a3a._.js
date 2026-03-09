module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/content/projects.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getProject",
    ()=>getProject,
    "listProjectSlugs",
    ()=>listProjectSlugs,
    "listProjects",
    ()=>listProjects,
    "projectsBySlug",
    ()=>projectsBySlug
]);
const projectsBySlug = {
    'car-rental-app': {
        title: 'Car Rental - Car Rental Booking Mobile App',
        category: 'Mobile App Development',
        client: 'Dianne Russell',
        location: 'United States',
        year: '2024',
        description: 'A comprehensive car rental booking mobile application that allows users to search, compare, and book rental cars with ease. The app features real-time availability, secure payment processing, and GPS integration for pickup locations.',
        challenge: 'The main challenge was creating an intuitive user experience that could handle complex booking logic while maintaining fast performance across different devices and network conditions.',
        service: 'We developed a full-stack mobile application using React Native for cross-platform compatibility, integrated with a robust backend API for real-time data management and payment processing.',
        results: 'The app achieved a 4.8-star rating on app stores with over 50,000 downloads in the first month. User engagement increased by 300% compared to the previous web-based solution.',
        features: [
            'Real-time car availability',
            'GPS integration for pickup locations',
            'Secure payment processing',
            'User reviews and ratings',
            'Booking management',
            'Push notifications'
        ],
        technologies: [
            'React Native',
            'Node.js',
            'MongoDB',
            'Stripe API',
            'Google Maps API'
        ],
        images: [
            'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        testimonial: {
            text: 'The car rental app exceeded our expectations. The user experience is seamless and the booking process is incredibly smooth. Our customers love the new interface.',
            author: 'Leslie Alexander',
            position: 'CEO, Software Company',
            rating: 5.0,
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
        }
    },
    'doctor-appointment-app': {
        title: 'Core Connect - Doctor Appointment App',
        description: 'A comprehensive healthcare app that connects patients with doctors for easy appointment booking, telemedicine consultations, and health record management.',
        category: 'Healthcare App',
        client: 'Dr. Sarah Johnson',
        location: 'Canada',
        year: '2024',
        challenge: 'Creating a secure platform that complies with healthcare regulations while providing an intuitive user experience for both patients and healthcare providers.',
        service: 'We developed a HIPAA-compliant mobile and web application with end-to-end encryption, secure video calling, and integrated health record management.',
        results: 'The platform successfully onboarded 200+ healthcare providers and 10,000+ patients within the first 6 months, with a 95% user satisfaction rate.',
        features: [
            'Appointment scheduling',
            'Video consultations',
            'Health record management',
            'Prescription management',
            'Insurance verification',
            'Secure messaging'
        ],
        technologies: [
            'React Native',
            'Node.js',
            'PostgreSQL',
            'WebRTC',
            'AWS'
        ],
        images: [
            'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        testimonial: {
            text: 'Core Connect has revolutionized how we manage patient appointments. The platform is secure, user-friendly, and has significantly improved our practice efficiency.',
            author: 'Dr. Michael Chen',
            position: 'Medical Director',
            rating: 5.0,
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
        }
    },
    'dental-clinic-website': {
        title: 'Dental - Dentist and Dental Clinic Website UI/UX Design',
        description: 'A modern, responsive website for a dental clinic featuring online appointment booking, service information, and patient resources.',
        category: 'Website Design',
        client: 'Smile Dental Clinic',
        location: 'United Kingdom',
        year: '2024',
        challenge: 'Creating a trustworthy and professional online presence that would help patients feel comfortable booking dental appointments online.',
        service: 'We designed and developed a fully responsive website with an intuitive appointment booking system, patient portal, and comprehensive service information.',
        results: 'Online appointment bookings increased by 400% and the website achieved a 98% user satisfaction rate for ease of use.',
        features: [
            'Online appointment booking',
            'Patient portal',
            'Service information',
            'Doctor profiles',
            'Insurance information',
            'Emergency contact'
        ],
        technologies: [
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
            'Stripe',
            'MongoDB'
        ],
        images: [
            'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        ],
        testimonial: {
            text: 'The new website has transformed our practice. Patients can easily book appointments online, and the professional design has increased our credibility significantly.',
            author: 'Dr. Emily Rodriguez',
            position: 'Practice Owner',
            rating: 5.0,
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
        }
    }
};
function listProjects() {
    return Object.entries(projectsBySlug).map(([slug, project])=>({
            slug,
            ...project
        }));
}
function getProject(slug) {
    return projectsBySlug[slug] ?? null;
}
function listProjectSlugs() {
    return Object.keys(projectsBySlug);
}
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/lib/cms/sanity.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchBlogCategoriesFromCMS",
    ()=>fetchBlogCategoriesFromCMS,
    "fetchBlogPostBySlugFromCMS",
    ()=>fetchBlogPostBySlugFromCMS,
    "fetchBlogPostsFromCMS",
    ()=>fetchBlogPostsFromCMS,
    "fetchBlogSlugsFromCMS",
    ()=>fetchBlogSlugsFromCMS,
    "fetchProjectBySlugFromCMS",
    ()=>fetchProjectBySlugFromCMS,
    "fetchProjectSlugsFromCMS",
    ()=>fetchProjectSlugsFromCMS,
    "fetchProjectsFromCMS",
    ()=>fetchProjectsFromCMS,
    "queries",
    ()=>queries,
    "sanityClient",
    ()=>sanityClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@sanity/client/dist/index.browser.js [app-route] (ecmascript) <locals>");
;
const projectId = ("TURBOPACK compile-time value", "yj2q8j08");
const dataset = ("TURBOPACK compile-time value", "production");
const apiVersion = ("TURBOPACK compile-time value", "2024-05-01") || '2024-05-01';
const sanityClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$client$2f$dist$2f$index$2e$browser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])({
    projectId,
    dataset,
    apiVersion,
    useCdn: false
});
const queries = {
    projects: `*[_type == "project"] | order(_createdAt desc){
    title, slug, category, client, location, year, description, challenge, service, results,
    features, technologies, "images": images[].asset->url, liveUrl,
    testimonial{author, position, rating, "image": image.asset->url, text}
  }`,
    projectBySlug: `*[_type == "project" && slug.current == $slug][0]{
    title, slug, category, client, location, year, description, challenge, service, results,
    features, technologies, "images": images[].asset->url, liveUrl,
    testimonial{author, position, rating, "image": image.asset->url, text}
  }`,
    projectSlugs: `*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`,
    blogPosts: `*[_type == "blogPost"] | order(coalesce(date, _createdAt) desc){
    title,
    "slug": slug.current,
    // dates
    "date": coalesce(date, _createdAt),
    // category may be string or reference/category field in legacy
    "category": select(
      defined(category->title) => category->title,
      defined(category) => category,
      defined(categories[0]->title) => categories[0]->title,
      'Blog'
    ),
    // author can be string or reference
    "author": select(defined(author->name) => author->name, defined(author) => author, null),
    // images from multiple possible fields
    "authorImage": coalesce(authorImage.asset->url, author->image.asset->url),
    authorPosition,
    authorQuote,
    "image": coalesce(image.asset->url, coverImage.asset->url, mainImage.asset->url),
    // tags/keywords
    tags,
    // description/excerpt
    "description": select(
      defined(description) && description match 'string' => description,
      defined(excerpt) && excerpt match 'string' => excerpt,
      defined(description[0].children[0].text) => description[0].children[0].text,
      defined(excerpt[0].children[0].text) => excerpt[0].children[0].text,
      null
    ),
    readTime
  }`,
    blogPostBySlug: `*[_type == "blogPost" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    // dates
    "date": coalesce(date, _createdAt),
    "category": select(
      defined(category->title) => category->title,
      defined(category) => category,
      defined(categories[0]->title) => categories[0]->title,
      'Blog'
    ),
    // author can be string or reference
    "author": select(defined(author->name) => author->name, defined(author) => author, null),
    // images from multiple possible fields
    "authorImage": coalesce(authorImage.asset->url, author->image.asset->url),
    authorPosition,
    authorQuote,
    "image": coalesce(image.asset->url, coverImage.asset->url, mainImage.asset->url),
    tags,
    // description/excerpt
    "description": select(
      defined(description) && description match 'string' => description,
      defined(excerpt) && excerpt match 'string' => excerpt,
      defined(description[0].children[0].text) => description[0].children[0].text,
      defined(excerpt[0].children[0].text) => excerpt[0].children[0].text,
      null
    ),
    readTime,
    // content/body
    "content": coalesce(content, body),
    relatedPosts[]->{
      title,
      "image": coalesce(image.asset->url, coverImage.asset->url, mainImage.asset->url),
      "date": coalesce(date, _createdAt),
      "slug": slug.current
    }
  }`,
    blogSlugs: `*[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current }`,
    blogCategories: `*[_type == "blogPost" && defined(category)]{
    "category": select(
      defined(category->title) => category->title,
      defined(category) => category,
      defined(categories[0]->title) => categories[0]->title,
      null
    )
  }`
};
async function fetchProjectsFromCMS() {
    return sanityClient.fetch(queries.projects);
}
async function fetchProjectBySlugFromCMS(slug) {
    return sanityClient.fetch(queries.projectBySlug, {
        slug
    });
}
async function fetchProjectSlugsFromCMS() {
    const data = await sanityClient.fetch(queries.projectSlugs);
    return (data || []).map((d)=>d.slug);
}
async function fetchBlogPostsFromCMS() {
    return sanityClient.fetch(queries.blogPosts);
}
async function fetchBlogPostBySlugFromCMS(slug) {
    return sanityClient.fetch(queries.blogPostBySlug, {
        slug
    });
}
async function fetchBlogSlugsFromCMS() {
    const data = await sanityClient.fetch(queries.blogSlugs);
    return (data || []).map((d)=>d.slug);
}
async function fetchBlogCategoriesFromCMS() {
    const data = await sanityClient.fetch(queries.blogCategories);
    const categories = (data || []).map((d)=>d.category).filter((cat)=>typeof cat === 'string' && cat.trim() !== '');
    // Return unique categories
    return Array.from(new Set(categories));
}
}),
"[project]/src/app/api/projects/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2f$projects$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/content/projects.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2f$sanity$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cms/sanity.ts [app-route] (ecmascript)");
;
;
;
const revalidate = 3600; // cache for 1 hour
async function GET() {
    const useCMS = ("TURBOPACK compile-time value", "true") === 'true';
    if ("TURBOPACK compile-time truthy", 1) {
        try {
            const projects = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2f$sanity$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchProjectsFromCMS"])();
            if (Array.isArray(projects) && projects.length > 0) {
                console.log('[projects API] Source: Sanity CMS', {
                    count: projects.length
                });
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    projects
                });
            }
        } catch (error) {
            console.error('[projects API] CMS fetch failed:', error);
        }
    }
    console.log('[projects API] Source: local static content');
    const projects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2f$projects$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listProjects"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        projects
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__653d9a3a._.js.map