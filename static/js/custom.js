/**
 * Academic Portfolio — custom.js
 * Handles: dark mode toggle, mobile nav, scroll-based active nav
 */

(function () {
  "use strict";

  /* ---- 1. Theme (Dark / Light) -------------------------------- */
  const THEME_KEY = "portfolio-theme";
  const html = document.documentElement;

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  // Apply theme on load (stored > system > config default)
  (function initTheme() {
    const stored = getStoredTheme();
    if (stored) {
      applyTheme(stored);
    } else {
      // Use system preference if no stored preference
      applyTheme(getSystemTheme());
    }
  })();

  // Toggle button
  document.addEventListener("DOMContentLoaded", function () {
    var themeToggleBtn = document.getElementById("themeToggle");
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", function () {
        var current = html.getAttribute("data-theme");
        applyTheme(current === "dark" ? "light" : "dark");
      });
    }

    // Update if OS preference changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", function (e) {
        if (!getStoredTheme()) {
          applyTheme(e.matches ? "dark" : "light");
        }
      });
  });

  /* ---- 2. Mobile Navigation ----------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    var toggleBtn = document.getElementById("navToggle");
    var menu = document.getElementById("navMenu");

    if (!toggleBtn || !menu) return;

    toggleBtn.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when a link is clicked
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggleBtn.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu on outside click
    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target) && !toggleBtn.contains(e.target)) {
        menu.classList.remove("is-open");
        toggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* ---- 3. Scroll-based navbar background ---------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    var navbar = document.getElementById("navbar");
    if (!navbar) return;

    function updateNavbar() {
      if (window.scrollY > 10) {
        navbar.classList.add("navbar--scrolled");
      } else {
        navbar.classList.remove("navbar--scrolled");
      }
    }

    window.addEventListener("scroll", updateNavbar, { passive: true });
    updateNavbar();
  });

  /* ---- 4. Scrollspy (highlight active nav item) --------------- */
  document.addEventListener("DOMContentLoaded", function () {
    // Only run scrollspy on single-page (home) layout
    if (!document.getElementById("about")) return;

    var sections = document.querySelectorAll("section[id]");
    var navLinks = document.querySelectorAll(".navbar__link");

    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            var href = link.getAttribute("href");
            if (href === "/#" + id || href === "#" + id) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        });
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  });

  /* ---- 5. Smooth scroll for anchor links ---------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var href = link.getAttribute("href").replace(/^\//, "");
        if (!href.startsWith("#")) return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update URL without jump
        history.pushState(null, "", href);
      });
    });
  });

  /* ---- 6. Copy code blocks ------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("pre").forEach(function (pre) {
      var btn = document.createElement("button");
      btn.textContent = "Copy";
      btn.className = "code-copy-btn";
      btn.setAttribute("aria-label", "Copy code");
      btn.addEventListener("click", function () {
        var code = pre.querySelector("code");
        var text = code ? code.textContent : pre.textContent;
        navigator.clipboard
          .writeText(text)
          .then(function () {
            btn.textContent = "Copied!";
            setTimeout(function () {
              btn.textContent = "Copy";
            }, 2000);
          })
          .catch(function () {
            btn.textContent = "Failed";
          });
      });
      pre.style.position = "relative";
      pre.appendChild(btn);
    });
  });
})();
