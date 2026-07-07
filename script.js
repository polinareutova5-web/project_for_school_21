// ============================================
// ПЕРВАЯ СТРАНИЦА — ГЛАВНЫЙ ЭКРАН
// ⚠️ ЗДЕСЬ РЕДАКТИРУЕТСЯ ФУНКЦИОНАЛ ПЕРВОЙ СТРАНИЦЫ
// Анимации, интерактивность озера с черепахами, кнопки
// ============================================

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
// ⚠️ ОБРАБОТКА НАЖАТИЯ НА СТЕКЛЯННУЮ КНОПКУ
// ============================================
const registerButton = document.querySelector('.nav-cta');
if (registerButton) {
  registerButton.addEventListener('click', (e) => {
    // Эффект блика при клике
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
    
    // Прокрутка к форме заявки
    document.querySelector('#form')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// ============================================
// ОЗЕРО С ЧЕРЕПАХАМИ НА ПЕРВОЙ СТРАНИЦЕ
// ⚠️ ИНТЕРАКТИВНОСТЬ ЧЕРЕПАШЬЕГО ОЗЕРА
// ============================================
const turtlePond = document.querySelector('.hero-turtle-pond');
if (turtlePond) {
  // Эффект при наведении на озеро
  turtlePond.addEventListener('mouseenter', () => {
    turtlePond.style.transform = 'scale(1.02)';
    turtlePond.style.transition = 'transform 0.3s ease';
  });
  
  turtlePond.addEventListener('mouseleave', () => {
    turtlePond.style.transform = 'scale(1)';
  });
  
  // Клик по озеру — плавная прокрутка к разделу с черепахами
  turtlePond.addEventListener('click', () => {
    document.querySelector('.turtle-section')?.scrollIntoView({ behavior: 'smooth' });
  });
}

// Анимация черепах в озере
const pondTurtles = document.querySelectorAll('.pond-turtle');
pondTurtles.forEach((turtle, index) => {
  turtle.addEventListener('mouseenter', () => {
    turtle.style.animation = 'turtle-float 2s ease-in-out infinite';
  });
  
  turtle.addEventListener('mouseleave', () => {
    turtle.style.animation = `turtle-float 5s ease-in-out infinite`;
    turtle.style.animationDelay = `${index * 0.8}s`;
  });
});

// ============================================
// КНОПКИ ДЕЙСТВИЙ НА ПЕРВОЙ СТРАНИЦЕ
// ⚠️ "ПОДАТЬ ЗАЯВКУ" И "ЛИЧНЫЙ КАБИНЕТ"
// ============================================
const applyButton = document.querySelector('.button-apply');
if (applyButton) {
  applyButton.addEventListener('click', () => {
    document.querySelector('#form')?.scrollIntoView({ behavior: 'smooth' });
  });
}

const cabinetButton = document.querySelector('.button-cabinet');
if (cabinetButton) {
  cabinetButton.addEventListener('click', () => {
    // Здесь будет переход в личный кабинет
    alert('Личный кабинет будет доступен после регистрации');
  });
}

// ============================================
// ЛОГОТИП/ИКОНКА СВЕРХУ СЛЕВА
// ⚠️ ОБРАБОТКА КЛИКА ПО ЛОГОТИПУ
// ============================================
const brandIcon = document.querySelector('.brand-icon');
if (brandIcon) {
  brandIcon.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Эффект при наведении
  brandIcon.addEventListener('mouseenter', () => {
    brandIcon.style.transform = 'scale(1.05)';
    brandIcon.style.transition = 'transform 0.2s ease';
  });
  
  brandIcon.addEventListener('mouseleave', () => {
    brandIcon.style.transform = 'scale(1)';
  });
}

// ============================================
// ОСНОВНОЙ ФУНКЦИОНАЛ САЙТА
// (без изменений, работает на всех страницах)
// ============================================

// Раскрытие карточек программ
document.querySelectorAll('.program-card').forEach((card) => {
  const button = card.querySelector('.card-toggle');
  button.addEventListener('click', () => card.classList.toggle('open'));
});

// ============================================
// ЧЕРЕПАШЬЯ ПОДСКАЗКА
// ============================================
const turtleButton = document.querySelector('#turtleButton');
const turtleHint = document.querySelector('#turtleHint');

if (turtleButton && turtleHint) {
  turtleButton.addEventListener('click', () => {
    turtleHint.textContent = 'Открыты экскурсии, митапы и знакомство с командами';
  });
}

// ============================================
// ВЫБОР ПУТИ (УТКА ИЛИ ЧЕРЕПАХА)
// ============================================
const choiceResult = document.querySelector('#choiceResult');
document.querySelectorAll('.choice-button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.choice-button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    choiceResult.textContent = button.dataset.path === 'duck'
      ? 'Утка ведёт к основной программе и проектной практике.'
      : 'Черепаха открывает кампус, мероприятия и спокойное знакомство.';
  });
});

// ============================================
// ФОРМА ЗАЯВКИ
// ============================================
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

// ============================================
// КНОПКА "НАВЕРХ"
// ============================================
const toTopButton = document.querySelector('.to-top');
if (toTopButton) {
  toTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Показывать/скрывать кнопку при скролле
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

// ============================================
// CSS-АНИМАЦИЯ ДЛЯ ЭФФЕКТА РЯБИ НА КНОПКЕ
// ============================================
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-effect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes turtle-float {
    0%, 100% { 
      transform: translate(0, 0) rotate(0deg); 
    }
    50% { 
      transform: translate(8px, -6px) rotate(2deg); 
    }
  }
`;
document.head.appendChild(style);

// ============================================
// НАВИГАЦИЯ — ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ
// ============================================
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

// ============================================
// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Добавляем класс loaded для анимаций
  document.body.classList.add('loaded');
  
  // Проверяем, есть ли сохранённая заявка
  const savedApplication = localStorage.getItem('school21-application');
  if (savedApplication && formStatus) {
    formStatus.textContent = 'У вас есть сохранённая заявка';
  }
});
