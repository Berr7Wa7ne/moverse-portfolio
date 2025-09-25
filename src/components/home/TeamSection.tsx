import React from 'react';
import Link from 'next/link';

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      title: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Sarah Williams',
      title: 'Lead Designer',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Michael Chen',
      title: 'Senior Developer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Emily Davis',
      title: 'Project Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'David Rodriguez',
      title: 'UX Specialist',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Lisa Thompson',
      title: 'Marketing Director',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'James Wilson',
      title: 'Backend Developer',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Maria Garcia',
      title: 'Quality Assurance',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    }
  ];

  const socialIcons = ['Facebook', 'Twitter', 'LinkedIn'];

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="flex justify-between items-start mb-16">
          <span className="text-sm text-[var(--gray-600)] uppercase tracking-wider">Our Team</span>
          <Link href="/team" className="btn-primary">
            View All
          </Link>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--primary-blue)] leading-tight">
            Meet Our{' '}
            <span className="text-[var(--accent-blue)]">Expert team</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <h3 className="text-lg font-bold text-[var(--primary-blue)] mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-[var(--gray-600)] mb-4">
                {member.title}
              </p>
              
              {/* Social Icons */}
              <div className="flex justify-center gap-2">
                {socialIcons.map((social) => (
                  <button
                    key={social}
                    className="w-8 h-8 bg-[var(--gray-200)] hover:bg-[var(--accent-blue)] hover:text-white transition-colors rounded-full flex items-center justify-center text-xs font-medium text-[var(--gray-600)]"
                  >
                    {social[0]}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
