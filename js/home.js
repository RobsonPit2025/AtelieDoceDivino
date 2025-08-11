

// ========== SLIDER ==========
let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll(".slides img");
    slides.forEach(slide => (slide.style.display = "none"));

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Troca a cada 3 segundos
}

document.addEventListener("DOMContentLoaded", () => {
    showSlides();
});

// ========== MENU ATIVO ==========
const menuLinks = document.querySelectorAll(".menu-categorias a");

menuLinks.forEach(link => {
    link.addEventListener("click", function () {
        menuLinks.forEach(l => l.classList.remove("ativo"));
        this.classList.add("ativo");
    });
});