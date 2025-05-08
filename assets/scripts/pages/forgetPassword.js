import { loadCSS } from "../utils/cssLoader.js";

import { getFromLocalStorage } from "../utils/storage.js";

export function renderForgetPassword(mainContent) {
  loadCSS("assets/styles/forgetPassword.css");
  mainContent.innerHTML = `
     <div class="forgot-password-container">
      <div class="forgot-password-form">
        <h2>Forgot your password?</h2>

        <p>
          Please enter your email and we will send you a link to reset your
          password.
        </p>

        <form
          action="#"
          method="post"
          id="forgotPasswordForm"
          onsubmit="return validateEmail(event)"
        >
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />

          <button type="submit" class="btn-submit">Send</button>

          <p class="back-to-login">
            Remember your password?
            <a href="#/login" data-link
              >Log in</a
            >
          </p>
        </form>
      </div>
    </div>
    `;
  const form = mainContent.getElementById("forgotPasswordForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const users = getFromLocalStorage("users") || [];
    const user = users.find((u) => u.email === formData.get("email"));
    if (user) {
      alert("We have send an email for the email" + user.email);
      window.location.reload();
      window.location = "/";
    } else {
      alert("This email not signed up");
    }
  });
}
