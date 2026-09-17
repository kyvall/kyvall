const toast = document.getElementById("toast");
const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const searchInput = document.getElementById("searchInput");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

menuBtn.addEventListener("click", () => sidebar.classList.toggle("open"));

document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
    item.classList.add("active");
    if (window.innerWidth <= 760) sidebar.classList.remove("open");
  });
});

document.querySelectorAll(".quick-card").forEach(card => {
  card.addEventListener("click", () => showToast(`${card.dataset.action} selected`));
});

document.querySelectorAll(".follow").forEach(button => {
  button.addEventListener("click", () => {
    const following = button.textContent === "Following";
    button.textContent = following ? "Follow" : "Following";
    showToast(following ? "Unfollowed" : "Now following");
  });
});

document.getElementById("customizeBtn").addEventListener("click", () => {
  showToast("Dashboard customization opened");
});

document.getElementById("viewAllBtn").addEventListener("click", () => {
  showToast("Showing all recent activity");
});

document.getElementById("exploreBtn").addEventListener("click", () => {
  document.getElementById("exploreMore").scrollIntoView({ behavior: "smooth", block: "center" });
});

document.getElementById("exploreMore").addEventListener("click", () => {
  showToast("Explore more projects");
});

document.getElementById("addBtn").addEventListener("click", () => {
  showToast("Create menu opened");
});

searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    const query = searchInput.value.trim();
    showToast(query ? `Searching for "${query}"` : "Type something to search");
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "/" && document.activeElement !== searchInput) {
    event.preventDefault();
    searchInput.focus();
  }
});
