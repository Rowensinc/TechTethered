// TechTethered Static Site - script.js

(function () {
  // Active nav highlight (works with folder/index.html URLs)
document.querySelectorAll('[data-nav]').forEach(link => {
  const linkPath = new URL(link.href).pathname.replace(/\/$/, '');
  const currentPath = window.location.pathname.replace(/\/$/, '');

  if (linkPath === currentPath) {
    link.classList.add('active');
  }
  });

  // Mobile menu toggle
  const burger = document.querySelector("[data-burger]");
  const mobile = document.querySelector("[data-mobile]");
  if (burger && mobile) {
    burger.addEventListener("click", () => {
      mobile.classList.toggle("show");
      burger.setAttribute("aria-expanded", mobile.classList.contains("show") ? "true" : "false");
    });
  }

  // Scroll reveal (IntersectionObserver)
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && items.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  } else {
    // fallback
    items.forEach((el) => el.classList.add("in"));
  }

  // Contact form (local-only mock)
  const form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Honeypot
      const honeypot = form.querySelector('input[name="company_website"]');
      if (honeypot && honeypot.value.trim() !== "") return;

      // Basic validation
      const name = form.querySelector('input[name="name"]')?.value.trim();
      const email = form.querySelector('input[name="email"]')?.value.trim();
      const message = form.querySelector('textarea[name="message"]')?.value.trim();

      if (!name || !email || !message) {
        alert("Fill in Name, Email, and the Description. Don’t overthink it.");
        return;
      }

      // Store locally (so you can confirm it works)
      const payload = Object.fromEntries(new FormData(form).entries());
      const key = "techtethered_inquiries";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.unshift({ ...payload, createdAt: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(existing));

      form.reset();

      const toast = document.querySelector("[data-toast]");
      if (toast) {
        toast.style.display = "block";
        toast.textContent = "Message saved locally (mock). If you want real submissions, connect email/API later.";
        setTimeout(() => toast.style.display = "none", 5500);
      }
    });
  }
})();

