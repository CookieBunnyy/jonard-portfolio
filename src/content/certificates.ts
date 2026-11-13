import type { Certificate } from './types';

const img = (id: string, alt: string, width: number, height: number) => ({
  src: `images/certificates/${id}.webp`,
  thumb: `images/certificates/${id}-thumb.webp`,
  alt,
  width,
  height,
});

/** Add new certificates here. They are shown newest first (sorted by isoDate). */
const certificates: Certificate[] = [
  {
    id: 'bscs-general-assembly-2025',
    title: 'BSCS General Assembly 2025',
    kind: 'Certificate of Appreciation',
    issuer: 'CvSU Bacoor · Department of Computer Studies & Alliance of Computer Scientists',
    date: 'November 18, 2025',
    isoDate: '2025-11-18',
    description: 'For planning, organizing and running the BSCS General Assembly 2025.',
    image: img('bscs-general-assembly-2025', 'Certificate of Appreciation from Cavite State University Bacoor awarded to Jonard R. Rustique for the BSCS General Assembly 2025', 1600, 1153),
  },
  {
    id: 'ssg-president',
    title: 'SSG President',
    kind: 'Certificate of Appreciation',
    issuer: 'SHS in San Nicholas III · ICT Club',
    date: '2023',
    isoDate: '2023-07-01',
    description: 'For service and leadership as Supreme Student Government President.',
    image: img('ssg-president', 'Certificate of Appreciation awarded to Jonard Roa Rustique for his service as SSG President', 1600, 1132),
  },
  {
    id: 'work-immersion-2023',
    title: 'Outstanding Work Immersion Performance',
    kind: 'Certificate of Recognition',
    issuer: 'DepEd · SHS in San Nicholas III',
    date: 'July 13, 2023',
    isoDate: '2023-07-13',
    description: 'For commendable work ethics throughout the Work Immersion Program, S.Y. 2022–2023.',
    image: img('work-immersion-2023', 'Certificate of Recognition awarded to Jonard Roa Rustique for outstanding performance in the Work Immersion Program', 1600, 1120),
  },
  {
    id: 'technical-support-team-2023',
    title: 'Technical Support Team',
    kind: 'Certificate of Recognition',
    issuer: 'DepEd · SHS in San Nicholas III',
    date: 'February 3, 2023',
    isoDate: '2023-02-03',
    description: 'Technical support for the PE and Health 3 Culminating Activity (Festival Dances).',
    image: img('technical-support-team-2023', 'Certificate of Recognition awarded to Jonard Roa Rustique as part of the technical support team for the Festival Dances culminating activity', 1600, 1136),
  },
  {
    id: 'ssg-ict-representative-2022',
    title: 'SSG ICT 11 Representative',
    kind: 'Certificate of Appreciation',
    issuer: 'DepEd · SHS in San Nicholas III',
    date: 'July 8, 2022',
    isoDate: '2022-07-08',
    description: 'For leadership programs that promoted unity and collaboration among learners.',
    image: img('ssg-ict-representative-2022', 'Certificate of Appreciation awarded to Jonard R. Rustique as SSG ICT 11 Representative', 1600, 1194),
  },
];

export const sortedCertificates = [...certificates].sort((a, b) => b.isoDate.localeCompare(a.isoDate));
