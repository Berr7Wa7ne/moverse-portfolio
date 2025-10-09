import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01';

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
  
  blogPosts: `*[_type in ["blogPost", "post"]] | order(coalesce(date, _createdAt) desc){
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
  
  blogPostBySlug: `*[_type in ["blogPost", "post"] && slug.current == $slug][0]{
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