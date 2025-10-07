import { createClient } from 'next-sanity';

const projectId = process.env.SANITY_PROJECT_ID!;
const dataset = process.env.SANITY_DATASET!;
const apiVersion = process.env.SANITY_API_VERSION || '2024-05-01';

export const sanityClient = createClient({ projectId, dataset, apiVersion, useCdn: true });

export const queries = {
  projects: `*[_type == "project"] | order(_createdAt desc){
    title, slug, category, client, location, year, description, challenge, service, results,
    features, technologies, images[]{asset->{url}},
    testimonial{author, position, rating, image{asset->{url}}, text}
  }`,
  projectBySlug: `*[_type == "project" && slug.current == $slug][0]{
    title, slug, category, client, location, year, description, challenge, service, results,
    features, technologies, images[]{asset->{url}},
    testimonial{author, position, rating, image{asset->{url}}, text}
  }`,
  projectSlugs: `*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`,
  blogPosts: `*[_type == "blogPost"] | order(date desc){
    title, slug, date, coverImage{asset->{url}}, tags, author->{name, avatar{asset->{url}}},
    excerpt,
  }`,
  blogPostBySlug: `*[_type == "blogPost" && slug.current == $slug][0]{
    title, slug, date, coverImage{asset->{url}}, tags, author->{name, avatar{asset->{url}}},
    content
  }`,
  blogSlugs: `*[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current }`,
};

export async function fetchProjectsFromCMS() {
  return sanityClient.fetch(queries.projects);
}

export async function fetchProjectBySlugFromCMS(slug: string) {
  return sanityClient.fetch(queries.projectBySlug, { slug });
}

export async function fetchProjectSlugsFromCMS(): Promise<string[]> {
  const data = await sanityClient.fetch<{ slug: string }[]>(queries.projectSlugs);
  return (data || []).map((d) => d.slug);
}

export async function fetchBlogPostsFromCMS() {
  return sanityClient.fetch(queries.blogPosts);
}

export async function fetchBlogPostBySlugFromCMS(slug: string) {
  return sanityClient.fetch(queries.blogPostBySlug, { slug });
}

export async function fetchBlogSlugsFromCMS(): Promise<string[]> {
  const data = await sanityClient.fetch<{ slug: string }[]>(queries.blogSlugs);
  return (data || []).map((d) => d.slug);
}


