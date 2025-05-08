import { loadCSS } from "../utils/cssLoader.js";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/storage.js";

export function renderCart(mainContent) {
  loadCSS("assets/styles/cart.css");
  const cart = getFromLocalStorage("cart") || [];
  console.log(cart);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  mainContent.innerHTML = `
      <h3 id="cart">Cart</h3>
    <div class="cart-container">
        <div class="products-container">
            <table style="border-collapse: collapse; width: 100%;">
                <thead style="text-align: left;">
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody class="productList" id="productList">

                ${
                  cart.length
                    ? cart
                        .map(
                          (product) => `
                           <tr>
         <td colspan="6"><hr></td>
        </tr>
                          
                  <tr>
                  
                    <td style="padding-left: 20px;">
                      <i class="fa fa-close Exit remove-button" onclick="removeFromCart(${
                        product.id
                      })"></i>
                    </td>
                    <td>
                      <img src="${
                        product.images[0]
                      }" alt="" class="product-image" width="60" height="50">
                    </td>
                    <td>
                      <p class="product-name">${product.name}</p>
                    </td>
                    <td>$${product.price}</td>
                    <td>
                      <div class="quantity-controls">
                        <button class="quantity-button decrease">-</button>
                        <input type="text" class="quantity-input" value="${
                          product.quantity
                        }" readonly>
                        <button class="quantity-button increase">+</button>
                      </div>
                    </td>
                    <td class="itemtotalPrice">$${
                      product.price * product.quantity
                    }</td>
                  </tr>
                `
                        )
                        .join("")
                    : '<tr><td colspan="6"><p>Your cart is Empty</p></td></tr>'
                }
                
                </tbody>
            </table>
        </div>
        <div class="checkout-container">
            <p class="cart-totalP">Cart Totals</p>
            <hr>
            <table class="priceTable">
                <tr>
                    <td style="width: 120px;">Subtotal</td>
                    <td class="totalPrice">$${totalPrice}</td>
                </tr>
                <tr>
                    <td colspan="2"><hr></td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td class="totalPrice">$${totalPrice}</td>
                </tr>
                <tr>
                    <td colspan="2"><hr></td>
                </tr>
            </table>
            <p>Have a Coupon?</p>
            <a href="#">
                <div class="cartButtons">
                    <p>PROCEED TO CHECKOUT</p>
                </div>
            </a>
        </div>
    </div>
  `;

  document.getElementById("productList").innerHTML += ``;
  window.removeFromCart = function (productId) {
    let cart = getFromLocalStorage("cart") || [];
    console.log(cart);
    cart = cart.filter((item) => item.id !== productId);
    saveToLocalStorage("cart", cart);
    renderCart(mainContent);
    updateCartDisplay();
  };

  // decrease and increase

  const decreaseButtons = document.querySelectorAll(".decrease");
  const increaseButtons = document.querySelectorAll(".increase");
  const totalPrices = document.querySelectorAll(".totalPrice");

  // decrease
  decreaseButtons.forEach((button, idx) => {
    button.addEventListener("click", () => {
      const cart = getFromLocalStorage("cart") || [];
      if (cart[idx].quantity > 1) {
        cart[idx].quantity--;
        const quantityInput = button.nextElementSibling;
        quantityInput.value = cart[idx].quantity;
        const totalPrice = cart.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        );
        totalPrices.forEach((item) => {
          item.textContent =`$${totalPrice}`;
        });
        saveToLocalStorage("cart", cart);
      }
    });
  });
  // increase
  increaseButtons.forEach((button, idx) => {
    button.addEventListener("click", () => {
      const cart = getFromLocalStorage("cart") || [];
      cart[idx].quantity++;
      const quantityInput = button.previousElementSibling;
      quantityInput.value = cart[idx].quantity;
      const totalPrice = cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );

      totalPrices.forEach((item) => {
        item.textContent = `$${totalPrice}`;
      });
      saveToLocalStorage("cart", cart);
    });
  });
}

export function addToCart(product, quantity) {
  const cart = getFromLocalStorage("cart") || [];
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveToLocalStorage("cart", cart);
}
