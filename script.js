// Анимация появления элементов
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.18 },
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => revealObserver.observe(element));

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    const target = href && href !== "#" ? document.querySelector(href) : null;
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Модальное окно
const modal = document.querySelector("#modal");
const modalText = modal?.querySelector("p");
const closeModal = () => modal?.classList.remove("open");

document.querySelectorAll("[data-popup]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!modal || !modalText) return;
    modalText.textContent = button.dataset.popup || "";
    modal.classList.add("open");
  });
});

modal?.addEventListener("click", (event) => {
  if (event.target === modal || event.target.classList.contains("modal-close"))
    closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

// Форма заявки
const form = document.querySelector("#applicationForm");
const formStatus = document.querySelector("#formStatus");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  localStorage.setItem("school21-application", JSON.stringify(data));
  form.reset();
  if (formStatus)
    formStatus.textContent =
      "Анкета сохранена. Для реальной отправки подключите обработчик формы.";
});

if (localStorage.getItem("school21-application") && formStatus) {
  formStatus.textContent = "У вас есть сохранённая заявка";
}

function buildRiverNetwork({
  svg,
  source,
  targets,
  trunkLength = 0.35,
  segments = 60,
  className = "river-purple",
}) {
  const svgElement =
    typeof svg === "string" ? document.querySelector(svg) : svg;

  const sourceEl = document.querySelector(source);

  const targetEls = targets.map((selector) => document.querySelector(selector));

  const svgRect = svgElement.getBoundingClientRect();

  function center(el) {
    const r = el.getBoundingClientRect();

    return {
      x: r.left + r.width / 2 - svgRect.left,
      y: r.top + r.height / 2 - svgRect.top,
    };
  }

  const start = center(sourceEl);

  const targetPoints = targetEls.map(center);

  //------------------------------------------
  // вычисляем точку разделения
  //------------------------------------------

  const avg = targetPoints.reduce((a, b) => ({
    x: a.x + b.x,
    y: a.y + b.y,
  }));

  avg.x /= targetPoints.length;
  avg.y /= targetPoints.length;

  const junction = {
    x: start.x + (avg.x - start.x) * trunkLength,
    y: start.y + (avg.y - start.y) * trunkLength,
  };

  //------------------------------------------
  // рисуем
  //------------------------------------------

  drawRiver(start, junction, className);

  targetPoints.forEach((target, i) => {
    drawRiver(junction, target, className);
  });

  //------------------------------------------

  function drawRiver(a, b, cls) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    path.classList.add("river-path", cls, "river-generated");

    path.setAttribute("d", createRiver(a, b));

    svgElement.prepend(path);
    const highlight = document.createElementNS("http://www.w3.org/2000/svg", "path");
    highlight.classList.add("river-highlight", "river-generated");
    highlight.setAttribute("d", path.getAttribute("d"));
    svgElement.appendChild(highlight);


    
    const effects = document.getElementById("effects");

    const length = path.getTotalLength();

    function point(distance) {
      if (!path.parentNode) {
        return null;
      }
      return path.getPointAtLength(distance);
    }

    function ripple() {
      const d = Math.random() * length;

      const p = point(d);

      if (p === null) {
        return;
      }

      const c = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );

      c.setAttribute("cx", p.x);
      c.setAttribute("cy", p.y);
      c.setAttribute("r", 2);

      c.setAttribute("class", "ripple");

      effects.appendChild(c);

      c.animate(
        [
          {
            r: 2,
            opacity: 0.4,
          },

          {
            r: 22,
            opacity: 0,
          },
        ],
        {
          duration: 2200,
          easing: "ease-out",
        },
      );

      setTimeout(() => c.remove(), 2300);
    }

    function sparkle() {
      const e = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "ellipse",
      );

      e.setAttribute("rx", 8);
      e.setAttribute("ry", 2);

      e.setAttribute("class", "sparkle");

      effects.appendChild(e);

      const duration = 9000;

      const start = performance.now();

      function frame(now) {
        const t = (now - start) / duration;

        if (t >= 1) {
          e.remove();

          return;
        }

        const pos = point(length * t);

        if (pos === null) {
          return;
        }

        e.setAttribute("cx", pos.x);

        e.setAttribute("cy", pos.y);

        e.setAttribute("opacity", Math.sin(t * Math.PI));

        requestAnimationFrame(frame);
      }

      requestAnimationFrame(frame);
    }

    function bubble() {
      const d = Math.random() * length;

      const p = point(d);

      if (p === null) {
        return;
      }

      const c = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );

      const r = 2 + Math.random() * 4;

      c.setAttribute("cx", p.x);

      c.setAttribute("cy", p.y);

      c.setAttribute("r", r);

      c.setAttribute("class", "bubble");

      effects.appendChild(c);

      c.animate(
        [
          {
            transform: "translateY(0px)",
            opacity: 0.45,
          },

          {
            transform: "translateY(-25px)",
            opacity: 0,
          },
        ],
        {
        duration: 5200,
        },
      );

       setTimeout(() => c.remove(), 5200);
    }

   setInterval(ripple, 1600);
    setInterval(sparkle, 1800);
    setInterval(bubble, 1900);
  }

  //------------------------------------------

  function createRiver(start, end) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;

    const len = Math.hypot(dx, dy);

    const nx = -dy / len;
    const ny = dx / len;

    const pts = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;

      //---------------------------------
      // большая волна
      //---------------------------------

      const big = Math.sin(t * Math.PI * 1.5) * 60;

      //---------------------------------
      // средняя
      //---------------------------------

      const medium = Math.sin(t * 7) * 20;

      //---------------------------------
      // мелкая
      //---------------------------------

      const small = Math.sin(t * 23) * 6;

      //---------------------------------

      const amplitude = Math.sin(t * Math.PI) * (big + medium + small);

      pts.push({
        x: start.x + dx * t + nx * amplitude,

        y: start.y + dy * t + ny * amplitude,
      });
    }

    return catmullRom(pts);
  }

  //------------------------------------------

  function catmullRom(points) {
    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];

      const p1 = points[i];

      const p2 = points[i + 1];

      const p3 = points[Math.min(points.length - 1, i + 2)];

      const cp1x = p1.x + (p2.x - p0.x) / 6;

      const cp1y = p1.y + (p2.y - p0.y) / 6;

      const cp2x = p2.x - (p3.x - p1.x) / 6;

      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return d;
  }
}

