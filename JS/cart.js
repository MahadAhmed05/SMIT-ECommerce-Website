const API_URL = "https://fakestoreapi.com/products";
const cartContainer = document.getElementById("cart-container");
const cartSummary = document.getElementById("cart-summary");

function getCartItems() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCartItems(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

async function fetchCartProducts() {
  const cart = getCartItems();
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartSummary.innerHTML = "";
    return;
  }

  try {
    const productPromises = cart.map((item) =>
      fetch(`${API_URL}/${item.id}`).then((response) => response.json())
    );
    const products = await Promise.all(productPromises);
    displayCartItems(products, cart);
  } catch (error) {
    console.error(error);
    cartContainer.innerHTML =
      "<p>Error loading cart. Please try again later.</p>";
  }
}

function displayCartItems(products, cart) {
  cartContainer.innerHTML = "";
  let total = 0;

  products.forEach((product, index) => {
    const quantity = cart[index].quantity;
    total += product.price * quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <div class="quantity">
        <button class="decrease" data-id="${product.id}">-</button>
        <span>${quantity}</span>
        <button class="increase" data-id="${product.id}">+</button>
      </div>
      <p>Total: $${(product.price * quantity).toFixed(2)}</p>
      <span class="remove" data-id="${product.id}">Remove</span>
    `;
    cartContainer.appendChild(cartItem);
  });

  cartSummary.innerHTML = `
    <p class="total">Total Price: $${total.toFixed(2)}</p>
    <button id="checkout">Checkout</button>
  `;
}

function updateQuantity(productId, change) {
  const cart = getCartItems();
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeItem(productId);
    } else {
      saveCartItems(cart);
      fetchCartProducts();
    }
  }
}

function removeItem(productId) {
  let cart = getCartItems();
  cart = cart.filter((item) => item.id !== productId);
  saveCartItems(cart);
  fetchCartProducts();
}

cartContainer.addEventListener("click", (e) => {
  const productId = parseInt(e.target.dataset.id);
  if (e.target.classList.contains("increase")) {
    updateQuantity(productId, 1);
  } else if (e.target.classList.contains("decrease")) {
    updateQuantity(productId, -1);
  } else if (e.target.classList.contains("remove")) {
    removeItem(productId);
  }
});

fetchCartProducts();
