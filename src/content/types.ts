export interface Image {
  /** Full-size image, path relative to /public */
  src: string;
  /** Smaller version for grids and cards */
  thumb: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** CSS object-position used when the image is cropped, e.g. '50% 40%' */
  focus?: string;
}

export interface Skill {
  name: string;
  /** A concrete place the skill was used — shown under the skill name. */
  usedIn: string;
}

export interface SkillGroup {
  title: string;
  summary: string;
  skills: Skill[];
}

export interface TimelineEntry {
  period: string;
  title: string;
  org: string;
  points: string[];
}

export interface CaseStudySection {
  heading: string;
  body: string;
}

export interface FeaturedProject {
  id: string;
  status: 'In progress' | 'Live' | 'Completed';
  kind: string;
  title: string;
  subtitle: string;
  summary: string;
  role: string;
  year: string;
  sections: CaseStudySection[];
  stack: string[];
  link?: { label: string; href: string };
  gallery?: Image[];
  /** Wide banner image shown with the title overlaid */
  cover?: Image;
}

export interface Project {
  title: string;
  category: string;
  year: string;
  summary: string;
  details: string;
  stack: string[];
}

export interface Certificate {
  id: string;
  title: string;
  kind: 'Certificate of Appreciation' | 'Certificate of Recognition';
  issuer: string;
  /** Human-readable date as printed on the certificate */
  date: string;
  /** ISO date used for sorting and <time datetime> */
  isoDate: string;
  description: string;
  image: Image;
}
