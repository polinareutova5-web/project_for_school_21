// Анимация появления элементов
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// Плавная прокрутка
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


function openModal(text){

    const modal=document.getElementById("modal");

    modal.querySelector("p").innerHTML=text;

    modal.classList.add("open");
}

document.querySelector(".modal-close").onclick=function(){

    document.getElementById("modal").classList.remove("open");

};

document.getElementById("modal").onclick=function(e){

    if(e.target===this){

        this.classList.remove("open");

    }

};

// Модальное окно
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

// Форма заявки
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

function buildRiverNetwork({
    svg,
    source,
    targets,
    trunkLength = 0.35,
    segments = 60,
    className = "river-purple"
}) {

    const svgElement =
        typeof svg === "string"
            ? document.querySelector(svg)
            : svg;

    const sourceEl = document.querySelector(source);

    const targetEls = targets.map(selector =>
        document.querySelector(selector)
    );

    const svgRect = svgElement.getBoundingClientRect();

    function center(el) {

        const r = el.getBoundingClientRect();

        return {
            x: r.left + r.width / 2 - svgRect.left,
            y: r.top + r.height / 2 - svgRect.top
        };

    }

    const start = center(sourceEl);

    const targetPoints = targetEls.map(center);

    //------------------------------------------
    // вычисляем точку разделения
    //------------------------------------------

    const avg = targetPoints.reduce((a, b) => ({
        x: a.x + b.x,
        y: a.y + b.y
    }));

    avg.x /= targetPoints.length;
    avg.y /= targetPoints.length;

    const junction = {
        x: start.x + (avg.x - start.x) * trunkLength,
        y: start.y + (avg.y - start.y) * trunkLength
    };

    //------------------------------------------
    // рисуем
    //------------------------------------------

    drawRiver(start, junction, className);

    targetPoints.forEach((target, i) => {

        drawRiver(
            junction,
            target,
            className
        );

    });

    //------------------------------------------

    function drawRiver(a, b, cls) {

        const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );

        path.classList.add(
            "river-path",
            cls,
            "river-generated"
        );

        path.setAttribute(
            "d",
            createRiver(a, b)
        );

        svgElement.appendChild(path);

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

            const big =
                Math.sin(t * Math.PI * 1.5) * 60;

            //---------------------------------
            // средняя
            //---------------------------------

            const medium =
                Math.sin(t * 7) * 20;

            //---------------------------------
            // мелкая
            //---------------------------------

            const small =
                Math.sin(t * 23) * 6;

            //---------------------------------

            const amplitude =
                Math.sin(t * Math.PI) *
                (big + medium + small);

            pts.push({

                x:
                    start.x +
                    dx * t +
                    nx * amplitude,

                y:
                    start.y +
                    dy * t +
                    ny * amplitude

            });

        }

        return catmullRom(pts);

    }

    //------------------------------------------

    function catmullRom(points) {

        let d =
            `M ${points[0].x} ${points[0].y}`;

        for (let i = 0; i < points.length - 1; i++) {

            const p0 =
                points[Math.max(0, i - 1)];

            const p1 =
                points[i];

            const p2 =
                points[i + 1];

            const p3 =
                points[
                    Math.min(
                        points.length - 1,
                        i + 2
                    )
                ];

            const cp1x =
                p1.x +
                (p2.x - p0.x) / 6;

            const cp1y =
                p1.y +
                (p2.y - p0.y) / 6;

            const cp2x =
                p2.x -
                (p3.x - p1.x) / 6;

            const cp2y =
                p2.y -
                (p3.y - p1.y) / 6;

            d +=
                ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;

        }

        return d;
    }
}

const renderRivers = () => {
   document.querySelectorAll(".river-generated")
        .forEach(e => e.remove());

    buildRiverNetwork({
        className: "river-purple",
        svg: ".rivers-overlay",
        source: ".pond-reeds-right",
        targets: [
            ".register-lake",
        ]
    });

    buildRiverNetwork({
        className: "river-teal",
        svg: ".rivers-overlay",
        source: ".pond-turtle-three",
        targets: [
            ".flag-left",
        ]
    });

    buildRiverNetwork({
        className: "river-teal",
        svg: ".rivers-overlay",
        source: ".flag-left",
        targets: [
            ".duck-flag"
        ]
    });

    buildRiverNetwork({
        className: "river-teal",
        svg: ".rivers-overlay",
        source:  ".duck-flag",
        targets: [
            ".register-lake",
        ]
    });
}

renderRivers();
window.addEventListener("resize", renderRivers);
