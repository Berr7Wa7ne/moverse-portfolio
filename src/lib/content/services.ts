import { LucideIcon } from 'lucide-react';
import { 
  Monitor, 
  Smartphone, 
  Palette, 
  Megaphone, 
  ShoppingCart, 
  Search, 
  BarChart3, 
  Target 
} from "lucide-react";

interface ExpertiseItem {
  title: string;
  description: string;
}

interface ServiceData {
  icon: LucideIcon;
  image: string;
  title: string;
  description: string;
  longDescription: string;
  extraDescription: string;
  bullets: string[];
  image1: string;
  image2: string;
  expertiseTitle: string;
  expertiseDescription: string;
  expertiseItems: ExpertiseItem[];
  benefits: string[];
  benefitsTitle: string;
  benefitsIntro: string;
  benefitsItems: string[];
  featured?: boolean;
}

export const servicesBySlug: Record<string, ServiceData> = {
  'website-development': {
    icon: Monitor,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    title: 'Website Development',
    description:
      'Create stunning, responsive websites that captivate your audience and deliver exceptional user experiences across all devices.',
    longDescription:
      'Our website development services combine cutting-edge technology with user-centered design to create digital experiences that captivate your audience and achieve your business objectives.',
    extraDescription:
      'From concept to launch, we ensure every website we build is optimized for performance, accessibility, and search engines.',
    bullets: [
      'Responsive Design',
      'SEO Optimization',
      'Fast Loading Speed',
      'Mobile-First Approach',
      'Cross-Browser Compatibility',
      'Content Management System',
    ],
    image1:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    image2:
      'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    expertiseTitle: 'Our Expertise In Website Development',
    expertiseDescription:
      'We bring together modern engineering, thoughtful UX, and best practices to launch fast, accessible, and SEO-ready websites that scale with your business.',
    expertiseItems: [
      { title: 'Responsive Architecture', description: 'Fluid layouts and adaptive components ensure a consistent experience across mobile, tablet, and desktop.' },
      { title: 'SEO Foundations', description: 'Semantic HTML, structured metadata, and best-in-class performance to improve discoverability.' },
      { title: 'Performance Optimization', description: 'Code splitting, image optimization, and caching for sub-second page loads.' },
      { title: 'Accessibility (A11y)', description: 'Keyboard navigation, color contrast, and ARIA best practices for inclusive experiences.' },
      { title: 'CMS Integration', description: 'Flexible content models and editors your team loves, powered by headless or traditional CMS.' },
      { title: 'Cross‑Browser QA', description: 'Thorough testing to ensure reliability across Chrome, Safari, Firefox, and Edge.' },
    ],
    benefits: [
      'Increased Online Visibility',
      'Better User Engagement',
      'Higher Conversion Rates',
      'Professional Brand Image',
      'Scalable Solutions',
      '24/7 Technical Support',
    ],
    benefitsTitle: 'Service benefits:',
    benefitsIntro:
      'Our approach is designed to maximize impact and reduce risk. From performance to accessibility, we prioritize the fundamentals that help your product grow with confidence.',
    benefitsItems: [
      'Improved search visibility and organic traffic through technical SEO and performance best practices.',
      'Faster time‑to‑market with reusable components and a scalable architecture.',
      'Higher engagement and conversions thanks to thoughtful UX and clear content hierarchy.',
      'Reduced maintenance costs with clean code, documentation, and CI/CD automation.',
    ],
    featured: true,
  },
  'ui-ux-design': {
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    title: 'UI/UX Design',
    description:
      'Design intuitive and beautiful user interfaces that provide seamless experiences and enhance user engagement.',
    longDescription:
      'Our UI/UX design services focus on creating user-centered digital experiences that not only look great but also function flawlessly.',
    extraDescription:
      'We combine research, strategy, and creativity to design interfaces that users love and businesses benefit from.',
    bullets: [
      'User Research',
      'Wireframing & Prototyping',
      'Visual Design',
      'Usability Testing',
      'Design Systems',
      'Accessibility Compliance',
    ],
    image1:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    image2:
      'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    expertiseTitle: 'Our Expertise In UI/UX Design',
    expertiseDescription:
      'We translate product goals into clear, intuitive experiences—grounded in research, validated with prototypes, and delivered with a scalable design system.',
    expertiseItems: [
      { title: 'Research & Personas', description: 'Interviews, surveys, and user personas to align the product with audience needs.' },
      { title: 'Information Architecture', description: 'Clear navigation and content structure that reduces friction and confusion.' },
      { title: 'Wireframes & Prototypes', description: 'Rapid iterations to validate flows and interaction patterns before development.' },
      { title: 'Visual Design', description: 'Brand-aligned UI with purposeful typography, color, and spacing.' },
      { title: 'Design Systems', description: 'Reusable components and tokens for consistent, efficient product development.' },
      { title: 'Usability Testing', description: 'Evidence-based improvements using task-based and A/B testing.' },
    ],
    benefits: [
      'Improved User Satisfaction',
      'Reduced Development Time',
      'Higher User Retention',
      'Better Conversion Rates',
      'Consistent Brand Experience',
      'Reduced Support Costs',
    ],
    benefitsTitle: 'Service benefits:',
    benefitsIntro:
      'Design done right compounds value over time. By aligning business goals with user needs, we help teams ship products people actually love to use.',
    benefitsItems: [
      'Clearer product direction through research-driven decisions and measurable outcomes.',
      'Better dev velocity with design systems that promote consistency and reuse.',
      'Reduced churn by removing friction and optimizing key user journeys.',
      'Stronger brand trust with accessible, inclusive experiences.',
    ],
  },
  'application-development': {
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    title: 'Application Development',
    description:
      'Build powerful mobile applications for iOS and Android that engage users and drive business growth with modern technology.',
    longDescription:
      'Our application development services cover everything from mobile apps to enterprise software solutions.',
    extraDescription:
      'We use the latest technologies and best practices to create applications that are secure, scalable, and maintainable.',
    bullets: [
      'Requirements Analysis',
      'Architecture Design',
      'Development',
      'Testing',
      'Deployment',
      'Maintenance',
    ],
    image1:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    image2:
      'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    expertiseTitle: 'Our Expertise In Application Development',
    expertiseDescription:
      'We craft scalable, secure applications with modern tooling and rigorous QA to support growth, integrations, and long-term maintainability.',
    expertiseItems: [
      { title: 'Requirements Analysis', description: 'Align stakeholders and scope with detailed acceptance criteria and success metrics.' },
      { title: 'Scalable Architecture', description: 'Modular services and clean boundaries that evolve with product complexity.' },
      { title: 'APIs & Integrations', description: 'REST/GraphQL and third‑party integrations designed for reliability and performance.' },
      { title: 'Security & Auth', description: 'OWASP-guided practices, role‑based access, and secure data handling.' },
      { title: 'CI/CD & Testing', description: 'Automated tests and pipelines for confidence and rapid iteration.' },
      { title: 'Cloud Deployment', description: 'Containerized workloads with monitoring and alerting in the cloud.' },
    ],
    benefits: [
      'Streamlined Operations',
      'Improved Efficiency',
      'Better Data Management',
      'Enhanced Security',
      'Scalable Solutions',
      'Ongoing Support',
    ],
    benefitsTitle: 'Service benefits:',
    benefitsIntro:
      'We deliver robust applications that are secure, scalable, and maintainable—so your team can focus on features, not firefighting.',
    benefitsItems: [
      'Greater reliability and uptime with defensive coding and monitoring in place.',
      'Lower long-term costs via modular architectures and automated testing.',
      'Improved security posture with best practices for auth, data protection, and audits.',
      'Easier integrations and future growth with stable APIs and documentation.',
    ],
    featured: true,
  },
  'brand-identity': {
    icon: Megaphone,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    title: 'Brand Identity',
    description:
      'Develop strong brand identities that resonate with your audience and differentiate you from competitors.',
    longDescription:
      'Our brand identity services help you create a memorable and cohesive brand presence that stands out in the market.',
    extraDescription:
      'From logo design to brand guidelines, we ensure your brand communicates your values effectively.',
    bullets: [
      'Logo Design',
      'Brand Guidelines',
      'Visual Identity',
      'Brand Strategy',
      'Market Positioning',
      'Brand Assets',
    ],
    image1:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    image2:
      'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    expertiseTitle: 'Our Expertise In Brand Identity',
    expertiseDescription:
      'We create distinctive brand identities that capture your essence and resonate with your target audience.',
    expertiseItems: [
      { title: 'Brand Strategy', description: 'Define your unique value proposition and market positioning.' },
      { title: 'Visual Identity', description: 'Create cohesive visual systems including logos, colors, and typography.' },
      { title: 'Brand Guidelines', description: 'Comprehensive documentation for consistent brand application.' },
      { title: 'Market Research', description: 'Deep audience insights to inform brand decisions.' },
      { title: 'Brand Assets', description: 'Complete suite of marketing materials and templates.' },
      { title: 'Brand Evolution', description: 'Strategic updates to keep your brand relevant and fresh.' },
    ],
    benefits: [
      'Strong Brand Recognition',
      'Customer Loyalty',
      'Market Differentiation',
      'Professional Image',
      'Consistent Messaging',
      'Brand Value',
    ],
    benefitsTitle: 'Service benefits:',
    benefitsIntro:
      'A strong brand identity creates lasting impressions and builds trust with your audience.',
    benefitsItems: [
      'Increased brand recognition and recall in your target market.',
      'Stronger emotional connections with your audience.',
      'Clear differentiation from competitors.',
      'Consistent brand experience across all touchpoints.',
    ],
    featured: true,
  },
  'ecommerce-solutions': {
    icon: ShoppingCart,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    title: 'E-commerce Solutions',
    description:
      'Build robust online stores with secure payment systems and comprehensive inventory management features.',
    longDescription:
      'Our e-commerce solutions provide everything you need to sell online successfully and scale your business.',
    extraDescription:
      'From shopping cart functionality to payment processing, we build complete e-commerce experiences.',
    bullets: [
      'Shopping Cart',
      'Payment Integration',
      'Inventory Management',
      'Order Processing',
      'Customer Accounts',
      'Analytics & Reporting',
    ],
    image1:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    image2:
      'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    expertiseTitle: 'Our Expertise In E-commerce Solutions',
    expertiseDescription:
      'We build secure, scalable e-commerce platforms that drive sales and provide excellent shopping experiences.',
    expertiseItems: [
      { title: 'Platform Selection', description: 'Choose the right e-commerce platform for your business needs.' },
      { title: 'Payment Processing', description: 'Secure payment gateways and multiple payment options.' },
      { title: 'Inventory System', description: 'Real-time inventory tracking and automated stock management.' },
      { title: 'User Experience', description: 'Intuitive shopping flows that maximize conversions.' },
      { title: 'Mobile Commerce', description: 'Optimized mobile shopping experiences.' },
      { title: 'Analytics', description: 'Comprehensive reporting on sales, customers, and performance.' },
    ],
    benefits: [
      'Increased Sales',
      'Better Customer Experience',
      'Secure Transactions',
      'Inventory Control',
      'Scalable Platform',
      'Marketing Integration',
    ],
    benefitsTitle: 'Service benefits:',
    benefitsIntro:
      'Our e-commerce solutions are designed to grow your online revenue and provide seamless shopping experiences.',
    benefitsItems: [
      'Higher conversion rates through optimized checkout flows.',
      'Reduced cart abandonment with streamlined purchasing.',
      'Better inventory management and order fulfillment.',
      'Integrated marketing tools to drive more sales.',
    ],
  },
  'seo-optimization': {
    icon: Search,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    title: 'SEO Optimization',
    description:
      'Improve your search engine rankings and drive organic traffic with our comprehensive SEO strategies.',
    longDescription:
      'Our SEO services help you achieve higher rankings and increased visibility in search engines.',
    extraDescription:
      'From technical SEO to content optimization, we cover all aspects of search engine optimization.',
    bullets: [
      'Keyword Research',
      'On-Page SEO',
      'Technical SEO',
      'Link Building',
      'Content Strategy',
      'Analytics & Reporting',
    ],
    image1:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    image2:
      'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    expertiseTitle: 'Our Expertise In SEO Optimization',
    expertiseDescription:
      'We implement proven SEO strategies that improve your search visibility and drive qualified traffic.',
    expertiseItems: [
      { title: 'Technical Audit', description: 'Comprehensive site analysis to identify SEO issues.' },
      { title: 'Keyword Strategy', description: 'Research and target the right keywords for your business.' },
      { title: 'On-Page SEO', description: 'Optimize content, meta tags, and site structure.' },
      { title: 'Link Building', description: 'Build high-quality backlinks to boost authority.' },
      { title: 'Content Creation', description: 'SEO-optimized content that engages and converts.' },
      { title: 'Performance Tracking', description: 'Monitor rankings, traffic, and ROI.' },
    ],
    benefits: [
      'Higher Rankings',
      'Increased Traffic',
      'Better Visibility',
      'Qualified Leads',
      'Long-term Results',
      'Cost-Effective Marketing',
    ],
    benefitsTitle: 'Service benefits:',
    benefitsIntro:
      'SEO delivers sustainable, long-term growth by connecting you with customers actively searching for your services.',
    benefitsItems: [
      'Increased organic traffic and qualified leads.',
      'Better visibility for high-intent keywords.',
      'Improved brand authority and trust.',
      'Higher ROI compared to paid advertising.',
    ],
  },
  'digital-marketing': {
    icon: BarChart3,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    title: 'Digital Marketing',
    description:
      'Boost your online presence with strategic digital marketing campaigns that reach your target audience effectively.',
    longDescription:
      'Our digital marketing services help you reach and engage your target audience across multiple channels.',
    extraDescription:
      'From social media to email marketing, we create integrated campaigns that drive results.',
    bullets: [
      'Social Media Marketing',
      'Email Campaigns',
      'Content Marketing',
      'PPC Advertising',
      'Marketing Automation',
      'Analytics & Optimization',
    ],
    image1:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    image2:
      'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    expertiseTitle: 'Our Expertise In Digital Marketing',
    expertiseDescription:
      'We create data-driven marketing strategies that reach your audience and drive measurable business growth.',
    expertiseItems: [
      { title: 'Strategy Development', description: 'Comprehensive marketing plans aligned with business goals.' },
      { title: 'Multi-Channel Campaigns', description: 'Integrated campaigns across social, email, and paid channels.' },
      { title: 'Content Creation', description: 'Engaging content that resonates with your audience.' },
      { title: 'Paid Advertising', description: 'Targeted PPC campaigns on Google, Facebook, and more.' },
      { title: 'Marketing Automation', description: 'Streamlined workflows for efficient lead nurturing.' },
      { title: 'Performance Analysis', description: 'Data-driven insights to optimize campaign performance.' },
    ],
    benefits: [
      'Increased Brand Awareness',
      'Higher Engagement',
      'More Leads',
      'Better ROI',
      'Customer Insights',
      'Scalable Growth',
    ],
    benefitsTitle: 'Service benefits:',
    benefitsIntro:
      'Our digital marketing strategies deliver measurable results and help you achieve your business objectives.',
    benefitsItems: [
      'Increased brand visibility across digital channels.',
      'Higher quality leads and improved conversion rates.',
      'Better customer engagement and loyalty.',
      'Data-driven optimization for maximum ROI.',
    ],
  },
  'graphic-design': {
    icon: Target,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    title: 'Graphic Design',
    description:
      'Create visually stunning graphics and marketing materials that communicate your message effectively.',
    longDescription:
      'Our graphic design services bring your brand to life with compelling visual content.',
    extraDescription:
      'From print to digital, we create designs that capture attention and drive action.',
    bullets: [
      'Logo Design',
      'Marketing Materials',
      'Social Media Graphics',
      'Print Design',
      'Infographics',
      'Brand Assets',
    ],
    image1:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    image2:
      'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    expertiseTitle: 'Our Expertise In Graphic Design',
    expertiseDescription:
      'We create impactful visual designs that communicate your message and strengthen your brand identity.',
    expertiseItems: [
      { title: 'Brand Design', description: 'Logos, color schemes, and visual identity systems.' },
      { title: 'Marketing Collateral', description: 'Brochures, flyers, and promotional materials.' },
      { title: 'Digital Graphics', description: 'Social media posts, banners, and web graphics.' },
      { title: 'Print Design', description: 'Business cards, letterheads, and packaging.' },
      { title: 'Infographics', description: 'Data visualization and information design.' },
      { title: 'Illustration', description: 'Custom illustrations and iconography.' },
    ],
    benefits: [
      'Professional Appearance',
      'Brand Consistency',
      'Better Communication',
      'Increased Engagement',
      'Competitive Advantage',
      'Versatile Assets',
    ],
    benefitsTitle: 'Service benefits:',
    benefitsIntro:
      'Great design captures attention, communicates effectively, and strengthens your brand presence.',
    benefitsItems: [
      'More professional and polished brand image.',
      'Better visual communication of complex ideas.',
      'Increased engagement across all marketing materials.',
      'Consistent brand experience across all touchpoints.',
    ],
  },
};

export function listServices() {
  return Object.entries(servicesBySlug).map(([slug, service]) => ({ slug, ...service }));
}

export function getService(slug: string) {
  return servicesBySlug[slug] ?? null;
}

export function listServiceSlugs(): string[] {
  return Object.keys(servicesBySlug);
}

export function getFeaturedServices() {
  return Object.entries(servicesBySlug)
    .filter(([_, service]) => service.featured)
    .map(([slug, service]) => ({ slug, ...service }));
}