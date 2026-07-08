const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const href = anchor.getAttribute('href');
    const target = href && href !== '#' ? document.querySelector(href) : null;
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const modal = document.querySelector('#modal');
const modalText = modal?.querySelector('p');
const closeModal = () => modal?.classList.remove('open');

document.querySelectorAll('[data-popup]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!modal || !modalText) return;
    modalText.textContent = button.dataset.popup || '';
    modal.classList.add('open');
  });
});

modal?.addEventListener('click', (event) => {
  if (event.target === modal || event.target.classList.contains('modal-close')) closeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

const form = document.querySelector('#applicationForm');
const formStatus = document.querySelector('#formStatus');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  localStorage.setItem('school21-application', JSON.stringify(data));
  form.reset();
  if (formStatus) formStatus.textContent = 'Анкета сохранена. Для реальной отправки подключите обработчик формы.';
});

if (localStorage.getItem('school21-application') && formStatus) {
  formStatus.textContent = 'У вас есть сохранённая заявка';
}
styles (11).css

