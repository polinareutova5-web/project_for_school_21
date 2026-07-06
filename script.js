const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.18 });
reveals.forEach((element) => observer.observe(element));

document.querySelectorAll('.program-card').forEach((card) => {
  const button = card.querySelector('.card-toggle');
  button.addEventListener('click', () => card.classList.toggle('open'));
});

const turtleButton = document.querySelector('#turtleButton');
const turtleHint = document.querySelector('#turtleHint');
turtleButton.addEventListener('click', () => {
  turtleHint.textContent = 'Открыты экскурсии, митапы и знакомство с командами';
});

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

const form = document.querySelector('#applicationForm');
const formStatus = document.querySelector('#formStatus');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  localStorage.setItem('school21-application', JSON.stringify(data));
  form.reset();
  formStatus.textContent = 'Анкета сохранена. Для реальной отправки подключите обработчик формы.';
});
