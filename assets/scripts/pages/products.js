import { renderHeader } from "../components/header.js";
import { loadCSS } from "../utils/cssLoader.js";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/storage.js";
import { addToCart } from "./cart.js";

const mainContent = document.getElementById("main-content");

export function renderProducts(mainContent) {
  loadCSS("assets/styles/products.css");

  mainContent.innerHTML = `
<div id="search-container">
  <label for="search-input">Search: </label>
  <input type="search" id="search-input" placeholder="Search here...">
</div>
<h2>Our Products</h2>
<div id="filter">
  <span>Category : </span>
  <select id="select-category">
    <option value="all" default>All</option>
  </select>
  <span class="lab">Filter By Price</span>
  <input type="number" id="minPrice" placeholder="Min Price" />
  <input type="number" id="maxPrice" placeholder="Max Price" />

</div>
<div id="product-list" class="product-grid"></div>
`;

  var productsData = [];
  var slct = document.getElementById("select-category");
  const productList = document.getElementById("product-list");

  var searchInput = document.getElementById("search-input");

  const minPriceInput = document.getElementById("minPrice");
  const maxPriceInput = document.getElementById("maxPrice");

  fetch("../../../data/products.json")
    .then((response) => response.json())
    .then((data) => {
      for (const category of data) {
        var option = document.createElement("option");
        option.value = category.name;
        option.innerText = category.name;
        slct.appendChild(option);
        productsData = [...productsData, ...category.products];
      }

      console.log(productsData);
      showAll(productsData);

      slct.addEventListener("change", (ev) => {
        var categoraName = ev.target.value;
        if (categoraName == "all") {
          showAll(productsData);
        } else {
          showCategory(data, categoraName);
        }
      });

      searchInput.addEventListener("keyup", () => {
        liveSearch();
      });

      minPriceInput.addEventListener("input", () => {
        liveSearch();
      });
      maxPriceInput.addEventListener("input", () => {
        liveSearch();
      });

      // Add the addToCart function to window scope

      window.addToCart = function (product) {
        console.log(product);
        console.log(product.price);
        addToCart(product, 1);
        renderHeader();
        alert(`${product.name} added to Cart`);
      };
    })
    .catch((error) => console.error("Failed to load products:", error));

  function showAll(products) {
    productList.innerHTML = "";
    for (const product of products) {
      productList.innerHTML += `
      <div class="product-card" data-link>
        <a href="#/products/${product.id}">
          <img src="${product.images[0]}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>Price: $ ${product.price}</p>
        </a>
        <button id="addToCart" onclick='addToCart(${JSON.stringify(
          product
        )})'>Add to Cart</button>
      </div>
    `;
    }
  }

  function showCategory(allData, cateName) {
    productList.innerHTML = "";
    for (const category of allData) {
      if (category.name == cateName) {
        for (const product of category.products) {
          productList.innerHTML += `
          <div class="product-card" data-link>
            <a href="#/products/${product.id}">
              <img src="${product.images[0]}" alt="${product.name}">
              <h3>${product.name}</h3>
              <p>${product.description}</p>
              <p>Price: $ ${product.price}</p>
            </a>
            <button id="addToCart" onclick='addToCart(${JSON.stringify(
              product
            )})'>Add to Cart</button>
          </div>
        `;
        }
      }
    }
  }

  function liveSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

    productList.innerHTML = "";

    const filterProducts = productsData.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm);
      const matchesPrice =
        product.price >= minPrice && product.price <= maxPrice;

      return matchesPrice && matchesSearch;
    });

    filterProducts.forEach((product) => {
      productList.innerHTML += `
      <div class="product-card" data-link>
        <a href="#/products/${product.id}">
          <img src="${product.images[0]}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>Price: $ ${product.price}</p>
        </a>
        <button id="addToCart" onclick='addToCart(${JSON.stringify(
          product
        )})'>Add to Cart</button>
      </div>
    `;
    });

    // If no results
    if (filterProducts.length === 0 && searchTerm) {
      productList.innerHTML = "<p>No matching products found.</p>";
    }
  }
}

export function showCategory(allData, cateName, productList) {
  productList.innerHTML = "";
  for (const category of allData) {
    if (category.name == cateName) {
      for (const product of category.products) {
        productList.innerHTML += `
                  <div class="product-card" data-link>
                      <a href="#/products/${product.id}">
                          <img src="${product.images[0]}" alt="${product.name}">
                          <h3>${product.name}</h3>
                          <p>${product.description}</p>
                          <p>Price: $ ${product.price}</p>
                      </a>
                      <button id="addToCart" onclick='addToCart(${JSON.stringify(
                        product
                      )})'>Add to Cart</button>
                  </div>
              `;
      }
    }
  }
}
