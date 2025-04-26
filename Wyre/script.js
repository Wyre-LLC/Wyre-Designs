const slider = document.querySelector(".slider");
const planGraphic = document.querySelector(".plan-graphic");
const totalSlides = document.querySelectorAll(".slider-item").length;
let index = 0;
let totalPrice = 0;

function opennav() {
    document.querySelector(".items-nav").classList.toggle("active");
    document.querySelector(".hamburger").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector("nav");
    const elements = document.querySelectorAll('.fade-slide');
    const navLinks = document.querySelectorAll(".items-nav a");
    const sections = [
        document.getElementById("our-work"),
        document.getElementById("plans"),
        document.getElementById("services")
    ];

    function handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 75) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        let activeFound = false;

        sections.forEach((section) => {
            if (!section) return;
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (currentScrollY >= sectionTop && currentScrollY < sectionTop + sectionHeight) {
                activeFound = true;
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });

        if (!activeFound) {
            navLinks.forEach(link => link.classList.remove("active"));
        }
    }

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
});


window.addEventListener("load", () => {

    setTimeout(() => {
        document.body.classList.add("loaded");
      }, 175);
      
    document.querySelectorAll('.fade-slide').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('visible');
        }
    });
});

function changeContent(index, element) {
    let items = document.querySelectorAll('.plan-item-button');
    let containers = document.querySelectorAll('.detailed-plan-container');

    items.forEach(item => item.classList.remove('active'));
    element.classList.add('active');

    containers.forEach(container => container.classList.remove('active'));
    document.getElementById('content-' + index).classList.add('active');
}

function getSlidesPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}

function updateSlide() {
    const slidesPerView = getSlidesPerView();
    slider.style.transform = `translateX(-${index * (100 / slidesPerView)}%)`;
}

function nextSlide() {
    const slidesPerView = getSlidesPerView();
    if (index < totalSlides - slidesPerView) {
        index++;
    } else {
        index = 0;
    }
    updateSlide();
}

function prevSlide() {
    const slidesPerView = getSlidesPerView();
    if (index > 0) {
        index--;
    } else {
        index = totalSlides - slidesPerView;
    }
    updateSlide();
}

function updatePrice() {
    totalPrice = 0;

    const checkboxes = document.querySelectorAll('.plan-checkbox');

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            totalPrice += parseFloat(checkbox.getAttribute('data-price'));
        }
    });

    document.getElementById('price-changer').textContent = 'Estimated Price: $' + totalPrice.toFixed(2);
}

function toggleDropdown(dropdownId, arrowId) {
    const dropdown = document.getElementById(dropdownId);
    const arrow = document.getElementById(arrowId);

    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
        arrow.innerHTML = "&#9660;";
    } else {
        dropdown.style.display = "block";
        arrow.innerHTML = "&#9650;";
    }
}

updatePrice();
