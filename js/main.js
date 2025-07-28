const header = document.querySelector("header");
const toggleButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (toggleButton && navLinks) {
  const overlay = document.createElement("div");
  overlay.classList.add("menu-overlay");
  document.body.appendChild(overlay);

  let lastScrollTop = 0;
  let glowTimeout;

  // Scroll-Verhalten: Header ausblenden / einblenden + Glow
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      header.classList.add("hide");
      header.classList.remove("show-glow");
    } else {
      header.classList.remove("hide");
      header.classList.add("show-glow");

      clearTimeout(glowTimeout);
      glowTimeout = setTimeout(() => {
        header.classList.remove("show-glow");
      }, 600);
    }

    lastScrollTop = Math.max(scrollTop, 0);
  });

  // Menü öffnen / schließen
  toggleButton.addEventListener("click", () => {
    const isOpen = toggleButton.classList.toggle("open");
    navLinks.classList.toggle("active");
    overlay.classList.toggle("active");

    // Glow hinzufügen oder entfernen
    if (isOpen) {
        header.classList.add("header-glow-animated");
    } else {
        header.classList.remove("header-glow-animated");
    }
});


  overlay.addEventListener("click", () => {
    toggleButton.classList.remove("open");
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
  });

  // Menü schließt bei Klick auf Link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      toggleButton.classList.remove("open");
      navLinks.classList.remove("active");
      overlay.classList.remove("active");
    });
  });
}

// Aktiven Menüpunkt automatisch setzen (außerhalb if-block, das geht immer)
const links = document.querySelectorAll(".nav-links a");
const currentPath = window.location.pathname.split("/").pop();

links.forEach((link) => {
  const linkPath = link.getAttribute("href");
  if (linkPath === currentPath) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});