const renderRivers = () => {
  document.querySelectorAll(".river-generated").forEach((e) => e.remove());
  const effects = document.getElementById("effects");
  effects.innerHTML = "";

  buildRiverNetwork({
    className: "river-purple",
    svg: ".rivers-overlay",
    source: ".pond-reeds-right",
    targets: [".register-lake"],
  });

  buildRiverNetwork({
    className: "river-teal",
    svg: ".rivers-overlay",
    source: ".pond-turtle-three",
    targets: [".tracks-flag-left"],
  });

  buildRiverNetwork({
    className: "river-teal",
    svg: ".rivers-overlay",
    source: ".tracks-flag-left",
    targets: [".tracks-duck"],
  });

  buildRiverNetwork({
    className: "river-teal",
    svg: ".rivers-overlay",
    source: ".tracks-duck",
    targets: [".register-lake"],
  });
};

renderRivers();
window.addEventListener("resize", renderRivers);

// ============================================================
// КОНТАКТЫ — ПЕРЕКЛЮЧЕНИЕ КАРТА / ФОТО (МГНОВЕННОЕ)
// ============================================================

(function () {
  // Функция переключения (доступна сразу)
  function showTab(tabName) {
    var mapContainer = document.getElementById("map-container");
    var photosContainer = document.getElementById("photos-container");
    var tabBtns = document.querySelectorAll(".tab-btn");

    // Если элементов нет — выходим
    if (!mapContainer || !photosContainer) {
      return;
    }

    // Скрываем оба
    mapContainer.style.display = "none";
    photosContainer.style.display = "none";
    mapContainer.classList.remove("active");
    photosContainer.classList.remove("active");

    // Убираем активный класс у кнопок
    tabBtns.forEach(function (btn) {
      btn.classList.remove("active");
    });

    // Показываем нужный
    if (tabName === "map") {
      mapContainer.style.display = "block";
      mapContainer.classList.add("active");
      tabBtns.forEach(function (btn) {
        if (btn.getAttribute("data-tab") === "map") {
          btn.classList.add("active");
        }
      });
    } else if (tabName === "photos") {
      photosContainer.style.display = "block";
      photosContainer.classList.add("active");
      tabBtns.forEach(function (btn) {
        if (btn.getAttribute("data-tab") === "photos") {
          btn.classList.add("active");
        }
      });
    }
  }

  // ============================================================
  // 1. ПРЯМОЙ СПОСОБ: вешаем обработчики сразу (без ожидания)
  // ============================================================

  // Находим кнопки
  var tabBtns = document.querySelectorAll(".tab-btn");

  // Вешаем обработчики на каждую кнопку (сразу, если они уже есть)
  if (tabBtns.length) {
    tabBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var tab = this.getAttribute("data-tab");
        showTab(tab);
      });
    });
    // Показываем карту по умолчанию
    showTab("map");
  } else {
    // Если кнопок ещё нет на странице, используем MutationObserver
    // или просто ждём их появления через небольшую задержку
    var checkInterval = setInterval(function () {
      var btns = document.querySelectorAll(".tab-btn");
      if (btns.length) {
        clearInterval(checkInterval);
        btns.forEach(function (btn) {
          btn.addEventListener("click", function () {
            var tab = this.getAttribute("data-tab");
            showTab(tab);
          });
        });
        showTab("map");
      }
    }, 50);
  }

  // ============================================================
  // 2. ЗАПАСНОЙ СПОСОБ: обработчик на весь документ (делегирование)
  //    Работает даже для динамически добавленных кнопок
  // ============================================================

  document.addEventListener("click", function (event) {
    var target = event.target.closest(".tab-btn");
    if (target) {
      // Если у кнопки уже есть свой обработчик — не мешаем
      // Но если нет — переключаем через делегирование
      var tab = target.getAttribute("data-tab");
      // Проверяем, есть ли уже активный класс у этой кнопки
      // Если нет — значит обработчик не сработал, переключаем сами
      if (!target.classList.contains("active")) {
        showTab(tab);
      }
    }
  });
})();

