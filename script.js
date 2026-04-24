const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleText = document.querySelector(".theme-toggle-text");
const themeToggleIcon = document.querySelector(".theme-toggle-icon");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const darkThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

const updateThemeUi = (theme) => {
  const isDark = theme === "dark";

  body.setAttribute("data-theme", theme);

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme"
    );
  }

  if (themeToggleText) {
    themeToggleText.textContent = isDark ? "Light" : "Dark";
  }

  if (themeToggleIcon) {
    themeToggleIcon.textContent = isDark ? "☀️" : "🌙";
  }

  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", isDark ? "#09131c" : "#0f5c86");
  }
};

const savedTheme = window.localStorage.getItem("theme");
const preferredTheme = savedTheme || (darkThemeQuery.matches ? "dark" : "light");

updateThemeUi(preferredTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    window.localStorage.setItem("theme", nextTheme);
    updateThemeUi(nextTheme);
  });
}

darkThemeQuery.addEventListener("change", (event) => {
  const storedTheme = window.localStorage.getItem("theme");
  if (!storedTheme) {
    updateThemeUi(event.matches ? "dark" : "light");
  }
});

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const contactForm = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");

if (contactForm && formNote) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactForm.reset();
    formNote.textContent = "Thanks. Your inquiry has been noted. For urgent orders, please call or WhatsApp the shop directly.";
    formNote.classList.add("success");
  });
}
