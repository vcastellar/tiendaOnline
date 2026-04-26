const problems = [
  {
    title: 'Dolor de espalda',
    text: 'Suele venir de sillas sin ajuste lumbar y demasiadas horas sin moverte.',
    cta: 'Ver guía de sillas'
  },
  {
    title: 'Muñeca cargada',
    text: 'El combo ratón plano + mala altura de mesa pasa factura antes de lo que crees.',
    cta: 'Elegir ratón ergonómico'
  },
  {
    title: 'Cuello rígido',
    text: 'Pantalla baja = cervicales enfadadas. Solución: elevar, alinear y descansar.',
    cta: 'Ajustar altura de pantalla'
  },
  {
    title: 'Fatiga visual',
    text: 'Mala iluminación y reflejos: receta clásica para ojos secos y dolor de cabeza.',
    cta: 'Mejorar iluminación'
  },
  {
    title: 'Escritorio caótico',
    text: 'Si hay caos visual, hay fricción mental. Orden = foco.',
    cta: 'Organizar setup'
  },
  {
    title: 'Baja productividad',
    text: 'No siempre falta disciplina: a veces sobran molestias físicas y micro-fricciones.',
    cta: 'Ver rutina anti-dolor'
  }
];

const categories = [
  {
    title: 'Sillas ergonómicas',
    description:
      'Comparativas por presupuesto, guías de ajuste lumbar y recomendaciones para teletrabajo de 6–10 horas.'
  },
  {
    title: 'Ratones y teclados',
    description:
      'Soluciones para muñeca y hombros: ratones verticales, teclados ergonómicos y configuraciones más cómodas.'
  },
  {
    title: 'Iluminación',
    description:
      'Cómo reducir fatiga visual con luz correcta, temperatura de color adecuada y menos reflejos molestos.'
  },
  {
    title: 'Soportes y organización',
    description:
      'Altura correcta de pantalla, brazos de monitor, soportes para portátil y gestión de cables sin dramas.'
  }
];

const articles = [
  ['Mejor silla ergonómica para teletrabajo', 'guia'],
  ['Ratón vertical: cuándo merece la pena', 'informativo'],
  ['Teclado ergonómico: cómo elegir', 'guia'],
  ['Fatiga visual: guía de iluminación', 'informativo'],
  ['Soporte portátil vs brazo monitor', 'comparativa'],
  ['Accesorios para organizar cables', 'informativo'],
  ['Cómo elegir reposapiés ergonómico', 'guia'],
  ['Mejor lámpara de escritorio', 'guia'],
  ['Dolor cervical por portátil', 'informativo'],
  ['Accesorios ergonómicos imprescindibles', 'comparativa'],
  ['Rutina anti-dolor para teletrabajar', 'informativo'],
  ['Qué mirar en una mesa ergonómica', 'guia'],
  ['10 errores que te roban energía', 'informativo'],
  ['Guía de compra de brazo monitor', 'guia'],
  ['Setup ergonómico barato', 'comparativa'],
  ['Escritorio minimalista sin gastar', 'informativo'],
  ['Posturas correctas para trabajar', 'informativo'],
  ['Cómo organizar tu espacio de trabajo', 'informativo']
].map(([title, type], index) => ({
  title,
  type,
  excerpt:
    'Contenido práctico, escaneable y orientado a decisión para que pases de dolor y caos a confort y foco.',
  slug: `articulo-${index + 1}`
}));

function cardTemplate(title, text, kicker = '') {
  return `
    <article class="card">
      ${kicker ? `<p class="kicker">${kicker}</p>` : ''}
      <h3>${title}</h3>
      <p>${text}</p>
      <a class="btn btn-ghost" href="#articulos">Ver precio en Amazon</a>
    </article>
  `;
}

function renderProblems() {
  const grid = document.getElementById('problem-grid');
  grid.innerHTML = problems
    .map((problem) => cardTemplate(problem.title, problem.text, 'Problema real'))
    .join('');
}

function renderCategories() {
  const grid = document.getElementById('category-grid');
  grid.innerHTML = categories
    .map((category) => cardTemplate(category.title, category.description, 'Categoría'))
    .join('');
}

function renderArticles(filter = 'all') {
  const grid = document.getElementById('article-grid');
  const filtered = filter === 'all' ? articles : articles.filter((article) => article.type === filter);

  grid.innerHTML = filtered
    .map(
      (article) => `
      <article class="card">
        <p class="kicker">${article.type}</p>
        <h3>${article.title}</h3>
        <p>${article.excerpt}</p>
        <div class="hero-ctas">
          <a class="btn btn-primary" href="#">Ver precio en Amazon</a>
          <a class="btn btn-ghost" href="#">Leer guía</a>
        </div>
      </article>
    `
    )
    .join('');
}

function setupFilters() {
  const chips = [...document.querySelectorAll('.chip')];
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((node) => node.classList.remove('is-active'));
      chip.classList.add('is-active');
      renderArticles(chip.dataset.filter);
    });
  });
}

function setupMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  toggle.addEventListener('click', () => nav.classList.toggle('is-open'));
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('is-open')));
}

function setupYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

renderProblems();
renderCategories();
renderArticles();
setupFilters();
setupMenu();
setupYear();
