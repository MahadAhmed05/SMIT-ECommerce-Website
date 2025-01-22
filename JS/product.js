const API_URL = "https://fakestoreapi.com/products"; 
const productListContainer = document.getElementById("product-list");


async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error(error);
    productListContainer.innerHTML =
      "<p>Error loading products. Please try again later.</p>";
  }
}


function displayProducts(products) {
  productListContainer.innerHTML = ""; 

  products.forEach((product) => {
    
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.description.substring(0, 100)}...</p>
      <p class="price">$${product.price}</p>
      <a href="product-detail.html?id=${product.id}">View Details</a>
    `;
    productListContainer.appendChild(productCard);
  });
}

fetchProducts();
