document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartUI();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const product = event.target.closest(".product");
            const productName = product.querySelector(".name").textContent;
            const productPrice = parseFloat(product.querySelector(".price").textContent.replace(/[₡$]/g, ""));

            addToCart(productName, productPrice);
        });
    });

    function addToCart(name, price) {
        cart.push({ name, price });
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
    }

    function updateCartUI() {
        const cartList = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");
        const cartCount = document.getElementById("cart-count");

        if (!cartList || !cartTotal || !cartCount) return;

        cartList.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            const li = document.createElement("li");
            li.textContent = `${item.name} - ₡${item.price.toLocaleString()}`;
            
            const removeButton = document.createElement("button");
            removeButton.textContent = "X";
            removeButton.classList.add("remove-item");
            removeButton.addEventListener("click", () => removeFromCart(index));
            
            li.appendChild(removeButton);
            cartList.appendChild(li);
        });

        cartTotal.textContent = `Total: ₡${total.toLocaleString()}`;
        cartCount.textContent = cart.length;
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
    }
});
