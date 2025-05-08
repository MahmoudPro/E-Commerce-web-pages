import { loadCSS } from "../utils/cssLoader.js";

export function renderHome(mainContent) {
  loadCSS("assets/styles/hero.css");

  mainContent.innerHTML = `
          <section class="hero-section">
      <div class="content container">
        <div class="hero-text">
          <h1>The Best Way to Make Someone Happy...</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            quidem impedit veniam eum, itaque quos doloribus quisquam
            voluptatibus odio! Sit officia doloremque debitis provident aperiam,
            harum placeat. Neque, cupiditate repudiandae?
          </p>
          <a href="/products" class="btn">Choose Your Box</a>
        </div>
        <div class="hero-image">
          <img src="assets/images/box.png" alt="Gift Box" />
        </div>
      </div>
    </section>
    `;
}
