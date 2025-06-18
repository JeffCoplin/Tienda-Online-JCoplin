// Cambiar imagen del mouse
function changeimage() {
  var img = document.getElementById("mouse-image");
  if (!img) return;

  if (img.src.endsWith("mouse-1.png")) {
    img.src = "/assest/mouse-2.png";
  } else if (img.src.endsWith("mouse-2.png")) {
    img.src = "/assest/mouse-3.png";
  } else if (img.src.endsWith("mouse-3.png")) {
    img.src = "/assest/mouse-4.png";
  } else if (img.src.endsWith("mouse-4.png")) {
    img.src = "/assest/mouse-5.png";
  } else {
    img.src = "/assest/mouse-1.png";
  }
}

// Abrir modal
function OpenModal(title, image, description, price) {
  var modal = document.querySelector(".Modal");
  modal.style.display = "block";

  document.getElementById("modal-title").innerHTML = title;
  document.getElementById("modal-image").src = image;
  document.getElementById("modal-description").innerHTML = description;
  document.getElementById("modal-price").innerHTML = price;
}

// Cerrar modal
function CloseModal() {
  var modal = document.querySelector(".Modal");
  modal.style.display = "none";
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
  var modal = document.querySelector(".Modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Abrir carrito
function OpenCart() {
  var cart = document.querySelector(".side-cart");
  cart.style.display = "block";
}

// Cerrar carrito
function CloseCart() {
  var cart = document.querySelector(".side-cart");
  cart.style.display = "none";
}

// Agregar producto al carrito y guardar en localStorage
function AddToCart() {
  var title = document.getElementById("modal-title").innerText;
  var price = document.getElementById("modal-price").innerText;
  var image = document.getElementById("modal-image").src;

  var cartItems = document.getElementById("cart-items");

  if (cartItems.innerHTML.includes("Tu carrito está vacío")) {
    cartItems.innerHTML = "";
  }

  var item = document.createElement("div");
  item.classList.add("cart-item");
  item.innerHTML = `
    <div style="display:flex; align-items:center; margin-bottom:10px;">
      <img src="${image}" width="50" style="margin-right:10px;">
      <div>
        <strong>${title}</strong>
        <p>${price}</p>
      </div>
      <i class="fa-solid fa-trash" onclick="DeleteAItem(event)"></i>
    </div>
  `;
  cartItems.appendChild(item);

  saveCartToLocalStorage();
  CloseModal();
  OpenCart();
}

// Guardar carrito en localStorage
function saveCartToLocalStorage() {
  var cartItems = document.querySelectorAll("#cart-items .cart-item");
  var items = [];

  cartItems.forEach(function(item) {
    var image = item.querySelector("img").src;
    var title = item.querySelector("strong").innerText;
    var price = item.querySelector("p").innerText;

    items.push({ image, title, price });
  });

  localStorage.setItem("cart", JSON.stringify(items));
}

// Cargar carrito desde localStorage al cargar la página
function loadCartFromLocalStorage() {
  var cartItems = document.getElementById("cart-items");
  var storedCart = localStorage.getItem("cart");

  if (storedCart) {
    var items = JSON.parse(storedCart);
    cartItems.innerHTML = "";

    items.forEach(function(item) {
      var div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <div style="display:flex; align-items:center; margin-bottom:10px;">
          <img src="${item.image}" width="50" style="margin-right:10px;">
          <div>
            <strong>${item.title}</strong>
            <p>${item.price}</p>
          </div>
          <i class="fa-solid fa-trash" onclick="DeleteAItem(event)"></i>
        </div>
      `;
      cartItems.appendChild(div);
    });
  } else {
    cartItems.innerHTML = "Tu carrito está vacío.";
  }
}

// Eliminar un solo producto y actualizar localStorage
function DeleteAItem(event) {
  var item = event.target.closest(".cart-item");
  var cartItems = document.getElementById("cart-items");

  if (item) {
    item.remove();
    saveCartToLocalStorage();
  }

  if (cartItems.querySelectorAll(".cart-item").length === 0) {
    cartItems.innerHTML = "Tu carrito está vacío.";
    localStorage.removeItem("cart");
  }
}

// Eliminar todos los productos y limpiar localStorage
function DeleteAllItems() {
  var cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "Tu carrito está vacío.";
  localStorage.removeItem("cart");
}

// Cargar carrito al abrir la página
window.onload = function() {
  loadCartFromLocalStorage();
};
