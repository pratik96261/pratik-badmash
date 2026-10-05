/* =========================================================
   The Burger Cafe - Simple JavaScript & jQuery Code
   Course: CA-232-FP Web Designing Project
   Features:
   1. Cart management with localStorage
   2. Category Quick Pop-up with jQuery (.fadeIn / .fadeOut)
   3. Form Validation with JavaScript
   4. Order Successful Pop-up Message
   ========================================================= */

// Sample data for the 4 Category Pop-ups on Home Page
const categoryPopupData = {
  pizza: [
    { name: "Margherita Pizza", price: 249, image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&auto=format&fit=crop&q=80" },
    { name: "Farmhouse Veg Pizza", price: 299, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80" },
    { name: "Cheese & Corn Pizza", price: 269, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&auto=format&fit=crop&q=80" }
  ],
  burger: [
    { name: "Classic Veg Burger", price: 129, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80" },
    { name: "Cheese Smash Burger", price: 169, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=80" },
    { name: "Crispy Chicken Burger", price: 199, image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=400&auto=format&fit=crop&q=80" }
  ],
  fries: [
    { name: "Classic Salted Fries", price: 89, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&auto=format&fit=crop&q=80" },
    { name: "Peri-Peri Spicy Fries", price: 119, image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&auto=format&fit=crop&q=80" },
    { name: "Cheesy Loaded Fries", price: 149, image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=400&auto=format&fit=crop&q=80" }
  ],
  combos: [
    { name: "Burger + Fries + Coke", price: 249, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&auto=format&fit=crop&q=80" },
    { name: "Pizza + Fries Combo", price: 349, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80" },
    { name: "Family Meal Box", price: 599, image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&auto=format&fit=crop&q=80" }
  ]
};

// -------------------------------------------------------------
// 1. CART FUNCTIONS (Using localStorage)
// -------------------------------------------------------------

// Function to get cart array from localStorage
function getCart() {
  let cart = localStorage.getItem("cafe_cart");
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
}

// Function to add an item to the cart
function addToCart(name, price, image) {
  let cart = getCart();
  
  // Add new item object
  cart.push({
    name: name,
    price: price,
    image: image
  });

  // Save back to localStorage
  localStorage.setItem("cafe_cart", JSON.stringify(cart));

  // Update navbar count
  updateCartCount();

  // Simple feedback message
  alert(name + " added to cart successfully!");
}

// Function to update the cart badge count in the navigation bar
function updateCartCount() {
  let cart = getCart();
  let countElement = document.getElementById("cart-count");
  if (countElement) {
    countElement.innerText = cart.length;
  }
}

// Function to display all cart items on cart.html
function displayCart() {
  let cart = getCart();
  let tableBody = document.getElementById("cart-table-body");
  let totalElement = document.getElementById("cart-total");
  let emptyMsg = document.getElementById("empty-cart-msg");
  let cartContent = document.getElementById("cart-content");

  if (!tableBody) return;

  // Clear existing rows
  tableBody.innerHTML = "";

  if (cart.length === 0) {
    if (cartContent) cartContent.style.display = "none";
    if (emptyMsg) emptyMsg.style.display = "block";
    return;
  } else {
    if (cartContent) cartContent.style.display = "block";
    if (emptyMsg) emptyMsg.style.display = "none";
  }

  let grandTotal = 0;

  // Loop through items and create table rows
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    grandTotal += Number(item.price);

    let row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.image}" alt="${item.name}"></td>
      <td><strong>${item.name}</strong></td>
      <td>₹${item.price}</td>
      <td>
        <button class="btn btn-danger" onclick="removeFromCart(${i})">Remove</button>
      </td>
    `;
    tableBody.appendChild(row);
  }

  // Display grand total
  if (totalElement) {
    totalElement.innerText = grandTotal;
  }
}

// Function to remove an item from cart
function removeFromCart(index) {
  let cart = getCart();
  cart.splice(index, 1); // remove item at position 'index'
  localStorage.setItem("cafe_cart", JSON.stringify(cart));
  updateCartCount();
  displayCart();
}

// -------------------------------------------------------------
// 2. POP-UP FUNCTIONS FOR 4 OPTIONS ON HOME PAGE (jQuery)
// -------------------------------------------------------------

// Open Category Pop-up using jQuery .fadeIn()
function openCategoryPopup(categoryName) {
  let items = categoryPopupData[categoryName];
  if (!items) return;

  let title = categoryName.toUpperCase();
  $("#popup-title").text(title + " OPTIONS");
  
  let listHtml = "";
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    listHtml += `
      <div class="popup-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="info">
          <h4>${item.name}</h4>
          <span>₹${item.price}</span>
        </div>
        <button class="btn btn-primary" onclick="addToCart('${item.name}', ${item.price}, '${item.image}')">
          Add
        </button>
      </div>
    `;
  }

  // Update popup list content and link to page
  $("#popup-list").html(listHtml);
  $("#popup-view-page-btn").attr("href", categoryName + ".html");

  // jQuery Animation to show pop-up
  $("#categoryModal").css("display", "flex").hide().fadeIn(300);
}

// Close Category Pop-up using jQuery .fadeOut()
function closeCategoryPopup() {
  $("#categoryModal").fadeOut(250);
}

// -------------------------------------------------------------
// 3. FORM VALIDATION & ORDER SUCCESS POPUP
// -------------------------------------------------------------

// Function to validate the checkout form on cart.html
function validateAndOrder(event) {
  event.preventDefault(); // Stop normal form submit

  let cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty! Please add some items before ordering.");
    return false;
  }

  // Get input values
  let name = document.getElementById("cust-name").value.trim();
  let phone = document.getElementById("cust-phone").value.trim();
  let email = document.getElementById("cust-email").value.trim();
  let address = document.getElementById("cust-address").value.trim();
  let payment = document.getElementById("cust-payment").value;

  // Clear previous error messages
  document.getElementById("name-error").innerText = "";
  document.getElementById("phone-error").innerText = "";
  document.getElementById("email-error").innerText = "";
  document.getElementById("address-error").innerText = "";
  document.getElementById("payment-error").innerText = "";

  let isValid = true;

  // 1. Name Validation (at least 3 characters)
  if (name === "" || name.length < 3) {
    document.getElementById("name-error").innerText = "Please enter your full name (minimum 3 characters).";
    isValid = false;
  }

  // 2. Phone Validation (must be 10 digits)
  let phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phone)) {
    document.getElementById("phone-error").innerText = "Please enter a valid 10-digit mobile number.";
    isValid = false;
  }

  // 3. Email Validation (must contain @ and .)
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById("email-error").innerText = "Please enter a valid email address.";
    isValid = false;
  }

  // 4. Address Validation
  if (address === "" || address.length < 8) {
    document.getElementById("address-error").innerText = "Please enter a complete delivery address.";
    isValid = false;
  }

  // 5. Payment Selection Validation
  if (payment === "") {
    document.getElementById("payment-error").innerText = "Please select a payment method.";
    isValid = false;
  }

  // If form is valid, show the Order Successful Popup!
  if (isValid) {
    let grandTotal = 0;
    for (let i = 0; i < cart.length; i++) {
      grandTotal += Number(cart[i].price);
    }

    // Set details in the success popup
    let orderNumber = Math.floor(1000 + Math.random() * 9000);
    document.getElementById("order-id-display").innerText = "#TBC-" + orderNumber;
    document.getElementById("order-name-display").innerText = name;
    document.getElementById("order-phone-display").innerText = phone;
    document.getElementById("order-address-display").innerText = address;
    document.getElementById("order-total-display").innerText = "₹" + grandTotal;

    // Show popup with jQuery animation
    $("#orderSuccessModal").css("display", "flex").hide().fadeIn(300);

    // Clear cart and form after order
    localStorage.removeItem("cafe_cart");
    updateCartCount();
    document.getElementById("checkout-form").reset();
  }

  return false;
}

// Function to close Order Success popup and go back to home page
function closeOrderPopup() {
  $("#orderSuccessModal").fadeOut(200, function() {
    window.location.href = "index.html";
  });
}

// When page loads, update cart count badge
$(document).ready(function() {
  updateCartCount();
});
