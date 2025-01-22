function toggleMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const toggleButton = document.querySelector(".navbar-toggle");
  mobileMenu.classList.toggle("show");
  toggleButton.classList.toggle("active");
  toggleButton.innerHTML = toggleButton.classList.contains("active")
    ? "✕"
    : "☰";
}
