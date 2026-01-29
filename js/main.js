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

// Header shrink on scroll
// const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

const slides = document.querySelectorAll(".slides");
let index = 0;

setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 5000); // 5 seconds


const scrollElements = document.querySelectorAll("[data-scroll]");

const scrollReveal = () => {
  const triggerPoint = window.innerHeight - 120;

  scrollElements.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if (top < triggerPoint) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", scrollReveal);
scrollReveal(); // on load

const parallaxSlides = document.querySelectorAll(".slides");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset;

  parallaxSlides.forEach(slide => {
    slide.style.transform =
      `translateY(${scrollTop * 0.25}px) scale(1.08)`;
  });
});

const pageHeroImages = document.querySelectorAll(".hero-bg");
let heroIndex = 0;

if (pageHeroImages.length > 0) {
  setInterval(() => {
    pageHeroImages[heroIndex].classList.remove("active");
    heroIndex = (heroIndex + 1) % pageHeroImages.length;
    pageHeroImages[heroIndex].classList.add("active");
  }, 5000); // 5 seconds
}

// const pageHeroImages = document.querySelectorAll(".hero-bg");

if (pageHeroImages.length > 0) {

  // Mobile detection
  const isMobile = window.innerWidth <= 768;

  // Always show first image immediately
  pageHeroImages[0].classList.add("active");

  if (!isMobile) {
    let heroIndex = 0;

    setInterval(() => {
      pageHeroImages[heroIndex].classList.remove("active");
      heroIndex = (heroIndex + 1) % pageHeroImages.length;
      pageHeroImages[heroIndex].classList.add("active");
    }, 5000);
  }
}


/* =========================
   FLOATING CONTACT – IDLE LOGIC (FINAL)
========================= */

document.addEventListener("DOMContentLoaded", () => {

  const floatingContact = document.querySelector(".floating-contact");
  if (!floatingContact) return;

  let idleTimer = null;
  const IDLE_TIME = 5500; // 5.5 seconds

  function showIcons() {
    floatingContact.style.opacity = "1";
    floatingContact.style.pointerEvents = "auto";
    floatingContact.style.transform = "translateY(0)";
    resetIdleTimer();
  }

  function hideIcons() {
    floatingContact.style.opacity = "0";
    floatingContact.style.pointerEvents = "none";
    floatingContact.style.transform = "translateY(20px)";
  }

  function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      hideIcons();
    }, IDLE_TIME);
  }

  /* Show once page loads */
  showIcons();

  /* User activity resets timer */
  ["click", "scroll", "touchstart"].forEach(event => {
    window.addEventListener(event, () => {
      showIcons();
    }, { passive: true });
  });

});



window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// MARK: NEW 5

// /* =========================
//    MOBILE MENU TOGGLE
// ========================= */

// const menuToggle = document.querySelector(".menu-toggle");
// const nav = document.querySelector(".nav");

// /* Toggle menu */
// menuToggle.addEventListener("click", (e) => {
//   e.stopPropagation(); // prevent document click
//   toggleMenu();
// });

// /* Close menu when clicking outside */
// document.addEventListener("click", () => {
//   if (nav.classList.contains("active")) {
//     closeMenu();
//   }
// });

// /* Prevent nav clicks from closing */
// nav.addEventListener("click", (e) => {
//   e.stopPropagation();
// });

// /* Close menu on nav link click */
// document.querySelectorAll(".nav a").forEach(link => {
//   link.addEventListener("click", () => {
//     closeMenu();
//   });
// });

// /* FUNCTIONS */
// function toggleMenu() {
//   if (nav.classList.contains("active")) {
//     closeMenu();
//   } else {
//     openMenu();
//   }
// }

// function openMenu() {
//   nav.classList.add("active");
//   menuToggle.classList.add("active"); // 🔥 X icon
//   document.body.classList.add("no-scroll");
// }

// function closeMenu() {
//   nav.classList.remove("active");
//   menuToggle.classList.remove("active"); // 🔥 Hamburger icon
//   document.body.classList.remove("no-scroll");
// }


