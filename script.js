/* ============ МНИ МЕНЯ ============
   Цены, мастера и вопросы правятся здесь.
   price: null → на сайте «цена при записи». */

const SERVICES = [
  { name: 'Релакс-массаж', price: null, time: '60 / 90 мин', img: 'img/svc-relax.jpg',
    text: 'Медленно, тепло, в полумраке. Если уснёте — значит, всё работает. Лёгкость чувствуется уже после первого сеанса.' },
  { name: 'Классический массаж', price: null, time: '60 / 90 мин', img: 'img/svc-classic.jpg',
    text: 'Спина после офиса, шея после телефона, плечи после всего. Мастер находит зажимы и аккуратно их разбирает.' },
  { name: 'Head Spa', price: '140 BYN', time: '70 мин', img: 'img/svc-headspa.jpg',
    text: 'Китайский массаж головы и тёплая вода. Двенадцать ступеней расслабления — подробнее ниже.' },
  { name: 'Коррекция фигуры', price: null, time: 'курс 5–7 сеансов', img: 'img/svc-body.jpg',
    text: 'Корректирующий массаж работает курсом: результат заметен после 5–7 процедур. По абонементу — до 15% выгоднее.' },
  { name: 'Спа-программы', price: null, time: 'от 90 мин', img: 'img/svc-spa.jpg',
    text: 'Ритуал на полтора часа для тех, кому одного массажа мало.' },
  { name: 'Косметолог', price: null, time: 'на Петровщине', img: 'img/svc-face.jpg',
    text: 'Теперь заботимся и о лице: чистки, уходы, пилинги, карбокситерапия и консультации.' },
  { name: 'После тренировок', price: null, time: '60 мин', img: 'img/svc-sport.jpg',
    text: 'Когда после новой программы или перелётов болит всё. Восстанавливаем мышцы, чтобы снова в зал.' },
];

const TEAM = [
  { name: 'Имя мастера', role: 'массаж · Head Spa', img: 'img/master-1.jpg' },
  { name: 'Имя мастера', role: 'коррекция фигуры', img: 'img/master-2.jpg' },
  { name: 'Имя мастера', role: 'релакс · спа', img: 'img/master-3.jpg' },
  { name: 'Имя мастера', role: 'классический массаж', img: 'img/master-4.jpg' },
];

const FAQ = [
  ['Сколько нужно сеансов?', 'От расслабляющего массажа лёгкость будет уже после первой процедуры. От корректирующего мгновенного результата ждать не стоит: обычно изменения заметны после 5–7 процедур.'],
  ['Нормально, если я усну?', 'Да. На релакс-массаже засыпают многие — значит, тело наконец расслабилось.'],
  ['Если массажист — мужчина?', 'Массажист — медицинская или спортивная специальность, а не гендерная история. Если вам комфортнее с мастером-девушкой, просто скажите при записи.'],
  ['Час или полтора?', 'Для первого раза хватит часа. Если хочется выключиться полностью — берите полтора.'],
  ['Можно подарить Head Spa?', 'Да, сертификат оформляется на процедуру или на сумму. Напишите нам в Direct.'],
  ['Как получить скидку 20%?', 'Она действует на первый визит в новую студию на пр. Газеты Правда, 20. Скажите о ней при записи.'],
];

