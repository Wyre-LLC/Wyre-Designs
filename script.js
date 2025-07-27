const planGraphic = document.querySelector(".plan-graphic");
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


 function closeBanner() {
    const banner = document.getElementById('summer-banner');
    banner.classList.add('closing');
    setTimeout(() => {
      banner.style.display = 'none';
    }, 400); 
  }

const carousel = document.querySelector(".carousel");
const slides = document.querySelectorAll(".slide");
const controlLinks = document.querySelectorAll(".controls a");

let currentIndex = 0; // starts at first slide
let imageRotation = 0;
let intervalId;

function rotateImages(indexDiff = 1) {
  imageRotation += indexDiff * 90;

  slides.forEach((slide) => {
    const img = slide.querySelector("img");

    img.style.setProperty('--img-rotation', `${imageRotation}deg`);

    if (slide.classList.contains("active")) {
      img.style.transform = `scale(2) rotate(${imageRotation}deg)`;
    } else {
      img.style.transform = `rotate(${imageRotation}deg)`;
    }
  });
}

function setActiveSlide(newIndex) {
  const indexDiff = newIndex - currentIndex;

  currentIndex = newIndex;
  carousel.style.rotate = `-${currentIndex * 90}deg`;

  document.querySelector(".slide.active").classList.remove("active");
  slides[currentIndex].classList.add("active");

  document.querySelector(".controls a.active").classList.remove("active");
  controlLinks[currentIndex].classList.add("active");

  rotateImages(indexDiff);
}

function startInterval() {
  intervalId = setInterval(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    setActiveSlide(nextIndex);
  }, 4000);
}

startInterval();

controlLinks.forEach((control, index) => {
  control.addEventListener("click", () => {
    clearInterval(intervalId);
    setActiveSlide(index);
    startInterval();
  });
});

carousel.addEventListener("mouseenter", () => clearInterval(intervalId));
carousel.addEventListener("mouseleave", () => startInterval());
