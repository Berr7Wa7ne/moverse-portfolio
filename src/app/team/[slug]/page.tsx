'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ServicesBanner from '@/components/ui/ServicesBanner';
import MemberHero from '@/components/team/teamDetails/MemberHero';
import { MemberProfile, MemberSkills } from '@/components/team/teamDetails/MemberProfile';
import QuoteFormSection from '@/components/home/QuoteFormSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';

const TeamDetailPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string;

  // Team member data - in a real app, this would come from an API or CMS
  const teamMembers = {
    'emma': {
      name: 'Emmanuel Akinwolemiwa',
      position: 'Web Developer & Digital Strategist',
      email: 'Email: emma@moverse.com',
      phone: '+2348141515437',
      experience: '6+ Years of Experience',
      bio: 'Emmanuel Akinwolemiwa is a versatile digital professional with strong expertise in web development, graphic design, SEO, and digital marketing. He has hands-on experience managing and optimizing websites, creating compelling visual and social media content, and implementing SEO strategies to improve online visibility and audience engagement. Emmanuel has worked with organizations such as The News Chronicle and Space Stylist, where he contributed to brand growth through effective digital solutions. He is a proactive, detail-oriented professional who thrives in dynamic environments and is passionate about using technology and creativity to deliver impactful results.',
      skills: [
        { name: 'Communication', percentage: 85 },
        { name: 'Digital Marketing', percentage: 95 },
        { name: 'Time management', percentage: 80 },
        { name: 'Website design', percentage: 80 },
        { name: 'Video Editing', percentage: 95 },
        { name: 'Adaptibility', percentage: 85 }
      ],
      social: {
        facebook: 'https://www.facebook.com/share/1DVYzrMpNG/',
        twitter: '#',
        instagram: 'https://www.instagram.com/emmaweb_47?igsh=MXI3dnRpanVreHdsMA==',
        linkedin: '#'
      },
      image: '/emma-passport.jpg'
    },
    'magdalene-garba': {
      name: 'Magdalene',
      position: 'Lead UI/UX Designer',
      email: 'magdalene@company.com',
      phone: '+0123-458-790',
      experience: '6+ Years of Experience',
      bio: 'Magdalene is a creative designer with a passion for creating user-centered experiences. She has led the design of over 100 digital products and has a deep understanding of user psychology and design principles.',
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
      image: '/Magdalene.jpg'
    },
    'uke-cosmas': {
      name: 'Uke Cosmas',
      position: 'Senior Full-Stack Developer',
      email: 'ahakiricosmas@gmail.com',
      phone: '+2348108962585',
      experience: '5+ Years of Experience',
      bio: 'Uke Cosmas is a results-driven Full Stack Software Engineer who thrives at the intersection of clean code, thoughtful design, and real-world impact. With over 5 years of hands-on experience, he builds scalable, user-focused web applications using React, Next.js, Node.js, and modern databases. Beyond traditional web development, Uke brings a strong interest in AI and data-driven solutions, having contributed to intelligent systems in the fin-tech space. He is passionate about turning complex problems into elegant digital experiences and continuously evolving his craft to create products that deliver measurable value.',
      skills: [
        { name: 'React/Next.js', percentage: 95 },
        { name: 'Node.js', percentage: 90 },
        { name: 'Python', percentage: 75 },
        { name: 'Database Design', percentage: 90 },
        { name: 'Cloud Architecture', percentage: 82 },
        { name: 'DevOps', percentage: 75 }
      ],
      social: {
        facebook: '#',
        twitter: 'https://x.com/CosyBerry18490',
        instagram: '#',
        linkedin: 'https://www.linkedin.com/in/ahakiri-uke-444619351/'
      },
      image: '/profile.jpg'
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
      <TopBar/>
      <Header/>
      <MemberHero name={member.name} position={member.position} />
      <ServicesBanner />
      <MemberProfile name={member.name} position={member.position} bio={member.bio} email={member.email} phone={member.phone} experience={member.experience} image={member.image} social={member.social} />
      <MemberSkills name={member.name} skills={member.skills} />
      <ServicesBanner />
      <QuoteFormSection/>
      <ServicesBanner />
      <NewsletterSection />
      <Footer />
    </>
  );
};

export default TeamDetailPage;
