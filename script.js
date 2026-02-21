// 1. Configuración inicial
let currentLang = "es";

// 2. Lógica de Typewriter (Máquina de escribir) reutilizable
function typeWriterEffect(element, text) {
    if (!element) return;
    element.textContent = "";
    let i = 0;
    
    // Limpiamos cualquier intervalo previo si fuera necesario
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 20); 
        }
    }
    type();
}

// 3. Función de cambio de idioma
function toggleLanguage() {
    currentLang = currentLang === "es" ? "en" : "es";
    
    document.querySelectorAll("[data-es]").forEach(el => {
        const newText = el.getAttribute(`data-${currentLang}`);
        
        // Si es el subtítulo, aplicamos el efecto visual, si no, texto directo
        if (el.classList.contains('header-title-sub')) {
            typeWriterEffect(el, newText);
        } else {
            el.textContent = newText;
        }
    });

    const langBtn = document.getElementById("langBtn");
    if (langBtn) {
        langBtn.textContent = currentLang === "es" ? "EN" : "ES";
    }
}

// 4. Ejecución al cargar la página
window.onload = () => {
    // Inicializar AOS (Animaciones)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }

    // Iniciar Typewriter inicial en el subtítulo
    const subTitle = document.querySelector('.header-title-sub');
    if (subTitle) {
        const initialText = subTitle.getAttribute(`data-${currentLang}`) || subTitle.textContent;
        typeWriterEffect(subTitle, initialText);
    }
};

// 5. Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70, // Espacio para que la navbar no tape el título
                behavior: 'smooth'
            });
        }
    });
});