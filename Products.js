const mainContent = document.getElementById("main-content");

// export function renderProductListPage(mainContent) {
//   loadCSS("assets/styles/products.css");

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
var productList = document.getElementById("product-list");
var searchInput = document.getElementById("search-input");
var minPriceInput = document.getElementById("minPrice");
var maxPriceInput = document.getElementById("maxPrice");

fetch("data/products.json")
  .then((response) => response.json())
  .then((data) => {

    for (const category of data) {
      var option = document.createElement("option");
      option.value = category.name;
      option.innerText = category.name;
      slct.appendChild(option);
      productsData = [...productsData, ...category.products];
    }

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
    // window.addToCart = function (product) {
    //   const cart = getFromLocalStorage("cart") || [];
    //   const existingItem = cart.find((item) => item.id === product.id);

    //   if (existingItem) {
    //     existingItem.quantity += 1;
    //   } else {
    //     cart.push({
    //       id: product.id,
    //       name: product.name,
    //       price: product.price,
    //       quantity: 1,
    //     });
    //   }

    //   saveToLocalStorage("cart", cart);
    //   alert(`${product.name} added to cart!`);
    // };
  })
  .catch((error) => console.error("Failed to load products:", error));

function showAll(products) {
  productList.innerHTML = "";
  for (const product of products) {
    productList.innerHTML += `
        <div class="product-card" id="${product.id}">
            <img src="${product.images[0]}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${JSON.stringify(product).replace(
              /"/g,
              "&quot;"
            )})">Add to Cart</button>
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
         <a href="/products/${product.id}" class="product-card" data-link>
          <img src="${product.images[0]}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>Price: $${product.price}</p>
          <button onclick="addToCart(${JSON.stringify(product).replace(
            /"/g,
            "&quot;"
          )})">Add to Cart</button>
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
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    return matchesPrice && matchesSearch;
  });

  filterProducts.forEach((product) => {
    productList.innerHTML += `
            <div class="product-card" id="${product.id}">
              <img src="${product.images[0]}" alt="${product.name}">
              <h3>${product.name}</h3>
              <p>${product.description}</p>
              <p>Price: $${product.price}</p>
              <button onclick="addToCart(${JSON.stringify(product).replace(
                /"/g,
                "&quot;"
              )})">Add to Cart</button>
            </div>
    `;
  });

  if (filterProducts.length === 0 && searchTerm) {
    productList.innerHTML = "<p>No matching products found.</p>";
  }
}

// }
