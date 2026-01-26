/* =========================
   MOBILE MENU TOGGLE
========================= */
// const menuToggle = document.querySelector(".menu-toggle");
// const nav = document.querySelector(".nav");

// menuToggle.addEventListener("click", () => {
//     nav.classList.toggle("active");
// });

// /* Close menu when clicking a link (mobile UX) */
// document.querySelectorAll(".nav a").forEach(link => {
//     link.addEventListener("click", () => {
//         nav.classList.remove("active");
//     });
// });


// 2

// const menuToggle = document.querySelector(".menu-toggle");
// const nav = document.querySelector(".nav");

// menuToggle.addEventListener("click", () => {
//   nav.classList.toggle("active");

//   // Toggle icon ☰ <-> ✕
//   if (nav.classList.contains("active")) {
//     menuToggle.textContent = "✕";
//   } else {
//     menuToggle.textContent = "☰";
//   }
// });

//3

// const menuToggle = document.querySelector(".menu-toggle");
// const nav = document.querySelector(".nav");

// menuToggle.addEventListener("click", () => {
//   nav.classList.toggle("active");

//   if (nav.classList.contains("active")) {
//     menuToggle.textContent = "✕";
//     document.body.classList.add("no-scroll"); // stop scroll
//   } else {
//     menuToggle.textContent = "☰";
//     document.body.classList.remove("no-scroll"); // resume scroll
//   }
// });

// /* Close menu when clicking a nav link */
// document.querySelectorAll(".nav a").forEach(link => {
//   link.addEventListener("click", () => {
//     nav.classList.remove("active");
//     menuToggle.textContent = "☰";
//     document.body.classList.remove("no-scroll");
//   });
// });

//4

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

/* Toggle menu */
menuToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent document click
  toggleMenu();
});

/* Close menu when clicking outside */
document.addEventListener("click", () => {
  if (nav.classList.contains("active")) {
    closeMenu();
  }
});

/* Prevent nav clicks from closing */
nav.addEventListener("click", (e) => {
  e.stopPropagation();
});

/* Close menu on nav link click */
document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

/* FUNCTIONS */
function toggleMenu() {
  if (nav.classList.contains("active")) {
    closeMenu();
  } else {
    openMenu();
  }
}

function openMenu() {
  nav.classList.add("active");
  menuToggle.textContent = "✕";
  document.body.classList.add("no-scroll");
}

function closeMenu() {
  nav.classList.remove("active");
  menuToggle.textContent = "☰";
  document.body.classList.remove("no-scroll");
}


/* =========================
   STICKY HEADER EFFECT
========================= */
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
    } else {
        header.style.boxShadow = "none";
    }
});


/* =========================
   SCROLL REVEAL ANIMATION
========================= */
const revealElements = document.querySelectorAll(
    ".hero-content, .service-card, .why-box, .intro p"
);

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 80) {
            el.classList.add("reveal");
        }
    });
};

// Close menu when clicking outside (overlay)
document.addEventListener("click", (e) => {
  if (
    nav.classList.contains("active") &&
    !nav.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    nav.classList.remove("active");
  }
});



window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
