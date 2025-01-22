const API_URL = "https://fakestoreapi.com/products";
const productDetailContainer = document.getElementById("product-detail");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function fetchProductDetails(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }
    const product = await response.json();
    displayProductDetails(product);
  } catch (error) {
    console.error(error);
    productDetailContainer.innerHTML =
      "<p>Error loading product details. Please try again later.</p>";
  }
}

function displayProductDetails(product) {
  productDetailContainer.innerHTML = `
    <img src="${product.image}" alt="${product.title}">
    <h1>${product.title}</h1>
    <p>${product.description}</p>
    <p class="price">Price: $${product.price}</p>
    <button id="add-to-cart">Add to Cart</button>
  `;
}

document.body.addEventListener("click", (e) => {
  if (e.target.id === "add-to-cart") {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productInCart = cart.find((item) => item.id === parseInt(productId));
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.push({ id: parseInt(productId), quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  }
});

if (productId) {
  fetchProductDetails(productId);
} else {
  productDetailContainer.innerHTML = "<p>Invalid Product ID</p>";
}
