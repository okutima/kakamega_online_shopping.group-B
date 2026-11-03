
// Available products
const products = [
    { id: 1, name: "Smartwatch", price: 2500 },
    { id: 2, name: "Smartphone", price: 15000 },
    { id: 3, name: "Fashion T-Shirt", price: 800 },
    { id: 4, name: "Sports Shoes", price: 2500 },
    { id: 5, name: "Digital Camera", price: 8000 },
    { id: 6, name: "Fashion Handbag", price: 1800 }
];

// Shopping cart
let cart = [];

// Add product to cart
function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    alert(product.name + " added to cart!");
}

// Display cart items and calculate total
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    }

    cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p>KSh ${item.price.toLocaleString()} × ${item.quantity}</p>
            </div>

            <div>
                <button onclick="changeQuantity(${item.id}, -1)">−</button>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
                <button onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;

        cartItems.appendChild(div);
    });

    cartCount.textContent = count;
    cartTotal.textContent = total.toLocaleString();
}

// Increase or decrease quantity
function changeQuantity(productId, amount) {
    const item = cart.find(item => item.id === productId);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeItem(productId);
    } else {
        updateCart();
    }
}

// Remove one product
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Empty the entire cart
function clearCart() {
    cart = [];
    updateCart();
}

// Demonstration checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your shopping cart is empty!");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    alert(
        "Order demonstration successful!\n" +
        "Total: KSh " + total.toLocaleString() +
        "\nNo actual payment has been made."
    );

    cart = [];
    updateCart();
}

// Contact form demonstration
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("customer-name").value;

    document.getElementById("form-message").textContent =
        "Thank you, " + name + "! Your message has been received in this demo.";

    this.reset();
});

// Initial cart display
updateCart();
