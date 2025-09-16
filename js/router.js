document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("user");
  if (!user && window.location.pathname.includes(".html") && !window.location.pathname.includes("login.html")) {
    window.location.href = "login.html";
  }
});
