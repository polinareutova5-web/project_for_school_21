// ============================================================
// ОПТИМИЗИРОВАННЫЙ JS (РЕКИ НЕ ТРОГАЕМ, КНОПКА ФОТО ИСПРАВЛЕНА)
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // 1. АНИМАЦИЯ ПОЯВЛЕНИЯ
    // ============================================================

    const revealObserver = new IntersectionObserver(
        (entries) => {
            requestAnimationFrame(() => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -30px 0px'
        }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
        if (!el.classList.contains('visible')) {
            revealObserver.observe(el);
        }
    });

    // ============================================================
    // 2. ПЛАВНАЯ ПРОКРУТКА
    // ============================================================

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            const href = anchor.getAttribute("href");
            const target = href && href !== "#" ? document.querySelector(href) : null;
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: isTouch ? 'auto' : 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================================
    // 3. МОДАЛЬНОЕ ОКНО
    // ============================================================

    const modal = document.querySelector("#modal");
    const modalText = modal?.querySelector("p");

    if (modal) {
        document.addEventListener("click", (e) => {
            const button = e.target.closest("[data-popup]");
            if (button && modalText) {
                modalText.textContent = button.dataset.popup || "";
                modal.classList.add("open");
                return;
            }
            if (e.target === modal || e.target.closest(".modal-close")) {
                modal.classList.remove("open");
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") modal.classList.remove("open");
        });
    }

    // ============================================================
    // 4. ФОРМА
    // ============================================================

    const form = document.querySelector("#applicationForm");
    const formStatus = document.querySelector("#formStatus");

    if (form) {
        let isSubmitting = false;

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (isSubmitting) return;
            isSubmitting = true;

            if (formStatus) {
                formStatus.textContent = "⏳ Отправка...";
                formStatus.style.color = "#666";
            }

            const serviceID = "service_e5d3pma";
            const templateID = "template_lrag7cr";

            emailjs.sendForm(serviceID, templateID, form)
                .then(() => {
                    if (formStatus) {
                        formStatus.textContent = "✅ Заявка успешно отправлена!";
                        formStatus.style.color = "green";
                    }
                    form.reset();
                    localStorage.removeItem("school21-application");
                })
                .catch((error) => {
                    if (formStatus) {
                        formStatus.textContent = "❌ Ошибка. Попробуйте позже.";
                        formStatus.style.color = "red";
                    }
                    console.error("EmailJS Error:", error);
                })
                .finally(() => {
                    isSubmitting = false;
                });
        });

        if (localStorage.getItem("school21-application") && formStatus) {
            formStatus.textContent = "📌 У вас есть сохранённая заявка";
        }
    }

    // ============================================================
    // 5. ГАМБУРГЕР
    // ============================================================

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav nav');
    const nav = document.querySelector('.nav');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('open');
            hamburger.textContent = isOpen ? '✕' : '☰';
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') && nav && !nav.contains(e.target)) {
                navMenu.classList.remove('open');
                hamburger.textContent = '☰';
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                hamburger.textContent = '☰';
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ============================================================
    // 6. КОНТАКТЫ — ВКЛАДКИ (ИСПРАВЛЕНА КНОПКА "ФОТО")
    // ============================================================

    (function initTabs() {
        var mapContainer = document.getElementById('map-container');
        var photosContainer = document.getElementById('photos-container');
        var tabBtns = document.querySelectorAll('.tab-btn');

        console.log('🔍 Инициализация вкладок');
        console.log('mapContainer:', mapContainer);
        console.log('photosContainer:', photosContainer);
        console.log('Кнопок найдено:', tabBtns.length);

        if (!mapContainer || !photosContainer || !tabBtns.length) {
            console.error('❌ Не все элементы найдены для вкладок!');
            return;
        }

        function showTab(tabName) {
            console.log('📌 Переключение на:', tabName);

            // Скрываем оба
            mapContainer.style.display = 'none';
            photosContainer.style.display = 'none';
            mapContainer.classList.remove('active');
            photosContainer.classList.remove('active');

            // Убираем активный класс у кнопок
            tabBtns.forEach(function(btn) {
                btn.classList.remove('active');
            });

            // Показываем нужный
            if (tabName === 'map') {
                mapContainer.style.display = 'block';
                mapContainer.classList.add('active');
                tabBtns.forEach(function(btn) {
                    if (btn.getAttribute('data-tab') === 'map') {
                        btn.classList.add('active');
                    }
                });
                console.log('✅ Показана КАРТА');
            } else if (tabName === 'photos') {
                photosContainer.style.display = 'block';
                photosContainer.classList.add('active');
                tabBtns.forEach(function(btn) {
                    if (btn.getAttribute('data-tab') === 'photos') {
                        btn.classList.add('active');
                    }
                });
                console.log('✅ Показана ГАЛЕРЕЯ');
                // Инициализируем галерею после показа
                setTimeout(initGallery, 100);
            }
        }

        // Вешаем обработчики на кнопки
        tabBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var tab = this.getAttribute('data-tab');
                console.log('🖱️ Клик по кнопке:', tab);
                showTab(tab);
            });
        });

        // По умолчанию показываем карту
        showTab('map');
    })();

    // ============================================================
    // 7. ГАЛЕРЕЯ
    // ============================================================

    function initGallery() {
        var gallery = document.querySelector('.photo-gallery');
        if (!gallery) {
            console.log('⚠️ Галерея не найдена');
            return;
        }

        if (gallery.dataset.initialized === 'true') {
            console.log('⚠️ Галерея уже инициализирована');
            return;
        }

        console.log('🖼️ Инициализация галереи');
        gallery.dataset.initialized = 'true';

        var images = gallery.querySelectorAll('.gallery-image');
        var prevBtn = gallery.querySelector('.gallery-nav.prev');
        var nextBtn = gallery.querySelector('.gallery-nav.next');
        var dotsContainer = gallery.querySelector('.gallery-dots');
        var currentIndex = 0;

        if (!images.length) {
            console.log('⚠️ Нет изображений в галерее');
            return;
        }

        console.log('📸 Найдено изображений:', images.length);

        // Создаём точки
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (var i = 0; i < images.length; i++) {
                var dot = document.createElement('span');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', (function(index) {
                    return function() {
                        goToImage(index);
                    };
                })(i));
                dotsContainer.appendChild(dot);
            }
        }

        var dots = dotsContainer ? dotsContainer.querySelectorAll('span') : [];

        function goToImage(index) {
            if (index < 0) index = images.length - 1;
            if (index >= images.length) index = 0;

            for (var i = 0; i < images.length; i++) {
                images[i].classList.remove('active');
            }
            images[index].classList.add('active');

            for (var i = 0; i < dots.length; i++) {
                dots[i].classList.remove('active');
            }
            if (dots[index]) dots[index].classList.add('active');

            currentIndex = index;
            console.log('📸 Текущее фото:', currentIndex + 1);
        }

        // Кнопки навигации
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                goToImage(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                goToImage(currentIndex + 1);
            });
        }

        // Клик по точкам
        dots.forEach(function(dot, index) {
            dot.addEventListener('click', function() {
                goToImage(index);
            });
        });

        // Автопрокрутка
        var photosContainer = document.getElementById('photos-container');
        var autoInterval = setInterval(function() {
            if (photosContainer && photosContainer.style.display !== 'none') {
                goToImage(currentIndex + 1);
            }
        }, 4000);

        gallery.addEventListener('mouseenter', function() {
            clearInterval(autoInterval);
        });

        gallery.addEventListener('mouseleave', function() {
            autoInterval = setInterval(function() {
                if (photosContainer && photosContainer.style.display !== 'none') {
                    goToImage(currentIndex + 1);
                }
            }, 4000);
        });

        // Клавиши клавиатуры
        document.addEventListener('keydown', function(e) {
            var photosContainer = document.getElementById('photos-container');
            if (photosContainer && photosContainer.style.display !== 'none') {
                if (e.key === 'ArrowRight') goToImage(currentIndex + 1);
                if (e.key === 'ArrowLeft') goToImage(currentIndex - 1);
            }
        });

        console.log('✅ Галерея инициализирована успешно');
    }

    // === ЗАПУСК ГАЛЕРЕИ ===
    // Пробуем инициализировать сразу
    setTimeout(initGallery, 500);

    // Если галерея появится позже — перехватываем
    var galleryCheckInterval = setInterval(function() {
        var gallery = document.querySelector('.photo-gallery');
        if (gallery && !gallery.dataset.initialized) {
            initGallery();
        }
    }, 300);


    // ============================================================
    // 8. РЕКИ (ПОЛНАЯ ВЕРСИЯ С АНИМАЦИЯМИ — РАБОТАЕТ ВЕЗДЕ)
    // ============================================================

    // ===== ПОЛНАЯ ФУНКЦИЯ РЕК (СО ВСЕМИ АНИМАЦИЯМИ) =====
    function buildRiverNetwork({
                                   svg,
                                   source,
                                   targets,
                                   trunkLength = 0.35,
                                   segments = 60,
                                   className = "river-purple"
                               }) {
        const svgElement = typeof svg === "string" ? document.querySelector(svg) : svg;
        if (!svgElement) {
            console.warn('SVG элемент не найден:', svg);
            return;
        }

        const sourceEl = document.querySelector(source);
        if (!sourceEl) {
            console.warn('Источник не найден:', source);
            return;
        }

        const targetEls = targets
            .map(selector => document.querySelector(selector))
            .filter(el => el !== null);
        if (!targetEls.length) {
            console.warn('Цели не найдены для:', source);
            return;
        }

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

        // Для мобильных уменьшаем сегменты (но анимации остаются)
        const isMobile = window.innerWidth < 768;
        const mobileSegments = isMobile ? 40 : segments;

        // === РИСУЕМ РЕКУ ===
        function drawRiver(a, b, cls) {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.classList.add("river-path", cls, "river-generated");
            path.setAttribute("d", createRiver(a, b, mobileSegments));
            svgElement.prepend(path);

            // === АНИМАЦИИ ===
            const effects = document.getElementById("effects");
            if (!effects) return;

            const length = path.getTotalLength();

            function point(distance) {
                if (!path.parentNode) return null;
                try {
                    return path.getPointAtLength(distance);
                } catch {
                    return null;
                }
            }

            // 1. РЯБЬ
            function ripple() {
                const d = Math.random() * length;
                const p = point(d);
                if (!p) return;

                const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                c.setAttribute("cx", p.x);
                c.setAttribute("cy", p.y);
                c.setAttribute("r", 2);
                c.setAttribute("class", "ripple");
                effects.appendChild(c);

                c.animate(
                    [{ r: 2, opacity: 0.4 }, { r: 22, opacity: 0 }],
                    { duration: 2200, easing: "ease-out" }
                );
                setTimeout(() => c.remove(), 2300);
            }

            // 2. ИСКРЫ
            function sparkle() {
                const d = Math.random() * length;
                const p = point(d);
                if (!p) return;

                const e = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
                e.setAttribute("rx", 8);
                e.setAttribute("ry", 2);
                e.setAttribute("class", "sparkle");
                effects.appendChild(e);

                const duration = 5000 + Math.random() * 4000;
                const startTime = performance.now();

                function frame(now) {
                    const t = (now - startTime) / duration;
                    if (t >= 1) { e.remove(); return; }
                    const pos = point(length * t);
                    if (!pos) return;
                    e.setAttribute("cx", pos.x);
                    e.setAttribute("cy", pos.y);
                    e.setAttribute("opacity", Math.sin(t * Math.PI));
                    requestAnimationFrame(frame);
                }
                requestAnimationFrame(frame);
            }

            // 3. ПУЗЫРЬКИ
            function bubble() {
                const d = Math.random() * length;
                const p = point(d);
                if (!p) return;

                const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                const r = 2 + Math.random() * 4;
                c.setAttribute("cx", p.x);
                c.setAttribute("cy", p.y);
                c.setAttribute("r", r);
                c.setAttribute("class", "bubble");
                effects.appendChild(c);

                c.animate(
                    [{ transform: "translateY(0px)", opacity: 0.45 }, { transform: "translateY(-25px)", opacity: 0 }],
                    { duration: 3000 + Math.random() * 2000 }
                );
                setTimeout(() => c.remove(), 3200 + Math.random() * 2000);
            }

            // Запускаем интервалы
            const rippleInterval = setInterval(ripple, 1600);
            const sparkleInterval = setInterval(sparkle, 1800);
            const bubbleInterval = setInterval(bubble, 1900);

            // Сохраняем интервалы для очистки
            path._intervals = [rippleInterval, sparkleInterval, bubbleInterval];
        }

        // === СОЗДАНИЕ КРИВОЙ ===
        function createRiver(start, end, segs) {
            const dx = end.x - start.x;
            const dy = end.y - start.y;
            const len = Math.hypot(dx, dy);
            const nx = -dy / len;
            const ny = dx / len;
            const pts = [];

            for (let i = 0; i <= segs; i++) {
                const t = i / segs;
                const amplitude = Math.sin(t * Math.PI) * (
                    Math.sin(t * Math.PI * 1.5) * 60 +
                    Math.sin(t * 7) * 20 +
                    Math.sin(t * 23) * 6
                );
                pts.push({
                    x: start.x + dx * t + nx * amplitude,
                    y: start.y + dy * t + ny * amplitude,
                });
            }

            let d = `M ${pts[0].x} ${pts[0].y}`;
            for (let i = 0; i < pts.length - 1; i++) {
                const p0 = pts[Math.max(0, i - 1)];
                const p1 = pts[i];
                const p2 = pts[i + 1];
                const p3 = pts[Math.min(pts.length - 1, i + 2)];
                d += ` C ${p1.x + (p2.x - p0.x) / 6} ${p1.y + (p2.y - p0.y) / 6}, ${p2.x - (p3.x - p1.x) / 6} ${p2.y - (p3.y - p1.y) / 6}, ${p2.x} ${p2.y}`;
            }
            return d;
        }

        drawRiver(start, junction, className);
        targetPoints.forEach((target) => {
            drawRiver(junction, target, className);
        });
    }

    // ===== РЕНДЕР РЕК =====
    function renderRivers() {
        // Очищаем старые реки и интервалы
        document.querySelectorAll(".river-generated").forEach(e => {
            if (e._intervals) {
                e._intervals.forEach(interval => clearInterval(interval));
            }
            e.remove();
        });

        const effects = document.getElementById("effects");
        if (effects) effects.innerHTML = "";

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
    }

    // === ЗАПУСК ===
    renderRivers();

    // Throttle для resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(renderRivers, 300);
    });

    // ============================================================
    // 9. WILL-CHANGE
    // ============================================================

    document.querySelectorAll('.pond-turtle, .hero-rotating-image').forEach(function(el) {
        el.style.willChange = 'transform';
    });

    document.querySelectorAll('.reveal').forEach(function(el) {
        if (!el.classList.contains('visible')) {
            el.style.willChange = 'transform, opacity';
        }
    });

    document.addEventListener('transitionend', function(e) {
        if (e.target.classList && e.target.classList.contains('reveal')) {
            e.target.style.willChange = 'auto';
        }
    }, { passive: true });

})();
