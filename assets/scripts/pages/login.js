import { loadCSS } from "../utils/cssLoader.js";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/storage.js";

export function renderLogin(mainContent) {
  loadCSS("assets/styles/login.css");

  mainContent.innerHTML = `
 <div class="login-page">  
  <div class="login-container">
      <div class="login-form">
        <h2>Log in</h2>

        <form
          action="#"
          method="post"
          id="loginForm"
          onsubmit="return validateLoginForm(event)"
        >
          <label for="email">Email</label>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />

          <label for="password">Password</label>

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />

          <p class="forgot-password">
            <a href="#/forgetPassword" data-link
              >Forgot your password?
            </a>
          </p>

          <br />

          <button type="submit" class="btn-login">Log in</button>
        </form>
       
      </div>
    </div>
     <span class="signup">
        Don't Have account? 
        <a href="#/signup" data-link>Sign Up</a>
        </span>
    </div>
`;

  const form = document.getElementById("loginForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const users = getFromLocalStorage("users") || [];
    const user = users.find(
      (u) =>
        u.email === formData.get("email") &&
        u.password === formData.get("password")
    );
    if (user) {
      const sessionUser = {
        ...user,
        loggedIn: true,
      };
      saveToLocalStorage("currentUser", sessionUser);
      window.location.reload();
      window.location = "/";
    } else {
      alert("Invalid email or password!");
    }
  });
}
