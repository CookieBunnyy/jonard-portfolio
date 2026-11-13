import { $ } from './dom';

type Field = 'name' | 'email' | 'message';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(field: Field, value: string): string {
  if (!value.trim()) return 'This field is required.';
  if (field === 'email' && !EMAIL_PATTERN.test(value.trim())) return 'Please enter a valid email address.';
  if (field === 'message' && value.trim().length < 10) return 'Please write at least 10 characters.';
  return '';
}

/**
 * Validates the contact form and opens the visitor's email app with the
 * message pre-filled (no backend or third-party form service needed).
 */
export function initContactForm(): void {
  const form = $<HTMLFormElement>('#contact-form');
  const status = $('#form-status');
  if (!form) return;
  const fields: Field[] = ['name', 'email', 'message'];

  const check = (field: Field): boolean => {
    const input = form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement | null;
    const error = $(`#${field}-error`);
    if (!input || !error) return true;
    const message = validate(field, input.value);
    input.setAttribute('aria-invalid', String(Boolean(message)));
    error.textContent = message;
    error.classList.toggle('hidden', !message);
    return !message;
  };

  fields.forEach((field) => {
    const input = form.elements.namedItem(field) as HTMLInputElement | null;
    input?.addEventListener('blur', () => input.value && check(field));
    input?.addEventListener('input', () => input.getAttribute('aria-invalid') === 'true' && check(field));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const results = fields.map(check);
    if (results.includes(false)) {
      const firstInvalid = fields[results.indexOf(false)];
      (form.elements.namedItem(firstInvalid ?? 'name') as HTMLElement | null)?.focus();
      return;
    }

    const data = new FormData(form);
    const name = String(data.get('name')).trim();
    const email = String(data.get('email')).trim();
    const message = String(data.get('message')).trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);

    window.location.href = `mailto:${form.dataset.email}?subject=${subject}&body=${body}`;

    if (status) {
      status.textContent = 'Your email app should open now. Thank you for reaching out!';
      status.classList.remove('hidden');
    }
    form.reset();
  });
}
