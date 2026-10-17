const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

function onScroll() {
  if (!header) return;
  header.classList.toggle("is-stuck", window.scrollY > 8);
}

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.querySelector("span").textContent = open ? "Закрыть" : "Меню";
  });
}

const motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll(".reveal").forEach((node) => {
  if (motion) {
    node.classList.add("is-in");
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );
  observer.observe(node);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    if (!id || id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    nav?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    if (toggle) toggle.querySelector("span").textContent = "Меню";
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
