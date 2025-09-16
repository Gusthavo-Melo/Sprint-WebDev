function getUsers() {
  return JSON.parse(localStorage.getItem("usersDB")) || {};
}

function saveUsers(users) {
  localStorage.setItem("usersDB", JSON.stringify(users));
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const errorMsgEl = document.getElementById("errorMsg");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;
      const users = getUsers();

      if (users[user] && users[user] === pass) {
        localStorage.setItem("user", user);
        window.location.href = "src/pages/home.html";
      } else {
        errorMsgEl.innerText = "Usuário ou senha inválidos!";
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;
      const users = getUsers();

      if (users[user]) {
        errorMsgEl.innerText = "Este nome de usuário já existe!";
      } else {
        users[user] = pass; 
        saveUsers(users); 
        alert("Cadastro realizado com sucesso! Faça o login para continuar.");
        window.location.href = "../index.html";
      }
    });
  }
});


function logout() {
  localStorage.removeItem("user");
  window.location.href = "/index.html";
}
