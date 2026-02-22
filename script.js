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

// =============================================
// EVENTOS DE SCROLL
// =============================================
window.addEventListener("scroll", () => {
    updateActiveNavLink();
});