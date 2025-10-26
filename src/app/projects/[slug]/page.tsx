import React from 'react';
import { getProject, listProjectSlugs } from '@/lib/content/projects';
import { fetchProjectBySlugFromCMS, fetchProjectSlugsFromCMS } from '@/lib/cms/sanity';
import ServicesBanner from '@/components/ui/ServicesBanner';
import ProjectIntroSection from '@/components/projects/projectDetails/ProjectIntroSection';
import ProjectChallengeServiceSection from '@/components/projects/projectDetails/ProjectChallengeServiceSection';
import ProjectResultsSection from '@/components/projects/projectDetails/ProjectResultsSection';
import ProjectHero from '@/components/projects/projectDetails/ProjectHero';
import ProjectShowcaseDetails from '@/components/projects/projectDetails/ProjectShowcaseDetails';
import NewsletterSection from '@/components/home/NewsletterSection';
import QuoteFormSection from '@/components/home/QuoteFormSection';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import TopBar from '@/components/layout/TopBar';
export const revalidate = 3600;

type PageProps = { params: Promise<{ slug: string }> };

const ProjectDetailPage = async ({ params }: PageProps) => {
  const useParams = await params; // 👈 await params here
  const useCMS = process.env.USE_CMS === 'true';
  const project = useCMS
    ? await fetchProjectBySlugFromCMS(useParams.slug)
    : getProject(useParams.slug);
  console.log('[projects page] Source:', useCMS ? 'Sanity CMS' : 'local static content', { slug: useParams.slug, found: !!project });

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--primary-blue)] mb-4">Project Not Found</h1>
          <p className="text-[var(--gray-600)] mb-8">The project you're looking for doesn't exist.</p>
          <a href="/projects" className="btn-primary">Back to Projects</a>
        </div>
      </div>
    );
  }

  return (
    <>
      <TopBar />
      <Header />
      <ProjectHero
        title="Our Work Details"
        breadcrumb="Home / Our Works / Our Work Details"
      />
      <ProjectIntroSection
        heroImage={project.images[0]}
        title={project.title}
        lead={project.description}
        body={project.service}
        info={{ client: project.client, service: project.category, location: project.location, year: project.year }}
      />
      <ProjectChallengeServiceSection
        collageImage={project.images[1] || project.images[0]}
        challengeTitle="The Challenge"
        challengeText={project.challenge}
        serviceTitle="The Service"
        serviceText={project.service}
        serviceBullets={project.features}
      />
      <ProjectResultsSection
        title="The Results"
        text={project.results}
        wideImage={project.images[2] || project.images[0]}
        testimonial={{
          author: project.testimonial.author,
          position: project.testimonial.position,
          rating: project.testimonial.rating,
          image: project.testimonial.image,
          text: project.testimonial.text,
        }}
      />
      <ServicesBanner />
      <ProjectShowcaseDetails currentSlug={useParams.slug} />
      <QuoteFormSection />
      <NewsletterSection />
      <ServicesBanner />
      <Footer />
    </>
  );
};

export default ProjectDetailPage;

export async function generateStaticParams() {
  const useCMS = process.env.USE_CMS === 'true';
  const slugs = useCMS ? await fetchProjectSlugsFromCMS() : listProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}
