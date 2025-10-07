export type ServiceFeature = {
  title: string;
  description: string;
};

export type Service = {
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
  expertiseItems: ServiceFeature[];
  benefits: string[];
  benefitsTitle: string;
  benefitsIntro: string;
  benefitsItems: string[];
};

export type Testimonial = {
  text: string;
  author: string;
  position: string;
  rating: number;
  image: string;
};

export type Project = {
  title: string;
  description: string;
  category: string;
  client: string;
  location: string;
  year: string;
  challenge: string;
  service: string;
  results: string;
  features: string[];
  technologies: string[];
  images: string[];
  testimonial: Testimonial;
};



