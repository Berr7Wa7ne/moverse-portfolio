'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ServicesBanner from '@/components/ui/ServicesBanner';
import MemberHero from '@/components/team/teamDetails/MemberHero';
import { MemberProfile, MemberSkills } from '@/components/team/teamDetails/MemberProfile';

const TeamDetailPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string;

  // Team member data - in a real app, this would come from an API or CMS
  const teamMembers = {
    'jasso': {
      name: 'Jasso',
      position: 'Chief Executive Officer',
      email: 'jasso@company.com',
      phone: '+0123-458-789',
      experience: '8+ Years of Experience',
      bio: 'Jasso is a visionary leader with over 8 years of experience in the technology industry. She has a proven track record of driving innovation and leading teams to deliver exceptional results. Her expertise in strategic planning and business development has been instrumental in our company\'s growth.',
      skills: [
        { name: 'Communication', percentage: 85 },
        { name: 'Leading', percentage: 95 },
        { name: 'Time management', percentage: 80 },
        { name: 'Client response', percentage: 80 },
        { name: 'Networking', percentage: 95 },
        { name: 'Adaptibility', percentage: 85 }
      ],
      social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#'
      },
      image: '/jasso.jpg'
    },
    'sarah-johnson': {
      name: 'Sarah Johnson',
      position: 'Lead UI/UX Designer',
      email: 'sarah@company.com',
      phone: '+0123-458-790',
      experience: '6+ Years of Experience',
      bio: 'Sarah is a creative designer with a passion for creating user-centered experiences. She has led the design of over 100 digital products and has a deep understanding of user psychology and design principles.',
      skills: [
        { name: 'UI/UX Design', percentage: 95 },
        { name: 'User Research', percentage: 90 },
        { name: 'Prototyping', percentage: 88 },
        { name: 'Design Systems', percentage: 92 },
        { name: 'Figma', percentage: 98 },
        { name: 'Adobe Creative Suite', percentage: 85 }
      ],
      social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#'
      },
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    'michael-chen': {
      name: 'Michael Chen',
      position: 'Senior Full-Stack Developer',
      email: 'michael@company.com',
      phone: '+0123-458-791',
      experience: '7+ Years of Experience',
      bio: 'Michael is a full-stack developer with expertise in modern web technologies. He has built scalable applications for startups and enterprise clients, with a focus on performance and security.',
      skills: [
        { name: 'React/Next.js', percentage: 95 },
        { name: 'Node.js', percentage: 90 },
        { name: 'Python', percentage: 85 },
        { name: 'Database Design', percentage: 88 },
        { name: 'Cloud Architecture', percentage: 82 },
        { name: 'DevOps', percentage: 75 }
      ],
      social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#'
      },
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    'emily-rodriguez': {
      name: 'Emily Rodriguez',
      position: 'Project Manager',
      email: 'emily@company.com',
      phone: '+0123-458-792',
      experience: '5+ Years of Experience',
      bio: 'Emily is a certified project manager with a background in agile methodologies. She ensures projects are delivered on time and within budget while maintaining the highest quality standards.',
      skills: [
        { name: 'Project Management', percentage: 92 },
        { name: 'Agile/Scrum', percentage: 90 },
        { name: 'Team Leadership', percentage: 88 },
        { name: 'Risk Management', percentage: 85 },
        { name: 'Client Communication', percentage: 95 },
        { name: 'Budget Planning', percentage: 82 }
      ],
      social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#'
      },
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
  };

  const member = teamMembers[slug as keyof typeof teamMembers];

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--primary-blue)] mb-4">Team Member Not Found</h1>
          <p className="text-[var(--gray-600)] mb-8">The team member you're looking for doesn't exist.</p>
          <a href="/about" className="btn-primary">Back to About</a>
        </div>
      </div>
    );
  }

  return (
    <>
      <MemberHero name={member.name} position={member.position} />
      <ServicesBanner />
      <MemberProfile name={member.name} position={member.position} bio={member.bio} email={member.email} phone={member.phone} experience={member.experience} image={member.image} social={member.social} />
      <MemberSkills name={member.name} skills={member.skills} />
      {/* CTA Section */}
      <section className="section-padding bg-[var(--primary-blue)]">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Want to Work with Our Team?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Our talented team is ready to bring your ideas to life. Let's discuss your project today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary bg-white text-[var(--primary-blue)] hover:bg-gray-100">
              Get Free Quote
            </a>
            <a href="/about" className="btn-secondary border-white text-white hover:bg-white hover:text-[var(--primary-blue)]">
              Meet Our Team
            </a>
          </div>
        </div>
      </section>

      <ServicesBanner />
    </>
  );
};

export default TeamDetailPage;