// /* =========================
//    STICKY HEADER EFFECT
// ========================= */
// const header = document.querySelector(".header");

// window.addEventListener("scroll", () => {
//   if (window.scrollY > 60) {
//     header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
//   } else {
//     header.style.boxShadow = "none";
//   }
// });


// /* =========================
//    SCROLL REVEAL ANIMATION
// ========================= */
// const revealElements = document.querySelectorAll(
//   ".hero-content, .service-card, .why-box, .intro p"
// );

// const revealOnScroll = () => {
//   const windowHeight = window.innerHeight;

//   revealElements.forEach(el => {
//     const elementTop = el.getBoundingClientRect().top;

//     if (elementTop < windowHeight - 80) {
//       el.classList.add("reveal");
//     }
//   });
// };

// window.addEventListener("scroll", revealOnScroll);
// window.addEventListener("load", revealOnScroll);


// /* =========================
//    HEADER SHRINK
// ========================= */
// window.addEventListener("scroll", () => {
//   if (window.scrollY > 50) {
//     header.classList.add("scrolled");
//   } else {
//     header.classList.remove("scrolled");
//   }
// });


// /* =========================
//    SLIDER
// ========================= */
// const slides = document.querySelectorAll(".slides");
// let index = 0;

// setInterval(() => {
//   slides[index].classList.remove("active");
//   index = (index + 1) % slides.length;
//   slides[index].classList.add("active");
// }, 5000);


// /* =========================
//    SCROLL REVEAL (DATA ATTR)
// ========================= */
// const scrollElements = document.querySelectorAll("[data-scroll]");

// const scrollReveal = () => {
//   const triggerPoint = window.innerHeight - 120;

//   scrollElements.forEach(el => {
//     const top = el.getBoundingClientRect().top;

//     if (top < triggerPoint) {
//       el.classList.add("active");
//     }
//   });
// };

// window.addEventListener("scroll", scrollReveal);
// scrollReveal();


// /* =========================
//    PARALLAX
// ========================= */
// const parallaxSlides = document.querySelectorAll(".slides");

// window.addEventListener("scroll", () => {
//   const scrollTop = window.pageYOffset;

//   parallaxSlides.forEach(slide => {
//     slide.style.transform =
//       `translateY(${scrollTop * 0.25}px) scale(1.08)`;
//   });
// });


// /* =========================
//    HERO BACKGROUND SLIDER
// ========================= */
// const pageHeroImages = document.querySelectorAll(".hero-bg");

// if (pageHeroImages.length > 0) {
//   const isMobile = window.innerWidth <= 768;

//   pageHeroImages[0].classList.add("active");

//   if (!isMobile) {
//     let heroIndex = 0;

//     setInterval(() => {
//       pageHeroImages[heroIndex].classList.remove("active");
//       heroIndex = (heroIndex + 1) % pageHeroImages.length;
//       pageHeroImages[heroIndex].classList.add("active");
//     }, 5000);
//   }
// }


// /* =========================
//    FLOATING CONTACT – IDLE LOGIC
// ========================= */
// document.addEventListener("DOMContentLoaded", () => {

//   const floatingContact = document.querySelector(".floating-contact");
//   if (!floatingContact) return;

//   let idleTimer = null;
//   const IDLE_TIME = 5500;

//   function showIcons() {
//     floatingContact.style.opacity = "1";
//     floatingContact.style.pointerEvents = "auto";
//     floatingContact.style.transform = "translateY(0)";
//     resetIdleTimer();
//   }

//   function hideIcons() {
//     floatingContact.style.opacity = "0";
//     floatingContact.style.pointerEvents = "none";
//     floatingContact.style.transform = "translateY(20px)";
//   }

//   function resetIdleTimer() {
//     clearTimeout(idleTimer);
//     idleTimer = setTimeout(hideIcons, IDLE_TIME);
//   }

//   showIcons();

//   ["click", "scroll", "touchstart"].forEach(event => {
//     window.addEventListener(event, showIcons, { passive: true });
//   });

// });