/* ---------- отрисовка ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

$('#svc-list').innerHTML = SERVICES.map((s, i) => `
  <li class="svc__item reveal" data-i="${i}">
    <div class="svc__head">
      <h3 class="svc__name">${s.name}</h3>
      <p class="svc__price"><b>${s.price || 'цена при записи'}</b>${s.time}</p>
    </div>
    <p class="svc__text">${s.text}</p>
    <figure class="svc__thumb curtain"><img src="${s.img}" alt="${s.name}" loading="lazy"></figure>
  </li>`).join('');

$('.services__media').innerHTML = SERVICES.map((s, i) =>
  `<img src="${s.img}" alt="" ${i ? 'loading="lazy"' : ''} class="${i ? '' : 'is-active'}">`).join('');

$('#team-list').innerHTML = TEAM.map(m => `
  <article class="master">
    <figure class="curtain"><img src="${m.img}" alt="${m.name}" loading="lazy"></figure>
    <h3 class="reveal">${m.name}</h3>
    <p class="reveal">${m.role}</p>
  </article>`).join('');

$('#faq-list').innerHTML = FAQ.map(([q, a]) =>
  `<details class="reveal"><summary>${q}</summary><p>${a}</p></details>`).join('');

$('#year').textContent = new Date().getFullYear();

/* ---------- появление: текст, линии, «шторы» на фото ---------- */
const io = new IntersectionObserver(entries => {
  for (const en of entries) {
    if (!en.isIntersecting) continue;
    en.target.classList.add('is-in');
    io.unobserve(en.target);
  }
}, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });

$$('.reveal, .curtain, .visit__steps li').forEach(el => {
  const group = [...el.parentElement.children].filter(c => c.matches('.reveal, .visit__steps li'));
  const k = Math.max(group.indexOf(el), 0);
  el.style.setProperty('--d', `${Math.min(k, 5) * 0.09}s`);
  io.observe(el);
});

/* ---------- услуги: активный пункт меняет фото ---------- */
const svcImgs = $$('.services__media img');
const setActive = i => {
  $$('.svc__item').forEach(li => li.classList.toggle('is-active', +li.dataset.i === i));
  svcImgs.forEach((img, k) => img.classList.toggle('is-active', k === i));
};
$$('.svc__item').forEach(li => li.addEventListener('mouseenter', () => setActive(+li.dataset.i)));
// при прокрутке активным становится пункт в середине экрана
const svcIo = new IntersectionObserver(entries => {
  entries.forEach(en => en.isIntersecting && setActive(+en.target.dataset.i));
}, { rootMargin: '-45% 0px -45% 0px' });
$$('.svc__item').forEach(li => svcIo.observe(li));
setActive(0);

/* ---------- прокрутка: шапка, линия, шаги Head Spa, параллакс ---------- */
const header = $('.header');
const mcta = $('.mobile-cta');
const squiggle = $('.squiggle');
const flow = $('#flow');
const flowItems = $$('#flow li');
const parallax = $$('[data-parallax]');
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
let lastY = scrollY, ticking = false;

function onFrame() {
  ticking = false;
  const y = scrollY, vh = innerHeight;

  header.classList.toggle('is-solid', y > 20);
  if (!header.classList.contains('menu-open')) header.classList.toggle('is-hidden', y > lastY && y > 400);
  lastY = y;
  mcta.classList.toggle('is-on', y > vh * 0.7);

  if (calm) return;

  // линия во вступлении прорисовывается, пока блок проходит через экран
  const s = squiggle.getBoundingClientRect();
  const sp = Math.min(Math.max((vh - s.top) / (vh + s.height * 0.5), 0), 1);
  squiggle.style.setProperty('--draw', 1 - sp);

  // шаги Head Spa заполняются сверху вниз
  const f = flow.getBoundingClientRect();
  const fp = Math.min(Math.max((vh * 0.6 - f.top) / f.height, 0), 1);
  flow.style.setProperty('--fill', fp);
  flowItems.forEach((li, i) => li.classList.toggle('is-on', fp >= (i + 0.5) / flowItems.length));

  // лёгкий параллакс фото внутри рамок
  parallax.forEach(img => {
    const r = img.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) return;
    const off = (r.top + r.height / 2 - vh / 2) * -parseFloat(img.dataset.parallax);
    img.style.setProperty('--py', `${off.toFixed(1)}px`);
  });
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onFrame); } }, { passive: true });
addEventListener('resize', onFrame);
onFrame();

/* ---------- меню на телефоне ---------- */
const burger = $('.burger');
burger.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  burger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
$$('.nav a').forEach(a => a.addEventListener('click', () => {
  header.classList.remove('menu-open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));
