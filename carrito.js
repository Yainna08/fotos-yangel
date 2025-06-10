document.addEventListener("DOMContentLoaded", () => {
    // Manejo del carrito
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCart() {
        document.getElementById("cart-count").innerText = cart.length;
        if (document.getElementById("cart-items")) {
            let cartList = document.getElementById("cart-items");
            cartList.innerHTML = "";
            let total = 0;

            cart.forEach((item, index) => {
                total += item.price;
                let product = document.createElement("div");
                product.innerHTML = `
                    <p>${item.name} - ₡${item.price}</p>
                    <button onclick="removeFromCart(${index})">Eliminar</button>
                `;
                cartList.appendChild(product);
            });

            document.getElementById("total-price").innerText = "₡" + total;
        }
    }

    function addToCart(name, price) {
        cart.push({ name, price });
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }

    // Evento para botones "Agregar al carrito"
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let name = this.parentElement.querySelector(".name").innerText;
            let price = parseInt(this.parentElement.querySelector(".price").innerText.replace("₡", ""));
            addToCart(name, price);
        });
    });

    updateCart();
});
