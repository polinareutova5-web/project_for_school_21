// ============================================
// ПЕРВАЯ СТРАНИЦА — ГЛАВНЫЙ ЭКРАН
// Анимации, интерактивность озера с черепахами, кнопки
// ============================================

// КНОПКИ ДЕЙСТВИЙ
const applyButton = document.querySelector('.hero-apply-button');
const cabinetButton = document.querySelector('.hero-cabinet-button');

if (applyButton) {
  applyButton.addEventListener('click', () => {
    document.querySelector('#form')?.scrollIntoView({ behavior: 'smooth' });
  });
}

if (cabinetButton) {
  cabinetButton.addEventListener('click', () => {
    alert('Личный кабинет будет доступен после регистрации');
  });
}

// ОЗЕРО - ИНТЕРАКТИВНОСТЬ
const turtlePond = document.querySelector('.hero-turtle-pond');
if (turtlePond) {
  turtlePond.addEventListener('mouseenter', () => {
    turtlePond.style.transform = 'scale(1.02)';
    turtlePond.style.transition = 'transform 0.3s ease';
  });
  turtlePond.addEventListener('mouseleave', () => {
    turtlePond.style.transform = 'scale(1)';
  });
  turtlePond.addEventListener('click', () => {
    document.querySelector('#turtleButton')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// Анимация появления элементов при скролле
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.18 });

reveals.forEach((element) => observer.observe(element));

// ============================================
// КНОПКА "РЕГИСТРАЦИЯ" — ЭФФЕКТ СТЕКЛА
// ============================================
const registerButton = document.querySelector('.nav-cta');
if (registerButton) {
  registerButton.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple-effect 0.6s linear';
    ripple.style.left = e.offsetX - 25 + 'px';
    ripple.style.top = e.offsetY - 25 + 'px';
    ripple.style.width = '50px';
    ripple.style.height = '50px';
    
    registerButton.style.position = 'relative';
    registerButton.style.overflow = 'hidden';
    registerButton.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
    document.querySelector('#form')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// ЛОГОТИП
const brandIcon = document.querySelector('.brand-icon');
if (brandIcon) {
  brandIcon.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  brandIcon.addEventListener('mouseenter', () => {
    brandIcon.style.transform = 'scale(1.05)';
    brandIcon.style.transition = 'transform 0.2s ease';
  });
  brandIcon.addEventListener('mouseleave', () => {
    brandIcon.style.transform = 'scale(1)';
  });
}

// РАСКРЫТИЕ КАРТОЧЕК ПРОГРАММ
document.querySelectorAll('.program-card').forEach((card) => {
  const button = card.querySelector('.card-toggle');
  button.addEventListener('click', () => card.classList.toggle('open'));
});

// ЧЕРЕПАШЬЯ ПОДСКАЗКА
const turtleButton = document.querySelector('#turtleButton');
const turtleHint = document.querySelector('#turtleHint');
if (turtleButton && turtleHint) {
  turtleButton.addEventListener('click', () => {
    turtleHint.textContent = 'Открыты экскурсии, митапы и знакомство с командами';
  });
}

// ФОРМА ЗАЯВКИ
const form = document.querySelector('#applicationForm');
const formStatus = document.querySelector('#formStatus');
if (form && formStatus) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    localStorage.setItem('school21-application', JSON.stringify(data));
    form.reset();
    formStatus.textContent = 'Анкета сохранена. Для реальной отправки подключите обработчик формы.';
  });
}

// КНОПКА "НАВЕРХ"
const toTopButton = document.querySelector('.to-top');
if (toTopButton) {
  toTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      toTopButton.style.opacity = '1';
      toTopButton.style.pointerEvents = 'auto';
    } else {
      toTopButton.style.opacity = '0';
      toTopButton.style.pointerEvents = 'none';
    }
  });
}

// CSS-АНИМАЦИЯ ДЛЯ ЭФФЕКТА РЯБИ
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-effect {
    to { transform: scale(4); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// ИНИЦИАЛИЗАЦИЯ
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
  const savedApplication = localStorage.getItem('school21-application');
  if (savedApplication && formStatus) {
    formStatus.textContent = 'У вас есть сохранённая заявка';
  }
});
