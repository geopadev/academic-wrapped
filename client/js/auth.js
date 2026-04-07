const viewAuthError = document.querySelector(".view-auth__error");

export function setupAuth() {}

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
