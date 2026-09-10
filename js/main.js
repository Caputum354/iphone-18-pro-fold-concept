const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const signupForm = document.querySelector("#signup-form");
const formMessage = document.querySelector(".form-message");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");

function closeMenu() {
  menuToggle?.setAttribute("aria-expanded", "false");
  mobileMenu?.classList.remove("is-open");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu.classList.toggle("is-open", !isOpen);
});

document
  .querySelectorAll(".mobile-menu a")
  .forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    if (lightbox?.open) lightbox.close();
  }
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document
  .querySelectorAll(".statement, .open-feature, .gallery-item, .closing")
  .forEach((element) => {
    element.classList.add("reveal-on-scroll");
    revealObserver.observe(element);
  });

// Abre as imagens da galeria em uma lightbox nativa e acessível.
document.querySelectorAll(".gallery-item").forEach((item) =>
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.querySelector("img").alt;
    lightboxCaption.textContent = item.dataset.caption;
    lightbox.showModal();
  }),
);

document
  .querySelector(".lightbox-close")
  ?.addEventListener("click", () => lightbox.close());
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

signupForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(signupForm).get("email");
  if (!email) return;
  formMessage.textContent =
    "Pronto — você acompanhará a evolução deste conceito.";
  signupForm.reset();
});
