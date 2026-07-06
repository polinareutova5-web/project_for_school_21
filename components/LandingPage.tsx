'use client';

import { FormEvent, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp, CalendarDays, Check, ChevronDown, Compass, GraduationCap, Map, Menu, Sparkles, Users } from 'lucide-react';

const navItems = [
  ['Путь', '#story'], ['Программы', '#programs'], ['Выбор', '#choice'], ['Преимущества', '#benefits'], ['Регистрация', '#register']
];

const programs = [
  {
    title: 'Основная программа',
    facts: ['peer-to-peer обучение', 'проектный трек', 'гибкий темп', 'кампусная среда'],
    text: 'Маршрут для тех, кто хочет глубоко войти в прикладную разработку и собрать сильное портфолио.'
  },
  {
    title: 'Образовательные мероприятия',
    facts: ['митапы', 'воркшопы', 'хакатоны', 'карьерные встречи'],
    text: 'Дополнительная река событий помогает быстрее познакомиться с индустрией и сообществом.'
  }
];

const benefits = [
  ['Практика', 'Обучение строится вокруг реальных задач и командной разработки.', GraduationCap],
  ['Сообщество', 'Участники помогают друг другу и растут через обратную связь.', Users],
  ['Кампус', 'Чистое пространство для концентрации, встреч и экспериментов.', Map],
  ['События', 'Регулярные активности связывают обучение с индустрией.', CalendarDays],
  ['Маршрут', 'Можно выбрать собственную скорость и дополнительные треки.', Compass]
];

