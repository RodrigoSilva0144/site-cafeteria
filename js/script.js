const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const itemBtn = document.getElementById("item-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count")

let cart = [];

// Abrir o Carrinho
cartBtn.addEventListener("click", () => {
    cartModal.style.display = "flex";

    updateCartModal();
});

//Fechar o Carrinho quando Clicar fora
cartModal.addEventListener("click", (e) => {
    if(e.target === cartModal) {
        cartModal.style.display = "none";
    };
});

//Fechar pelo Botão "Fechar"
closeModalBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
});

//Achar o Nome e o Preço dos produtos
menu.addEventListener("click", (e) => {
    let parentButton = e.target.closest(".add-to-cart-btn");

    if(parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));

        addToCart(name, price);
    };
});

//Adicionar o Produto no Carrinho
function addToCart(name, price) {
    const hasItem = cart.find(item => item.name === name);

    if(hasItem) {
        hasItem.quantity += 1;

    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        });
    };

    updateCartModal();
};

// Atualiza o Carrinho
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("cart-item");

        document.getElementById('cart-container');
    
        cartItemElement.innerHTML = `
            <div class="cart-item-content">
                <div class="item-details">
                    <p class="item-name">${item.name}</p>
                    <p class="item-quantity">Qtd: ${item.quantity}</p>
                    <p class="item-price">R$ ${item.price.toFixed(2)}</p>
                </div>

                
                <button class="remove-btn" date-name="${item.name}">
                    Remover
                </button>
                
            </div>
        `;

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
};


// Remover o Item do Carrinho
cartItemsContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("remove-btn")){
        const name = e.target.getAttribute("date-name");

        removeItemCart(name);
    };
});

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1) {
        const item = cart[index];
        
        if(item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    };
};

// Finalizar pedido
checkoutBtn.addEventListener("click", () => {
    if(cart.length === 0) return;

    //Enviar o pedido para a API do WhatsApp
    const cartItems = cart.map((item) => {
        return(
            `${item.name} Quantidade: ${item.quantity} Preço: R$${item.price} | `
        );
    }).join("");

    const message = encodeURIComponent(cartItems);
    const phone = "SEU_NÚMERO";

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
});