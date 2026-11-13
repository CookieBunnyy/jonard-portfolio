import '@fontsource-variable/jost';
import '@fontsource-variable/open-sans';
import './styles/main.css';

import { initContactForm } from './scripts/contact-form';
import { initHeader } from './scripts/header';
import { initLightbox } from './scripts/lightbox';
import { initParallax, initReveal } from './scripts/motion';

initHeader();
initReveal();
initParallax();
initLightbox();
initContactForm();
