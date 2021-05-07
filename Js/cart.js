/*************************Données globales nécessaires à la construction du projet*************************/

const apiUrlOriginal = "http://localhost:3000/api/cameras/"; //url API.
const apiUrlRescue = "https://jwdp5.herokuapp.com/api/cameras/"; //url de secours.
let cameras = "cameras"; //Choix du Produit à vendre.

/*******************************Page-3**Le Panier*******************************/
//récupération des articles dans le localStorage

//boucle me permettant de récuperer les articles présent dans le local storage ainsi que l'ensemble des informations lié à chaque article grace a la clé et de les afficher dans la console
// function cartItems() {

// let key;
for (let i = 0; i < localStorage.length; i++) {
  console.log(i);
  let key = localStorage.key(i);
  console.log(key, localStorage.getItem(key));
  let itemsInCart = JSON.parse(localStorage.getItem(key));
  console.log('jkhkj :', itemsInCart);

  //création de la div recevant les articles
  let cartItemList = document.createElement("div");
  cartItemList.classList.add("products__list", "col-4");

  let deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-times-circle");

  let itemImg = document.createElement("img");
  itemImg.setAttribute("src", itemsInCart.url);
  itemImg.classList.add("itemImg");

  let itemName = document.createElement("span");
  itemName.innerHTML = itemsInCart.nom;

  let itemPrice = document.createElement("div");
  itemPrice.classList.add("price", "col-2");

  let price = document.createElement("span");
  price.innerHTML = itemsInCart.prix / 100 + ',00€';

  let itemQuantity = document.createElement("div");
  itemQuantity.classList.add("quantity", "col-3");

  let quantityCursorLeft = document.createElement("i");
  quantityCursorLeft.setAttribute("class", "fas fa-chevron-circle-left");

  let quantityInput = document.createElement("input");
  quantityInput.id = "quantityInput";
  quantityInput.setAttribute("type", "number");
  quantityInput.setAttribute("name", "quantity");
  quantityInput.setAttribute("value", itemsInCart.quantite);
  quantityInput.setAttribute("min", "1");
  quantityInput.setAttribute("max", "5");

  let quantityCursorRight = document.createElement("i");
  quantityCursorRight.setAttribute("class", "fas fa-chevron-circle-right");

  let total = document.createElement("div");
  itemPrice.classList.add("total", "col-2");

  let totalPrice = document.createElement("span");
  totalPrice.innerHTML = (itemsInCart.prix / 100) * itemsInCart.quantite + ',00€';

  document.getElementById('cartItems').append(cartItemList, itemPrice, itemQuantity, total);
  cartItemList.append(deleteIcon, itemImg, itemName)
  //  );
  itemPrice.append(price);
  itemQuantity.append(quantityCursorLeft, quantityInput, quantityCursorRight);
  total.append(totalPrice);


}

// for (let i = 0; i < localStorage.length; i++) {
//   console.log(i);
//   let key = localStorage.key(i);
//   console.log(key, localStorage.getItem(key));
//   let totalCost = JSON.parse(localStorage.getItem(key));
//   console.log('jkhkj :', totalCost);
//   totalCost(totalCost);
// }



////////////form/////////////////
let submit = document.getElementById("inscription").addEventListener("submi", function (e) {
  e.preventDefault(); // annule le comportement par défaut du form
  alert("Le formulaire à bien été envoyé !.");
});


