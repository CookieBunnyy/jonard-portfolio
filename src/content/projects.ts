import type { FeaturedProject, Project } from './types';

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'scrap-wise',
    status: 'In progress',
    kind: 'Undergraduate thesis · IoT + Information System',
    title: 'SCRAP-WISE',
    subtitle:
      'An Automated IoT-Driven Food Waste Processing and Management Information System for Lahok Restaurant',
    summary:
      'A working machine and a web system built together: the hardware shreds, drains and collects kitchen scraps automatically, while the information system records every batch so the restaurant can see how much waste it produces and act on it.',
    role: 'Thesis researcher & developer',
    year: '2026',
    sections: [
      {
        heading: 'The problem',
        body: 'Restaurants throw out food scraps every day, but handling them is manual and messy, and nobody tracks how much is wasted. Without numbers, a kitchen has nothing to base waste-reduction decisions on.',
      },
      {
        heading: 'The system',
        body: 'Scraps are loaded into a stainless-steel shredder mounted on a galvanized steel frame. A linear actuator controls the discharge, sending shredded waste down a chute onto a perforated tray that drains excess liquid before it drops into a collection bin.',
      },
      {
        heading: 'The information system',
        body: 'Machine activity is logged to a management information system where restaurant staff can monitor processing, review waste records over time and produce reports for management.',
      },
    ],
    stack: ['IoT hardware', 'Microcontroller & sensors', 'Linear actuator control', 'Web-based MIS', 'Database design'],
    gallery: [
      {
        src: 'images/scrapwise/actuator-assembly.webp',
        thumb: 'images/scrapwise/actuator-assembly-thumb.webp',
        alt: 'Linear actuator bolted to a welded bracket beside the shredder drum and discharge chute',
        width: 1400,
        height: 1867,
        caption: 'Linear actuator and discharge chute beside the shredder.',
        label: 'Actuator & chute',
        focus: '50% 45%',
      },
      {
        src: 'images/scrapwise/shredder-unit.webp',
        thumb: 'images/scrapwise/shredder-unit-thumb.webp',
        alt: 'Stainless-steel shredder drum mounted on a stand inside the galvanized steel SCRAP-WISE frame',
        width: 1400,
        height: 1867,
        caption: 'Shredder unit mounted on the main frame during assembly.',
        label: 'Shredder unit',
        focus: '55% 30%',
      },
      {
        src: 'images/scrapwise/sieve-and-collection.webp',
        thumb: 'images/scrapwise/sieve-and-collection-thumb.webp',
        alt: 'Perforated draining tray angled over a 30 cm stainless collection pot lined with an orange bag',
        width: 1400,
        height: 1867,
        caption: 'Perforated draining tray feeding the collection bin.',
        label: 'Drain & collect',
        focus: '50% 50%',
      },
    ],
  },
  {
    id: 'apmcb',
    status: 'Live',
    kind: 'Client website · Deployed',
    title: 'APM Customs Brokerage',
    subtitle: 'Corporate website for a licensed customs broker in Parañaque City',
    summary:
      'APM Customs Brokerage has helped importers and exporters clear goods through Philippine ports since 2011. The website needed to explain a technical service clearly and turn visitors into consultation requests.',
    role: 'UI/UX Designer',
    year: '2025',
    sections: [
      {
        heading: 'Structure',
        body: 'A single-page journey ordered the way a first-time importer thinks: who APM is, what they handle, how the process works, common questions, then how to reach them.',
      },
      {
        heading: 'Clarity',
        body: 'Six services became scannable cards, each with a direct “Request this service” action, and the clearance process was broken into five numbered steps so customs work feels predictable.',
      },
      {
        heading: 'Conversion',
        body: 'A validated consultation form, a map with directions and visible phone and email details give every visitor an easy next step, with English, Chinese and Japanese language options.',
      },
    ],
    stack: ['UI/UX design', 'Information architecture', 'Wireframing', 'Responsive layout', 'Form UX'],
    link: { label: 'Visit apmcb.com', href: 'https://apmcb.com/' },
    cover: {
      src: 'images/apmcb/cargo.webp',
      thumb: 'images/apmcb/cargo-thumb.webp',
      alt: 'A worker in a hard hat and safety vest checks a red boom lift strapped onto a flat-rack container at a port',
      width: 1600,
      height: 1200,
      focus: '60% 45%',
    },
  },
];

export const otherProjects: Project[] = [
  {
    title: 'Database Normalization & ERP System',
    category: 'Backend',
    year: 'Coursework',
    summary: 'Relational database architecture for modular enterprise management.',
    details:
      'Normalized the data model up to Third Normal Form (3NF), defined foreign-key relationships between modules and built responsive dashboards on top of the optimized schema.',
    stack: ['MySQL', 'SQL', 'PHP', 'Tailwind CSS'],
  },
  {
    title: 'Help Desk Ticketing Interface',
    category: 'UI Design',
    year: 'Coursework',
    summary: 'A streamlined interface for tracking technical support requests.',
    details:
      'Designed and built role-based help desk layouts covering ticket submission, request status tracking and structured user reporting, prototyped first in Figma.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Figma'],
  },
  {
    title: '2D / 3D Game Prototypes',
    category: 'Systems',
    year: 'Coursework',
    summary: 'Custom game logic and player mechanics built in the Godot Engine.',
    details:
      'Configured physics bodies and collision detection, and wrote custom movement state machines in GDScript for both 2D and 3D scenes.',
    stack: ['Godot Engine', 'GDScript', 'Physics'],
  },
];
