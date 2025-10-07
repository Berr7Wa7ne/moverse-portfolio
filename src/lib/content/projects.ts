import { Project } from '@/types/content';

export const projectsBySlug: Record<string, Project> = {
  'car-rental-app': {
    title: 'Car Rental - Car Rental Booking Mobile App',
    category: 'Mobile App Development',
    client: 'Dianne Russell',
    location: 'United States',
    year: '2024',
    description:
      'A comprehensive car rental booking mobile application that allows users to search, compare, and book rental cars with ease. The app features real-time availability, secure payment processing, and GPS integration for pickup locations.',
    challenge:
      'The main challenge was creating an intuitive user experience that could handle complex booking logic while maintaining fast performance across different devices and network conditions.',
    service:
      'We developed a full-stack mobile application using React Native for cross-platform compatibility, integrated with a robust backend API for real-time data management and payment processing.',
    results:
      'The app achieved a 4.8-star rating on app stores with over 50,000 downloads in the first month. User engagement increased by 300% compared to the previous web-based solution.',
    features: [
      'Real-time car availability',
      'GPS integration for pickup locations',
      'Secure payment processing',
      'User reviews and ratings',
      'Booking management',
      'Push notifications',
    ],
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Stripe API', 'Google Maps API'],
    images: [
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    ],
    testimonial: {
      text:
        'The car rental app exceeded our expectations. The user experience is seamless and the booking process is incredibly smooth. Our customers love the new interface.',
      author: 'Leslie Alexander',
      position: 'CEO, Software Company',
      rating: 5.0,
      image:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
  },
  'doctor-appointment-app': {
    title: 'Core Connect - Doctor Appointment App',
    description:
      'A comprehensive healthcare app that connects patients with doctors for easy appointment booking, telemedicine consultations, and health record management.',
    category: 'Healthcare App',
    client: 'Dr. Sarah Johnson',
    location: 'Canada',
    year: '2024',
    challenge:
      'Creating a secure platform that complies with healthcare regulations while providing an intuitive user experience for both patients and healthcare providers.',
    service:
      'We developed a HIPAA-compliant mobile and web application with end-to-end encryption, secure video calling, and integrated health record management.',
    results:
      'The platform successfully onboarded 200+ healthcare providers and 10,000+ patients within the first 6 months, with a 95% user satisfaction rate.',
    features: [
      'Appointment scheduling',
      'Video consultations',
      'Health record management',
      'Prescription management',
      'Insurance verification',
      'Secure messaging',
    ],
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'WebRTC', 'AWS'],
    images: [
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    ],
    testimonial: {
      text:
        'Core Connect has revolutionized how we manage patient appointments. The platform is secure, user-friendly, and has significantly improved our practice efficiency.',
      author: 'Dr. Michael Chen',
      position: 'Medical Director',
      rating: 5.0,
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
  },
  'dental-clinic-website': {
    title: 'Dental - Dentist and Dental Clinic Website UI/UX Design',
    description:
      'A modern, responsive website for a dental clinic featuring online appointment booking, service information, and patient resources.',
    category: 'Website Design',
    client: 'Smile Dental Clinic',
    location: 'United Kingdom',
    year: '2024',
    challenge:
      'Creating a trustworthy and professional online presence that would help patients feel comfortable booking dental appointments online.',
    service:
      'We designed and developed a fully responsive website with an intuitive appointment booking system, patient portal, and comprehensive service information.',
    results:
      'Online appointment bookings increased by 400% and the website achieved a 98% user satisfaction rate for ease of use.',
    features: [
      'Online appointment booking',
      'Patient portal',
      'Service information',
      'Doctor profiles',
      'Insurance information',
      'Emergency contact',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'MongoDB'],
    images: [
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    ],
    testimonial: {
      text:
        'The new website has transformed our practice. Patients can easily book appointments online, and the professional design has increased our credibility significantly.',
      author: 'Dr. Emily Rodriguez',
      position: 'Practice Owner',
      rating: 5.0,
      image:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
  },
};

export function listProjects() {
  return Object.entries(projectsBySlug).map(([slug, project]) => ({ slug, ...project }));
}

export function getProject(slug: string) {
  return projectsBySlug[slug] ?? null;
}

export function listProjectSlugs(): string[] {
  return Object.keys(projectsBySlug);
}


