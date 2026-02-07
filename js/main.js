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

// MARK: VERSION 4

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const isMobile = window.innerWidth <= 768;
let splashRunning = true;

let currentPDF = "";
let pdfDoc = null;
let currentPage = 1;
let zoomLevel = 1;


// const isHomePage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";

const isHomePage =
  window.location.pathname.endsWith("/STRUCTIQ/") ||
  window.location.pathname.endsWith("/STRUCTIQ/index.html");


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
// const header = document.querySelector(".header");

// window.addEventListener("scroll", () => {
//     if (window.scrollY > 60) {
//         header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
//     } else {
//         header.style.boxShadow = "none";
//     }
// });
const header = document.querySelector(".header");

if (!isMobile) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
    } else {
      header.style.boxShadow = "none";
    }
  });
}


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

// window.addEventListener('scroll', () => {
//   if (window.scrollY > 50) {
//     header.classList.add('scrolled');
//   } else {
//     header.classList.remove('scrolled');
//   }
// });

// const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
  } else {
    header.style.boxShadow = "none";
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

// window.addEventListener("scroll", () => {
//   const scrollTop = window.pageYOffset;

//   parallaxSlides.forEach(slide => {
//     slide.style.transform =
//       `translateY(${scrollTop * 0.25}px) scale(1.08)`;
//   });
// });

// if (!isMobile) {
//   window.addEventListener("scroll", () => {
//     const scrollTop = window.pageYOffset;

//     parallaxSlides.forEach(slide => {
//       slide.style.transform =
//         `translateY(${scrollTop * 0.25}px) scale(1.08)`;
//     });
//   });
// }

if (!isMobile) {
  window.addEventListener("scroll", () => {

    if (splashRunning) return;   // 🔥 THIS IS THE FIX

    const scrollTop = window.pageYOffset;

    parallaxSlides.forEach(slide => {
      slide.style.transform =
        `translateY(${scrollTop * 0.25}px) scale(1.08)`;
    });
  });
}

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
window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");

  setTimeout(() => {
    loader.remove();
  }, 1200); // animation complete
});

//splash screen

window.addEventListener("load", () => {
  const splash = document.getElementById("splash");

  // ❌ Not homepage OR already shown → remove splash immediately
  if (!isHomePage || sessionStorage.getItem("splashShown")) {
    if (splash) splash.remove();
    splashRunning = false;
    document.body.classList.remove("splash-active");
    document.body.style.overflow = ""; // 🔥 enable scroll
    return;
  }

  // ✅ First time on index page
  sessionStorage.setItem("splashShown", "true");

  document.body.classList.add("splash-active");
  splashRunning = true;

  setTimeout(() => {
    splash.style.opacity = "0";
    splash.style.transition = "opacity 0.6s ease";

    setTimeout(() => {
      splash.remove();
      document.body.classList.remove("splash-active");
      document.body.style.overflow = ""; // 🔥 enable scroll
      splashRunning = false;
    }, 600);
  }, 3000);
});

//pdf samples
function openPDF(file){
    document.getElementById("pdfModal").style.display="block";

    document.getElementById("pdfFrame").src =
    file + "#toolbar=0&navpanes=0&scrollbar=0";
}

// function closePDF(){
//     document.getElementById("pdfModal").style.display="none";
//     document.getElementById("pdfFrame").src="";
// }

// function closePDF(){
//     document.getElementById("pdfModal").style.display="none";
//     document.getElementById("pdfFrame").src="";

//     /* show icons back */
//     const floating = document.querySelector(".floating-contact");
//     if (floating){
//         floating.classList.remove("hide-floating");
//     }
// }

/* Right click disable */
document.addEventListener("contextmenu", function(e){
    e.preventDefault();
});




// function openPDF(file){
//     currentPDF = file;
//     zoomLevel = 1;

//     /* hide icons */
//     const floating = document.querySelector(".floating-contact");
//     if (floating){
//         floating.classList.add("hide-floating");
//     }

//     document.getElementById("pdfModal").style.display="block";

//     const frame = document.getElementById("pdfFrame");
//     frame.src = file + "#toolbar=0&navpanes=0&scrollbar=0";
//     frame.style.transform = "scale(1)";
// }




// function openPDF(file){
//     currentPDF = file;
//     zoomLevel = 1;

//     document.getElementById("pdfModal").style.display="block";

//     const frame = document.getElementById("pdfFrame");
//     frame.src = file + "#toolbar=0&navpanes=0&scrollbar=0";
//     frame.style.transform = "scale(1)";
// }

// function openPDF(file){

//     document.getElementById("pdfModal").style.display="block";

//     // full correct path create
//     const fullURL = window.location.href
//         .replace("sample.html","") + file;

//     document.getElementById("pdfFrame").src =
//         "https://docs.google.com/gview?embedded=1&url=" + fullURL;
// }


// function renderPDF(){

//     const canvas = document.getElementById("pdfCanvas");
//     if(!canvas) return;

//     const ctx = canvas.getContext("2d");

//     pdfjsLib.getDocument(currentPDF).promise.then(function(pdf){

//         pdfDoc = pdf;

//         pdfDoc.getPage(pageNum).then(function(page){

//             const viewport = page.getViewport({ scale: zoomLevel });

//             canvas.height = viewport.height;
//             canvas.width = viewport.width;

//             page.render({
//                 canvasContext: ctx,
//                 viewport: viewport
//             });
//         });
//     });
// }



function zoomIn(){
    zoomLevel += 0.2;
    const canvas = document.getElementById("pdfCanvas");
    if(canvas){
        canvas.style.transform = "scale(" + zoomLevel + ")";
    }
}

function zoomOut(){
    zoomLevel -= 0.2;
    if(zoomLevel < 0.5) zoomLevel = 0.5;
    const canvas = document.getElementById("pdfCanvas");
    if(canvas){
        canvas.style.transform = "scale(" + zoomLevel + ")";
    }
}


function openPDF(file){

    document.getElementById("pdfModal").style.display = "block";

    const url = file;

    pdfjsLib.getDocument(url).promise.then(function(pdf){
        pdfDoc = pdf;
        currentPage = 1;
        renderPage(currentPage);
    });
}

function renderPage(num){

    pdfDoc.getPage(num).then(function(page){

        const viewport = page.getViewport({ scale: zoomLevel });

        const canvas = document.getElementById("pdfCanvas");
        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        page.render({
            canvasContext: ctx,
            viewport: viewport
        });
    });
}

// function zoomIn(){
//     zoomLevel += 0.25;
//     renderPage(currentPage);
// }

// function zoomOut(){
//     zoomLevel = Math.max(0.5, zoomLevel - 0.25);
//     renderPage(currentPage);
// }

function closePDF(){
    document.getElementById("pdfModal").style.display = "none";
}
function applyZoom(){
    // const frame = document.getElementById("pdfFrame");
    frame.style.transform = "scale(" + zoomLevel + ")";
}



window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
