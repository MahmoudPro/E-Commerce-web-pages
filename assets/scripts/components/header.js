import { loadCSS } from "../utils/cssLoader.js";
import { getFromLocalStorage } from "../utils/storage.js";
import { showCategory } from "../pages/products.js";

export function renderHeader() {
  loadCSS("assets/styles/header.css");
  const header = document.getElementById("header");

  const cart = getFromLocalStorage("cart") || [];
  const cartCount = cart.length;
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  console.log(totalPrice);
  fetch("../../../data/products.json")
    .then((response) => response.json())
    .then((data) => {
      for (const category of data) {
        let options = document.getElementById("dropDownMenu");
        if (options) {
          options.innerHTML += `
          <li>
            <a href="#/products/${category.name}" data-category="${category.name}">${category.name}</a>
          </li>           
        `;
        }
      }
      const categoryLinks = document.querySelectorAll("#dropDownMenu a")
      categoryLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const categoryName = link.dataset.category;
          window.location.hash = `#/products`;
          const selectCategory = document.getElementById("select-category");
          if (selectCategory) {
            selectCategory.value = categoryName;
            selectCategory.dispatchEvent(new Event("change"));
          }
        });
      });
      console.log(categoryLinks);
    });

  // user data
  const userLoggedIn = getFromLocalStorage("currentUser") || {
    loggedIn: false,
  };
  const userIcon =
    userLoggedIn?.loggedIn == true
      ? `<i class="fa-solid fa-user"></i>`
      : `<i class="fa-solid fa-right-from-bracket"></i>`;
  const showTotalPrice =
    userLoggedIn?.loggedIn === true ? totalPrice.toFixed(2) : "0.00";
  console.log(showTotalPrice);
  console.log(userLoggedIn.loggedIn);
  console.log(totalPrice);
  header.innerHTML = `
   <header class="header">
      <div class="container">
        <a href="/" data-link class="logo">
          <h1>REGALO</h1>
          <span>GIFT SHOP</span>
        </a>

        <nav>
          <ul class="nav-links">
            <li><a href="/" data-link>Home</a></li>
            <li class="dropdown">
              <a href="#">Shop by Category &#x25BE;</a>
              <ul class="dropdown-menu" id="dropDownMenu">
              
              </ul>
            </li>
            <li><a href="#/products" data-link>Products</a></li>
            <li><a href="#/about" data-link>About Us</a></li>
            <li><a href="#/contact" data-link>Contact Us</a></li>
          </ul>
        </nav>

              <div class="icons">
          <a href="#/search" data-link class="search">&#128269;</a>
          <a href="#/cart" data-link class="cart">
            &#128717; <span class="cart-count">${cartCount}</span>
          </a>
          <a id="user-icon" href="#/login" data-link class="user">${userIcon}</a>
          <span class="price">$${showTotalPrice}</span>
          <button class="menu-toggle" id="menu-toggle">&#9776;</button>
      </div>
      </div>
    </header>
  `;
  logInNOut();
}

export function updateCartDisplay() {
  const cartCountElement = document.querySelector(".cart-count");
  const priceElement = document.querySelector(".price");
  const cart = getFromLocalStorage("cart") || [];

  const cartCount = cart.length;
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  cartCountElement.textContent = cartCount;
  priceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

function logInNOut() {
  const userIcon = document.getElementById("user-icon");
  const currentUser = getFromLocalStorage("currentUser");

  if (currentUser && currentUser.loggedIn) {
    userIcon.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i>`;
    userIcon.href = "#/";
    userIcon.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      window.location = "#/login";
      renderHeader();
    });
  } else {
    userIcon.innerHTML = `<i class="fa-solid fa-user"></i>`;
    userIcon.href = "#/login";
  }
}
