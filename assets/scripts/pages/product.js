import { renderHeader } from "../components/header.js";
import { addToCart } from "../pages/cart.js";
import { saveComment, getComments } from "../utils/comments.js";
import { loadCSS } from "../utils/cssLoader.js";
export async function renderProduct(productId) {
  loadCSS("assets/styles/product.css");
  const content = document.getElementById("main-content");
  try {
    const res = await fetch("../../../data/products.json");
    const data = await res.json();
    const allProducts = data.flatMap((cateogry) => cateogry.products);
    const product = allProducts.find((pd) => pd.id === parseInt(productId));
    console.log(product);

    content.innerHTML = `
        <div class="product-container">
          <div class="product-image">
            <img src="${product.images[0]}" alt="${product.name}">
          </div>
          <div class="product-details">
            <h1>${product.name}</h1>
            <p>$${product.price.toFixed(2)} & Free Shipping</p>
            <p>${product.description}</p>
            <div class="quantity-selector">
              <button id="decrement">-</button>
              <span id="quantity">1</span>
              <button id="increment">+</button>
              <button id="addToCart">Add to Cart</button>
            </div>
            <h3>Comments</h3>
            <div class="comment-section">
              <textarea id="commentText" placeholder="Add your comment..."></textarea>
              <button id="submitComment">Submit</button>
            </div>
            
          </div>
        </div>
      `;

    let quantity = 1;

    // Quantity increment/decrement
    document.getElementById("increment").addEventListener("click", () => {
      quantity++;
      document.getElementById("quantity").innerText = quantity;
    });

    document.getElementById("decrement").addEventListener("click", () => {
      if (quantity > 1) quantity--;
      document.getElementById("quantity").innerText = quantity;
    });

    // Add to Cart
    document.getElementById("addToCart").addEventListener("click", () => {
      addToCart(product, quantity);
      renderHeader();
      alert(`${product.name} added to cart!`);
    });

    // Submit Comment
    document.getElementById("submitComment").addEventListener("click", () => {
      const commentText = document.getElementById("commentText").value;
      if (commentText.trim()) {
        saveComment(productId, { name: "Anonymous", comment: commentText });
        alert("Comment added!");
        renderProduct(productId); 
      }
    });
  } catch (err) {
    content.innerHTML = `<h2>Error loading product</h2>`;
    console.error(err);
  }
}