// ============================================================
// ГАЛЕРЕЯ — ПЕРЕКЛЮЧЕНИЕ ФОТО (МГНОВЕННОЕ)
// ============================================================

(function () {
  // Функция для работы с галереей
  function initGallery() {
    var gallery = document.querySelector(".photo-gallery");
    if (!gallery) return;

    // Если уже инициализирована — не повторяем
    if (gallery.dataset.initialized === "true") return;
    gallery.dataset.initialized = "true";

    var images = gallery.querySelectorAll(".gallery-image");
    var prevBtn = gallery.querySelector(".gallery-nav.prev");
    var nextBtn = gallery.querySelector(".gallery-nav.next");
    var dotsContainer = gallery.querySelector(".gallery-dots");
    var currentIndex = 0;

    if (!images.length) return;

    // --- Создаём точки ---
    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      for (var i = 0; i < images.length; i++) {
        var dot = document.createElement("span");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener(
          "click",
          (function (index) {
            return function () {
              goToImage(index);
            };
          })(i),
        );
        dotsContainer.appendChild(dot);
      }
    }

    var dots = dotsContainer ? dotsContainer.querySelectorAll("span") : [];

    // --- Функция переключения фото ---
    function goToImage(index) {
      if (index < 0) index = images.length - 1;
      if (index >= images.length) index = 0;

      // Скрываем все фото
      for (var i = 0; i < images.length; i++) {
        images[i].classList.remove("active");
      }
      images[index].classList.add("active");

      // Обновляем точки
      for (var i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
      }
      if (dots[index]) dots[index].classList.add("active");

      currentIndex = index;
    }

    // --- Кнопки навигации ---
    if (prevBtn) {
      prevBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        goToImage(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        goToImage(currentIndex + 1);
      });
    }

    // --- Клик по точкам ---
    dots.forEach(function (dot, index) {
      dot.addEventListener("click", function () {
        goToImage(index);
      });
    });

    // --- Автопрокрутка (если галерея видна) ---
    var autoInterval = setInterval(function () {
      var photosContainer = document.getElementById("photos-container");
      if (photosContainer && photosContainer.style.display !== "none") {
        goToImage(currentIndex + 1);
      }
    }, 4000);

    gallery.addEventListener("mouseenter", function () {
      clearInterval(autoInterval);
    });

    gallery.addEventListener("mouseleave", function () {
      autoInterval = setInterval(function () {
        var photosContainer = document.getElementById("photos-container");
        if (photosContainer && photosContainer.style.display !== "none") {
          goToImage(currentIndex + 1);
        }
      }, 4000);
    });

    // --- Клавиши клавиатуры ---
    document.addEventListener("keydown", function (e) {
      var photosContainer = document.getElementById("photos-container");
      if (photosContainer && photosContainer.style.display !== "none") {
        if (e.key === "ArrowRight") goToImage(currentIndex + 1);
        if (e.key === "ArrowLeft") goToImage(currentIndex - 1);
      }
    });
  }

  // --- Запускаем галерею ---
  // Пробуем инициализировать сразу
  initGallery();

  // Если галерея появится позже (после переключения вкладки) — перехватываем
  var galleryCheckInterval = setInterval(function () {
    var gallery = document.querySelector(".photo-gallery");
    if (gallery && !gallery.dataset.initialized) {
      initGallery();
    }
  }, 200);

  // Также инициализируем при переключении на вкладку "photos"
  // Дополняем существующую функцию showTab
  var originalShowTab = window.showTab || function () {};
  window.showTab = function (tabName) {
    // Вызываем оригинальную функцию (если есть)
    if (typeof originalShowTab === "function") {
      originalShowTab(tabName);
    }
    // Если переключились на фото — инициализируем галерею
    if (tabName === "photos") {
      setTimeout(initGallery, 100);
    }
  };
})();