function Duck({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute text-5xl drop-shadow-sm ${className}`}
      animate={{ y: [0, -10, 0], x: [0, 8, -4, 0] }}
      transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
      whileHover={{ scale: 1.12 }}
      aria-hidden
    >
      🦆
    </motion.div>
  );
}

function Turtle() {
  const [open, setOpen] = useState(false);
  return (
    <motion.button
      type="button"
      onClick={() => setOpen(!open)}
      className="group mx-auto flex max-w-xl flex-col items-center rounded-[2rem] bg-white p-8 text-center shadow-soft brand-ring"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      whileHover={{ y: -8 }}
    >
      <motion.span className="text-7xl" animate={{ rotate: [0, -3, 3, 0] }} transition={{ duration: 5, repeat: Infinity }}>🐢</motion.span>
      <span className="mt-6 text-3xl font-black">Исследовать кампус</span>
      <span className="mt-3 text-zinc-600">Черепаха предлагает спокойный маршрут по событиям, пространствам и возможностям.</span>
      {open && <span className="mt-5 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white">Открыты экскурсии, митапы и знакомство с командами</span>}
    </motion.button>
  );
}

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const riverY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const duckX = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '22%', '44%']);
  const [path, setPath] = useState<'duck' | 'turtle'>('duck');
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main className="overflow-hidden bg-white">
      <header className="fixed left-1/2 top-4 z-50 flex w-[min(1120px,calc(100%-24px))] -translate-x-1/2 items-center justify-between rounded-full border border-black/10 bg-white/80 px-5 py-3 backdrop-blur-xl">
        <a href="#hero" className="font-black tracking-tight brand-text">РУДН × 21</a>
        <nav className="hidden gap-5 text-sm font-semibold md:flex">
          {navItems.map(([label, href]) => <a key={href} href={href} className="transition hover:text-school-teal">{label}</a>)}
        </nav>
        <Menu className="md:hidden" size={20} />
      </header>

      <section id="hero" className="relative grid min-h-screen place-items-center px-6 pt-24">
        <motion.div style={{ y: riverY }} className="river-surface absolute inset-6 rounded-[3rem]" />
        <Duck className="left-[10%] top-[35%]" />
        <Duck className="right-[18%] top-[28%] text-4xl" delay={1.4} />
        <Duck className="bottom-[20%] left-[54%] text-3xl" delay={2.2} />
        <div className="relative z-10 max-w-6xl text-center">
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-sm font-bold uppercase tracking-[.3em]">Река знаний начинается здесь</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }} className="text-5xl font-black leading-[.95] tracking-[-.06em] md:text-8xl lg:text-9xl">
            Центр прикладного программирования <span className="brand-text">РУДН × Школа 21</span>
          </motion.h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-zinc-700 md:text-2xl">Интерактивный кампус, где обучение превращается в путь: от первого проекта до уверенной разработки в команде.</p>
          <a href="#story" className="mt-10 inline-flex items-center gap-3 rounded-full bg-brand px-8 py-4 font-black text-white transition hover:scale-105">Стать частью кампуса <ChevronDown size={20} /></a>
        </div>
      </section>

      <section id="story" className="relative px-6 py-28 md:py-40">
        <motion.div style={{ x: duckX }} className="absolute left-8 top-16 text-6xl">🦆</motion.div>
        <div className="mx-auto max-w-5xl">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl font-black tracking-[-.05em] md:text-8xl">История начинается плавно</motion.h2>
          <p className="mt-8 max-w-2xl text-xl text-zinc-600">Камера движется вниз по реке: на берегах появляются камыши, листья, круги на воде и короткие смысловые подсказки.</p>
          <div className="mt-12 grid gap-4 md:grid-cols-4">{['камыш', 'листья', 'волны', 'круги'].map((item) => <span key={item} className="rounded-3xl border border-black/10 p-6 text-2xl font-black">{item}</span>)}</div>
        </div>
      </section>

      <section id="programs" className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-5xl font-black tracking-[-.05em] md:text-8xl">Река делится на два маршрута</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {programs.map((program) => <details key={program.title} className="group rounded-[2rem] border border-black/10 bg-white p-8 shadow-soft open:bg-zinc-50"><summary className="cursor-pointer list-none text-3xl font-black">{program.title}</summary><p className="mt-5 text-zinc-600">{program.text}</p><ul className="mt-6 grid gap-3">{program.facts.map((fact) => <li key={fact} className="flex items-center gap-3"><Check className="text-school-teal" />{fact}</li>)}</ul><button className="mt-7 rounded-full bg-brand px-6 py-3 font-bold text-white">Подробнее</button></details>)}
          </div>
        </div>
      </section>

      <section className="px-6 py-28"><Turtle /></section>

      <section id="choice" className="px-6 py-28">
        <div className="mx-auto max-w-6xl rounded-[3rem] bg-zinc-950 p-8 text-white md:p-14">
          <h2 className="text-5xl font-black tracking-[-.05em] md:text-7xl">Выберите проводника</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {(['duck', 'turtle'] as const).map((value) => <button key={value} onClick={() => setPath(value)} className={`rounded-[2rem] p-8 text-left text-3xl font-black transition ${path === value ? 'bg-brand' : 'bg-white/10 hover:bg-white/15'}`}>{value === 'duck' ? '🦆 Следовать за уткой' : '🐢 Следовать за черепахой'}</button>)}
          </div>
          <motion.p key={path} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-xl text-white/80">{path === 'duck' ? 'Утка ведет к основной программе и проектной практике.' : 'Черепаха открывает кампус, мероприятия и спокойное знакомство.'}</motion.p>
        </div>
      </section>

      <section id="benefits" className="px-6 py-28">
        <div className="mx-auto max-w-6xl"><h2 className="text-5xl font-black tracking-[-.05em] md:text-8xl">Почему именно мы</h2><div className="mt-12 grid gap-5 md:grid-cols-5">{benefits.map(([title, text, Icon]) => <motion.article key={title as string} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[2rem] border border-black/10 p-6"><Icon className="mb-8 text-school-teal" /><h3 className="text-2xl font-black">{title}</h3><p className="mt-3 text-sm text-zinc-600">{text}</p></motion.article>)}</div></div>
      </section>

      <section id="register" className="px-6 py-28">
        <div className="mx-auto grid max-w-6xl gap-10 rounded-[3rem] bg-brand p-8 text-white md:grid-cols-[1fr_.8fr] md:p-14">
          <div><Sparkles size={40} /><h2 className="mt-8 text-5xl font-black tracking-[-.05em] md:text-7xl">Зарегистрироваться</h2><p className="mt-6 text-xl text-white/85">Оставьте контакты, чтобы начать путь по кампусу РУДН × Школа 21.</p><p className="mt-8 text-sm font-bold">Социальные сети · РУДН · Школа 21</p></div>
          <form onSubmit={submit} className="grid gap-4 rounded-[2rem] bg-white p-6 text-black">
            <input required placeholder="Имя" className="rounded-2xl border border-black/10 px-5 py-4" />
            <input required type="email" placeholder="Email" className="rounded-2xl border border-black/10 px-5 py-4" />
            <button className="rounded-full bg-black px-6 py-4 font-black text-white">Отправить</button>
            {sent && <p className="font-bold text-school-teal">Спасибо! Мы свяжемся с вами.</p>}
          </form>
        </div>
      </section>

      <a href="#hero" aria-label="Наверх" className="fixed bottom-5 right-5 z-40 rounded-full bg-black p-4 text-white shadow-soft transition hover:scale-105"><ArrowUp /></a>
    </main>
  );
}
