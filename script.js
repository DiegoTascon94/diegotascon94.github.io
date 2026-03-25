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
    document.documentElement.lang = currentLang;

    document.querySelectorAll("[data-es]").forEach(el => {
        const newText = el.getAttribute(`data-${currentLang}`);
        if (!newText) return;

        if (el.classList.contains("header-title-sub")) {
            typeWriterEffect(el, newText);
        } else if (newText.includes('<')) {
            el.innerHTML = newText;
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

// =============================================
// DATA WIDGET: Reiniciar animaciones al hacer scroll
// =============================================
const dataWidget = document.querySelector('.data-widget');
if (dataWidget) {
    const widgetObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.chart-bar').forEach(bar => {
                    bar.style.animation = 'none';
                    bar.offsetHeight;
                    bar.style.animation = '';
                });
                widgetObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    widgetObserver.observe(dataWidget);
}

// =============================================
// STATS BAR: Contador animado
// =============================================
const projectCount = document.querySelectorAll('.project-item').length;
const statProjects = document.getElementById('stat-projects');
if (statProjects) statProjects.setAttribute('data-target', projectCount);

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

// =============================================
// PARALLAX EN HERO
// =============================================
const masthead = document.querySelector('.masthead');
if (masthead) {
    let ticking = false;
    const isMobile = () => window.innerWidth <= 768;

    window.addEventListener('scroll', () => {
        if (isMobile()) return;
        if (!ticking) {
            requestAnimationFrame(() => {
                const rate = window.scrollY * 0.4;
                masthead.style.backgroundPositionY = `-${rate}px`;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// =============================================
// PARTÍCULAS EN HERO
// =============================================
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
                onHover: { enable: false }
            }
        },
        detectRetina: false
    });
}

// =============================================
// FILTRO DE PROYECTOS (soporta multi-categoría)
// =============================================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        document.querySelectorAll('.project-item').forEach(item => {
            const categories = item.getAttribute('data-category').split(' ');
            if (filter === 'all' || categories.includes(filter)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// =============================================
// TABS (habilidades, formación, featured)
// =============================================
function initTabs(tabSelector, contentSelector) {
    document.querySelectorAll(tabSelector).forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll(tabSelector).forEach(t => t.classList.remove('active'));
            document.querySelectorAll(contentSelector).forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('tab-' + tab.getAttribute('data-tab')).classList.add('active');
            if (typeof AOS !== "undefined") AOS.refresh();
        });
    });
}

initTabs('.skills-tab', '.tab-content');
initTabs('.formation-tab', '.formation-content');
initTabs('.featured-tab', '.featured-content');

// =============================================
// CARRUSEL CON SWIPE TÁCTIL
// =============================================
document.querySelectorAll('.dashboard-carousel').forEach(carousel => {
    const track = carousel.querySelector('.dashboard-carousel-track');
    const slides = carousel.querySelectorAll('.dashboard-carousel-slide');
    const dots = carousel.querySelectorAll('.dashboard-carousel-dot');
    let current = 0;
    let startX = 0;
    let isDragging = false;

    function goTo(index) {
        current = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach(d => d.classList.remove('active'));
        if (dots[current]) dots[current].classList.add('active');
    }

    carousel.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    carousel.addEventListener('touchend', e => {
        if (!isDragging) return;
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
        isDragging = false;
    });

    dots.forEach((dot, i) => dot.addEventListener('click', () => {
        goTo(i);
        resetAutoplay();
    }));
    goTo(0);

    // Auto-play si el carrusel tiene data-autoplay
    const delay = parseInt(carousel.getAttribute('data-autoplay'));
    let timer = null;

    function startAutoplay() {
        if (!delay) return;
        timer = setInterval(() => goTo(current + 1), delay);
    }

    function resetAutoplay() {
        if (!delay) return;
        clearInterval(timer);
        startAutoplay();
    }

    if (delay) {
        startAutoplay();
        carousel.addEventListener('mouseenter', () => clearInterval(timer));
        carousel.addEventListener('mouseleave', startAutoplay);
        carousel.addEventListener('touchend', resetAutoplay, { passive: true });
    }
});

// =============================================
// EVENTOS DE SCROLL
// =============================================
window.addEventListener("scroll", updateActiveNavLink);