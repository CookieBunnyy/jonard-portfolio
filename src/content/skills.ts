import type { SkillGroup } from './types';

export const skillGroups: SkillGroup[] = [
  {
    title: 'Design',
    summary: 'Turning requirements into layouts people understand on the first visit.',
    skills: [
      { name: 'UI/UX Design', usedIn: 'APM Customs Brokerage website' },
      { name: 'Figma', usedIn: 'Wireframes and prototypes' },
      { name: 'Information Architecture', usedIn: 'APMCB services and process flow' },
    ],
  },
  {
    title: 'Frontend',
    summary: 'Responsive, accessible interfaces built with modern tooling.',
    skills: [
      { name: 'HTML & CSS', usedIn: 'Help desk ticketing UI' },
      { name: 'TypeScript / JavaScript', usedIn: 'This portfolio' },
      { name: 'Tailwind CSS', usedIn: 'This portfolio, ERP dashboards' },
    ],
  },
  {
    title: 'Systems & Data',
    summary: 'Data models and hardware logic that stay reliable under daily use.',
    skills: [
      { name: 'SQL & MySQL', usedIn: 'ERP schema normalized to 3NF' },
      { name: 'IoT Integration', usedIn: 'SCRAP-WISE thesis' },
      { name: 'PHP', usedIn: 'ERP system backend' },
    ],
  },
  {
    title: 'Languages & Tools',
    summary: 'The foundations I reach for in coursework and side projects.',
    skills: [
      { name: 'C++ & Python', usedIn: 'Data structures and algorithms' },
      { name: 'Godot / GDScript', usedIn: '2D and 3D game prototypes' },
      { name: 'Git & GitHub', usedIn: 'Version control on every project' },
    ],
  },
];
