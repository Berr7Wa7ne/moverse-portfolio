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
"[project]/src/lib/content/blogs.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "blogList",
    ()=>blogList,
    "blogsBySlug",
    ()=>blogsBySlug,
    "getBlog",
    ()=>getBlog,
    "listBlogPosts",
    ()=>listBlogPosts,
    "listBlogSlugs",
    ()=>listBlogSlugs,
    "listBlogs",
    ()=>listBlogs
]);
const blogList = [
    {
        id: 1,
        title: 'The Future of Web Development: Trends To Watch in 2025',
        category: 'Marketing',
        date: 'May 21, 2022',
        author: 'Rakhool Muhammad',
        authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Explore the latest trends in web development that will shape the industry in 2025 and beyond.',
        featured: true,
        slug: 'future-web-development-trends'
    },
    {
        id: 2,
        title: 'Best Practices For Designing a User-Friendly Mobile App',
        category: 'UI/UX',
        date: 'June 21, 2022',
        author: 'Yahya Man',
        authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Learn the essential principles for creating intuitive and engaging mobile app interfaces.',
        featured: false,
        slug: 'mobile-app-design-best-practices'
    },
    {
        id: 3,
        title: '3 Tips to Increase Engagement on Social Media',
        category: 'Marketing',
        date: 'June 21, 2022',
        author: 'Yahya Man',
        authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Discover proven strategies to boost your social media engagement and grow your audience.',
        featured: false,
        slug: 'social-media-engagement-tips'
    },
    {
        id: 4,
        title: '3 Tips to Increase Engagement on Social Media',
        category: 'Marketing',
        date: 'June 21, 2022',
        author: 'Yahya Man',
        authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Learn effective techniques to enhance your social media presence and drive meaningful interactions.',
        featured: false,
        slug: 'social-media-presence-tips'
    },
    {
        id: 5,
        title: 'The Rise of Super Apps: What It Means for Business and Consumers',
        category: 'Development',
        date: 'June 21, 2022',
        author: 'Yahya Man',
        authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Understand how super apps are revolutionizing the digital landscape and what this means for businesses.',
        featured: false,
        slug: 'rise-super-apps-business-consumers'
    }
];
const blogsBySlug = {
    'future-web-development-trends': {
        title: 'The Future of Web Development: Trends To Watch in 2025',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        tags: [
            'Web Design',
            'App Development',
            'UX/UI Design'
        ],
        author: 'Rakhool Muhammad',
        authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        date: 'May 21, 2024',
        readTime: '10 Min Read',
        content: `
        <p>Web development is constantly evolving, and 2025 promises to bring exciting new trends that will shape the future of digital experiences. As we move forward, developers and businesses need to stay ahead of these changes to remain competitive in the digital landscape.</p>
        <h2>Understanding the Importance of Scalable Web Solutions</h2>
        <p>In today's fast-paced digital world, scalability is no longer a luxury—it's a necessity. Modern web applications must be able to handle increasing loads, user demands, and data volumes without compromising performance. This is where scalable web solutions come into play, offering the flexibility and robustness needed to grow with your business.</p>
        <p>Scalable web solutions provide several key benefits:</p>
        <ul>
          <li>Improved performance under high traffic loads</li>
          <li>Cost-effective resource management</li>
          <li>Enhanced user experience across all devices</li>
          <li>Future-proof architecture that adapts to changing needs</li>
        </ul>
        <h2>Agile Collaboration Tips</h2>
        <p>Successful web development projects rely heavily on effective collaboration between designers, developers, and stakeholders. Agile methodologies have revolutionized how teams work together, but implementing them effectively requires careful planning and execution.</p>
        <p>Here are some proven tips for fostering better collaboration:</p>
        <ul>
          <li>Maintain regular communication through daily standups</li>
          <li>Use collaborative tools that everyone can access</li>
          <li>Establish clear roles and responsibilities</li>
          <li>Encourage open feedback and continuous improvement</li>
        </ul>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="inline 1" class="w-full h-full object-cover rounded-xl shadow-md" />
          <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="inline 2" class="w-full h-full object-cover rounded-xl shadow-md" />
        </div>
        <h2>Streamlining Design-to-Development Handoff</h2>
        <p>The transition from design to development is often where projects face the most challenges. A smooth handoff process ensures that the final product matches the original vision while maintaining technical feasibility.</p>
        <p>Key strategies for improving the handoff process include:</p>
        <ul>
          <li>Creating detailed design specifications</li>
          <li>Using design systems and component libraries</li>
          <li>Maintaining open communication between teams</li>
          <li>Conducting regular review sessions</li>
        </ul>
        <callout>Creating and Managing Comprehensive Digital Strategies</callout>
        <h2>Building Efficient Development Workflows</h2>
        <p>Efficient workflows are the backbone of successful web development projects. They help teams deliver high-quality products on time and within budget while maintaining code quality and team morale.</p>
        <p>Essential elements of efficient workflows include:</p>
        <ul>
          <li>Automated testing and deployment processes</li>
          <li>Version control and code review practices</li>
          <li>Continuous integration and delivery</li>
          <li>Regular performance monitoring and optimization</li>
        </ul>
        <h2>Tips for Cleaning Kitchen</h2>
        <p>While this might seem unrelated to web development, maintaining a clean and organized workspace—whether physical or digital—is crucial for productivity and creativity. A cluttered environment can lead to cluttered thinking, which ultimately affects the quality of your work.</p>
        <p>Apply the same principles to your development environment:</p>
        <ul>
          <li>Keep your code organized and well-documented</li>
          <li>Regularly clean up unused files and dependencies</li>
          <li>Maintain a clean and intuitive project structure</li>
          <li>Use tools that help automate routine tasks</li>
        </ul>
      `,
        relatedPosts: [
            {
                title: 'The Role of AI in Cloud Computing and Automation',
                image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                date: 'June 15, 2024',
                slug: 'ai-cloud-computing-automation'
            },
            {
                title: 'The Rise of Super Apps: What It Means for Business and Consumers',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                date: 'June 10, 2024',
                slug: 'rise-super-apps-business-consumers'
            }
        ]
    }
};
function listBlogs() {
    return blogList;
}
function listBlogPosts() {
    return blogList;
}
function listBlogSlugs() {
    return blogList.map((b)=>b.slug);
}
function getBlog(slug) {
    return blogsBySlug[slug] ?? null;
}
}),
"[project]/src/app/api/blog/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "revalidate",
    ()=>revalidate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2f$sanity$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cms/sanity.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2f$blogs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/content/blogs.ts [app-route] (ecmascript)");
;
;
;
const revalidate = 300;
async function GET() {
    const useCMS = ("TURBOPACK compile-time value", "true") === 'true';
    if ("TURBOPACK compile-time truthy", 1) {
        try {
            const posts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cms$2f$sanity$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchBlogPostsFromCMS"])();
            if (Array.isArray(posts) && posts.length > 0) {
                console.log('[blog list API] Source: Sanity CMS', {
                    count: posts.length
                });
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    posts
                });
            }
        } catch (error) {
            console.error('[blog list API] CMS fetch failed:', error);
        }
    }
    console.log('[blog list API] Source: local static content');
    const staticPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2f$blogs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listBlogPosts"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        posts: staticPosts
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5f09ea44._.js.map