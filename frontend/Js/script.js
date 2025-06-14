function changeimage() {
  var img = document.getElementById("mouse-image");
  var src = img.src;

  if (img.src.endsWith("mouse-1.png")) {
    img.src = "/assest/mouse-2.png";
  } else if (img.src.endsWith("/assest/mouse-2.png")) {
    img.src = "/assest/mouse-3.png";
  }
  else if (img.src.endsWith("/assest/mouse-3.png")) {
    img.src = "/assest/mouse-4.png"; }

  else if (img.src.endsWith("/assest/mouse-4.png")) {
    img.src = "/assest/mouse-5.png";
}
    else if (img.src.endsWith("/assest/mouse-5.png")) {
    img.src = "/assest/mouse-1.png";
}
}
  function OpenModal(title, image, description, price) {
  var modal = document.querySelector(".Modal")
  modal.style.display = "block";

  document.getElementById("modal-title").innerHTML = title;
  document.getElementById("modal-image").src = image;
  document.getElementById("modal-description").innerHTML = description;
  document.getElementById("modal-price").innerHTML = price;
}

function CloseModal() {
  var modal = document.querySelector(".Modal")
  modal.style.display = "none";

}

  window.onclick = function(event) {
  var modal = document.querySelector(".Modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function OpenCart() {
  var cart = document.querySelector(".side-cart");
  cart.style.display = "block";
}

function CloseCart() {
  var cart = document.querySelector(".side-cart");
  cart.style.display = "none";
}


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
          <i class="fa-solid fa-trash" id="btn-trash" onclick="DeleteAItem()"></i>
    </div>

  `;
  cartItems.appendChild(item);

  
  CloseModal();
  OpenCart();
}

function DeleteAItem() {
  var item = event.target.closest(".cart-item");
   var cartItems = document.getElementById("cart-items");
  if (item) {
    item.remove();
  }
if (cartItems.querySelectorAll(".cart-item").length === 0) {
  cartItems.innerHTML = "Tu carrito está vacío.";
}

}

  function DeleteAllItems() {
    var cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "Tu carrito está vacío";
}
