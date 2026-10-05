# 🍔 The Burger Cafe - First Year Student Project Guide

This is a clean, simple, and basic frontend project created for **CA-232-FP Project on Web Designing**.

---

## 📂 Files in this Folder

1. **`index.html`** - Home page featuring:
   - Cafe title and welcome banner.
   - The **4 Options / Categories** (Burger, Pizza, Fries, Combos).
   - "Quick Popup" buttons that open a simple pop-up box with items and prices using jQuery.
   - "View Page" buttons to open each full category page.
2. **`burger.html`** - Shows multiple burger options with photo, description, price, and "Add to Cart" button.
3. **`pizza.html`** - Shows multiple pizza options with photo, description, price, and "Add to Cart" button.
4. **`fries.html`** - Shows multiple fries options with photo, description, price, and "Add to Cart" button.
5. **`combos.html`** - Shows multiple combo meals with photo, description, price, and "Add to Cart" button.
6. **`cart.html`** - Shows:
   - Table of items added to cart with price, photo, and remove button.
   - Total amount calculation.
   - Delivery order form with **JavaScript validation** (Name, 10-digit Phone, Email, Address, Payment method).
   - **"Order Successful!"** pop-up modal showing order details, order ID, and confirmation.
7. **`style.css`** - Basic, clean CSS with simple colors, cards, grid layout, and modal styles.
8. **`script.js`** - Simple JavaScript & jQuery functions with easy-to-understand comments.

---

## 🎓 Viva Questions & Answers (How to Explain to Teacher)

### Q1: How does the shopping cart work without a database?
> **Answer:** We use the browser's built-in `localStorage`. When the user clicks "Add to Cart", the `addToCart(name, price, image)` function converts the cart array into a string using `JSON.stringify()` and stores it in `localStorage.setItem("cafe_cart", ...)`. On the cart page, `JSON.parse(localStorage.getItem("cafe_cart"))` reads it back and creates table rows dynamically.

### Q2: What jQuery functions did you use?
> **Answer:** 
> 1. `$("#categoryModal").fadeIn(300)` and `$("#categoryModal").fadeOut(250)` for showing and hiding the pop-up modal smoothly.
> 2. `$("#orderSuccessModal").fadeIn(300)` to show the "Order Successful" confirmation window.
> 3. `$("#cart-count").text(...)` to update the badge count in the navigation bar.

### Q3: How is the form validated?
> **Answer:** Inside `validateAndOrder(event)` in `script.js`:
> - Full name must have at least 3 characters (`name.length >= 3`).
> - Mobile number must match the 10-digit regular expression `/^[0-9]{10}$/`.
> - Email address must match the standard email pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
> - Address cannot be empty (`address.length >= 8`).
> - If any field is incorrect, an error message appears in red underneath the field and `event.preventDefault()` stops the submission.

---

## 🚀 How to Run
Double-click **`index.html`** in any browser (Chrome, Edge, Firefox). No installation or server needed!
