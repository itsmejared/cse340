function initializeMobileMenu() {
  const toggleButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!toggleButton || !navLinks) return;

  toggleButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

function initializeFlashMessages() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => {
    setTimeout(() => {
      alert.classList.add("flash-fade");
      setTimeout(() => {
        const container = alert.parentElement;
        alert.remove();
        if (container && container.children.length === 0) {
          container.remove();
        }
      }, 400);
    }, 8000);
  });
}

initializeMobileMenu();
initializeFlashMessages();
