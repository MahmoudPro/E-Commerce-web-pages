import { loadCSS } from "../utils/cssLoader.js";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/storage.js";

export function renderSignup(mainContent) {
  loadCSS("assets/styles/signup.css");

  mainContent.innerHTML = `
<div class="singupPage">
 <div class="signup-container">

        <div class="signup-form">

            <h2>Sign Up</h2>
            
            <form action="#" method="post" id="signupForm" onsubmit="return validateSignUp(event)">

               
                <label for="username">Name</label>
                <input type="text" id="username" name="username" placeholder="Enter your username" required>

             
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="example@email.com" required="@">

          
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required >

            
                <label for="confirm-password">Confirm password</label>
                <input type="password" id="confirm-password" name="confirm-password" placeholder="Re-enter your password"required>

            
                <button type="submit" class="btn-signup">Sign Up</button>

           
                <p class="login-link">Already have an account?<a href= "#/" target="_blank">Log in</a></p>
            </form>
        </div>
    </div>
    </div>
    `;

  const form = mainContent.querySelector("#signupForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const users = getFromLocalStorage("users") || [];
    const existingUser = users.find(
      (user) => user.email === formData.get("email")
    );

    if (existingUser) {
      alert("Email already registered!");
      return;
    }

    const newUser = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    users.push(newUser);
    saveToLocalStorage("users", users);
    window.location.hash = "login";
  });
}
