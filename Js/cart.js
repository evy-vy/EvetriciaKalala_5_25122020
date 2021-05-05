/*************************Données globales nécessaires à la construction du projet*************************/

const apiUrlOriginal = "http://localhost:3000/api/cameras/"; //url API.
const apiUrlRescue = "https://jwdp5.herokuapp.com/api/cameras/"; //url de secours.
let cameras = "cameras"; //Choix du Produit à vendre.

/*******************************Page-3**Le Panier*******************************/

const cartItems = document.getElementsByClassName("product");
cartItems.createElement("div");
cartItems.createElement("i");


/* < div class="product" >
  <i class="fas fa-times-circle"></i>
  <img src= ${camera.imageUrl}>
    <span>${camera.name}</span>
</div>
  <div class="price">${camera.price},00€</div>
  <div class="quantity">
    <i class="fas fa-chevron-circle-left"></i>
    <span>${camera.inCart}</span>
    <i class="fas fa-chevron-circle-right"></i>
  </div>
  <div class total>
    ${camera.inCart * camera.price},00€
</div>`
});
productContainer.innerHTML +=
` < div class= basketTotalContainer >
    <h4 class="basketTotalTitle">
      Basket Total
  <h4>
        <h4 class="basketTotal">
          ${cartCost},00€
  </h4>
  </div>` */
