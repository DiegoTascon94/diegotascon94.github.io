// =============================================
// VARIABLES GLOBALES
// =============================================
let currentLang = "es";

// =============================================
// TYPEWRITER EFFECT
// =============================================
function typeWriterEffect(element, text) {
    if (!element) return;
    element.textContent = "";
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 22);
        }
    }
    type();
}

// =============================================
// CAMBIO DE IDIOMA
// =============================================
function toggleLanguage() {
    currentLang = currentLang === "es" ? "en" : "es";

    document.querySelectorAll("[data-es]").forEach(el => {
        const newText = el.getAttribute(`data-${currentLang}`);
        if (!newText) return;

        if (el.classList.contains("header-title-sub")) {
            typeWriterEffect(el, newText);
        } else {
            el.textContent = newText;
        }
    });

    const langBtn = document.getElementById("langBtn");
    if (langBtn) langBtn.textContent = currentLang === "es" ? "EN" : "ES";
}

// =============================================
// NAVBAR: HIGHLIGHT DE SECCIÓN ACTIVA
// =============================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id], header[id]");
    const navLinks = document.querySelectorAll(".nav-link[href^='#']");
    const scrollPos = window.scrollY + 100;

    let currentSection = "";

    sections.forEach(section => {
        if (scrollPos >= section.offsetTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active-section");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active-section");
        }
    });
}

// =============================================
// INICIALIZACIÓN AL CARGAR EL DOM
// =============================================
document.addEventListener("DOMContentLoaded", () => {

    // Inicializar AOS
    if (typeof AOS !== "undefined") {
        AOS.init({ duration: 900, once: true, offset: 80 });
    }

    // Typewriter en el subtítulo del hero
    const subTitle = document.querySelector(".header-title-sub");
    if (subTitle) {
        const initialText = subTitle.getAttribute(`data-${currentLang}`);
        if (initialText) typeWriterEffect(subTitle, initialText);
    }

    // Activar highlight de sección al cargar
    updateActiveNavLink();
});

// DATA WIDGET: Reiniciar animaciones al hacer scroll
const dataWidget = document.querySelector('.data-widget');
if (dataWidget) {
    const widgetObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.chart-bar').forEach(bar => {
                    bar.style.animation = 'none';
                    bar.offsetHeight; // fuerza reflow
                    bar.style.animation = '';
                });
                widgetObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    widgetObserver.observe(dataWidget);
}

// STATS BAR: Contador animado
function animateCounters() {
    const counters = document.querySelectorAll(".stat-number");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const target = parseInt(el.getAttribute("data-target"));
            const duration = 1500;
            const step = target / (duration / 16);
            let current = 0;

            const update = () => {
                current += step;
                if (current < target) {
                    el.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target;
                }
            };
            update();
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

animateCounters();

// PARALLAX en Hero
const masthead = document.querySelector('.masthead');
const mastheadBefore = document.querySelector('.masthead::before');

if (masthead) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.4;
        masthead.style.backgroundPositionY = `-${rate}px`;
    }, { passive: true });
}

// PARTÍCULAS en Hero
if (typeof tsParticles !== "undefined") {
    tsParticles.load("particles-hero", {
        fpsLimit: 30,
        particles: {
            number: {
                value: 30,
                density: { enable: true, area: 800 }
            },
            color: { value: "#2563EB" },
            shape: { type: "circle" },
            opacity: {
                value: 0.25,
                random: true,
                animation: {
                    enable: true,
                    speed: 0.5,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            size: {
                value: { min: 1, max: 2 },
                random: true
            },
            links: {
                enable: true,
                distance: 120,
                color: "#2563EB",
                opacity: 0.1,
                width: 1
            },
            move: {
                enable: true,
                speed: 0.5,
                direction: "none",
                random: true,
                straight: false,
                outModes: "out"
            }
        },
        interactivity: {
            events: {
                onHover: {
                    enable: false
                }
            }
        },
        detectRetina: false
    });
}

// FILTRO DE PROYECTOS
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// TABS DE HABILIDADES
const skillsTabs = document.querySelectorAll('.skills-tab');
const tabContents = document.querySelectorAll('.tab-content');

skillsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        skillsTabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.getAttribute('data-tab')).classList.add('active');
    });
});

// TABS DE FORMACIÓN
const formationTabs = document.querySelectorAll('.formation-tab');
const formationContents = document.querySelectorAll('.formation-content');

formationTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        formationTabs.forEach(t => t.classList.remove('active'));
        formationContents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.getAttribute('data-tab')).classList.add('active');
    });
});

// TABS DE FEATURED PROJECTS
const featuredTabs = document.querySelectorAll('.featured-tab');
const featuredContents = document.querySelectorAll('.featured-content');

featuredTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        featuredTabs.forEach(t => t.classList.remove('active'));
        featuredContents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.getAttribute('data-tab')).classList.add('active');
    });
});

// =============================================
// EVENTOS DE SCROLL
// =============================================
window.addEventListener("scroll", () => {
    updateActiveNavLink();
});