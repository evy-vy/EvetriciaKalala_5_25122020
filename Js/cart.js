/*************************Données globales nécessaires à la construction du projet*************************/

const apiUrlOriginal = "http://localhost:3000/api/cameras/"; //url API.
const apiUrlRescue = "https://jwdp5.herokuapp.com/api/cameras/"; //url de secours.
let cameras = "cameras"; //Choix du Produit à vendre.
let montantPanier = 0;
/*******************************Page-3**Le Panier*******************************/
//permet de saisir l'Id dans lequel sera comptabiliser les articles ajouté au panier
let compteur = document.getElementById("howManyInBag");
compteur.innerHTML = localStorage.length;

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

  //ajout d'une icone
  let deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-times-circle");
  deleteIcon.dataset.key = i;

  deleteIcon.addEventListener("click", (e) => {
    let key = e.target.dataset.key;
    localStorage.removeItem(key);
    document.location.reload();
  })

  //création ajout de l'imageURL
  let itemImg = document.createElement("img");
  itemImg.setAttribute("src", itemsInCart.url);
  itemImg.classList.add("itemImg");

  //création d'un span contenant le nom de l'objet
  let itemName = document.createElement("span");
  itemName.innerHTML = itemsInCart.nom;

  //création d'une div qui contiendra le prix
  let itemPrice = document.createElement("div");
  itemPrice.classList.add("price", "col-2");

  //création du span prix 
  let price = document.createElement("span");
  price.innerHTML = itemsInCart.prix / 100 + ',00€';

  //création de la div qui recevra les quantités
  let itemQuantity = document.createElement("div");
  itemQuantity.classList.add("quantity", "col-3");

  //insertion d'une icone
  let quantityCursorLeft = document.createElement("i");
  quantityCursorLeft.setAttribute("class", "fas fa-chevron-circle-left");


  let quantityInput = document.createElement("input");

  quantityInput.classList.add("quantityInput");
  quantityInput.setAttribute("type", "number");
  quantityInput.setAttribute("name", "quantity");
  quantityInput.setAttribute("value", itemsInCart.quantite);
  quantityInput.setAttribute("min", "1");
  quantityInput.setAttribute("max", "5");
  quantityInput.dataset.key = i; //clé du localeStorage qui permet de retrouver le produit(l'appareil sur lequel). On l'identifie via sa clé dans le localStorage.

  // Ajout d'un écouteur sur quantityInput pour chaque ligne parcouru dans le localStorage
  quantityInput.addEventListener('change', (e) => {
    //permet d'identifier l'input sur lequel on clic
    console.log('change :', e.target.dataset.key);//key correspond a la clé du localStorage correpondant au produit qu'on modifie
    console.log(e.target.value);
    let newQuantity = e.target.value; //récupère la valeur de l'input
    let appareil = JSON.parse(localStorage.getItem(e.target.dataset.key)); //récupère l'appareil
    console.log('1 :', appareil);
    appareil.quantite = newQuantity; //modifie la quantité de l'appareil.
    console.log('2 :', appareil);
    localStorage.setItem(e.target.dataset.key, JSON.stringify(appareil)); //enregistre le produit modifié dans le localStorage
    let newTotalLine = appareil.quantite * (appareil.prix / 100);
    total.innerHTML = newTotalLine.toFixed(2) + '€';
    console.log(newTotalLine);

    let newMontantPanier = 0;
    for (let i = 0; i < localStorage.length; i++) {
      console.log(i);
      let key = localStorage.key(i);
      console.log(key, localStorage.getItem(key));
      let appareil = JSON.parse(localStorage.getItem(key)); //permet de récupérer l'objet du localStorage
      newMontantPanier += (appareil.prix / 100) * appareil.quantite;
    }
    console.log('kjkj', newMontantPanier);
    totalArea.innerHTML = newMontantPanier.toFixed(2) + '€';
  })


  let quantityCursorRight = document.createElement("i");
  quantityCursorRight.setAttribute("class", "fas fa-chevron-circle-right");

  let total = document.createElement("div");
  itemPrice.classList.add("total", "col-2");


  let totalPrice = document.createElement("span");
  let prixLigne = (itemsInCart.prix / 100) * itemsInCart.quantite + ',00€';
  totalPrice.innerHTML = prixLigne;
  console.log('montantpanoer : ', montantPanier);
  console.log('ligne : ', prixLigne);

  montantPanier += parseInt(prixLigne);
  console.log('total : ', montantPanier.toFixed(2) + '€');

  let totalArea = document.getElementById("cartTotalAmountDiv");
  totalArea.innerHTML = montantPanier.toFixed(2) + '€';

  document.getElementById('cartItems').append(cartItemList, itemPrice, itemQuantity, total);
  cartItemList.append(deleteIcon, itemImg, itemName);

  itemPrice.append(price);
  itemQuantity.append(quantityCursorLeft, quantityInput, quantityCursorRight);
  total.append(totalPrice);

}


let removeAll = document.getElementById("removeAll");
removeAll.addEventListener("click", (e) => {
  localStorage.clear();
  document.location.reload();
})



////////////form/////////////////
let submit = document.getElementById("inscription").addEventListener("submi", function (e) {
  e.preventDefault(); // annule le comportement par défaut du form
  alert("Le formulaire à bien été envoyé !.");
});


