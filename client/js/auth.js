import { hideElement, showElement } from "./utils.js";

const viewAuthError = document.querySelector(".view-auth__error");
const viewAuthLogin = document.querySelector(".view-auth__login");
const viewAuthRegister = document.querySelector(".view-auth__register");
const viewAuthToggle = document.querySelector("#view-auth__toggle");

export function setupAuth(onLogin) {
  viewAuthLogin.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.querySelector("#auth-login-username").value;
    const password = document.querySelector("#auth-login-password").value;

    const user = await login(username, password);
    if (user) onLogin();
  });

  viewAuthRegister.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.querySelector("#auth-register-username").value;
    const email = document.querySelector("#auth-register-email").value;
    const password = document.querySelector("#auth-register-password").value;

    const user = await register(username, email, password);
    if (user) onLogin();
  });

  viewAuthToggle.addEventListener("click", (event) => {
    if (!viewAuthLogin.classList.contains("view--hidden")) {
      hideElement(viewAuthLogin, "view--hidden");
      showElement(viewAuthRegister, "view--hidden");
    } else {
      hideElement(viewAuthRegister, "view--hidden");
      showElement(viewAuthLogin, "view--hidden");
    }
  });
}

export async function register(username, email, password) {
  const newRegister = {
    username: username,
    email: email,
    password: password,
  };

  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRegister),
  });

  if (!response.ok) {
    viewAuthError.textContent = "COULD NOT REGISTER";
    return;
  }

  return await login(username, password);
}

export async function login(username, password) {
  const newLogin = {
    username: username,
    password: password,
  };

  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newLogin),
  });

  if (!response.ok) {
    viewAuthError.textContent = "COULD NOT LOGIN";
    return;
  }
  const user = await response.json();
  localStorage.setItem("user", JSON.stringify(user));
  return user;
}
