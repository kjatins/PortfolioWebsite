export interface CaseStudySection {
  id: string;
  title: string;
  description: string[];
  image?: string;
  imageAlt?: string;
  caption?: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  number: string;
  title: string;
  heroSubtitle: string;
  client: string;
  clientUrl?: string;
  duration: string;
  responsibilities: string[];
  scope: string[];
  tags: string[];
  themeColor: string;
  isDarkTheme?: boolean;
  coverImage: string;
  heroImage: string;
  confidentialityNote: string;
  overview: {
    lead?: string;
    description: string[];
  };
  sections: CaseStudySection[];
  retrospective: {
    title: string;
    paragraphs: string[];
  };
  prevProject?: {
    slug: string;
    title: string;
    client: string;
    image: string;
  };
  nextProject?: {
    slug: string;
    title: string;
    client: string;
    image: string;
  };
}

export interface ApproachPrinciple {
  number: string;
  title: string;
  description: string;
}

export interface StatMetric {
  value: string;
  label: string;
}

export type PageRoute = 'home' | 'approach' | 'aiappbuilder' | 'dubaiai' | 'sony' | 'thefriedkingroup' | 'amnhealthcare';
