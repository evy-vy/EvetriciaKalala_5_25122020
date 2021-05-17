/*************************Données globales nécessaires à la construction du projet*************************/

const apiUrlOriginal = "http://localhost:3000/api/cameras/"; //url API.
const apiUrlRescue = "https://jwdp5.herokuapp.com/api/cameras/"; //url de secours.
const apiUrlPostOriginal = "http://localhost:3000/api/cameras/order/"; //url post original.
const apiUrlPost = "https://jwdp5.herokuapp.com/api/cameras/order/" // url post
let cameras = "cameras"; //Choix du Produit à vendre.
let montantPanier = 0;
/*******************************Page-3**Le Panier*******************************/

//Saisie de l'Id dans lequel sera comptabiliser les articles ajoutés au panier
let compteur = document.getElementById("howManyInBag");
compteur.innerHTML = localStorage.length;

/***************récupération des articles dans le localStorage**************/

//boucle me permettant de récuperer les articles présent dans le local storage ainsi que l'ensemble des informations lié à chaque article grace a la clé et de les afficher dans la console
for (let i = 0; i < localStorage.length; i++) {
  console.log(i);
  let key = localStorage.key(i);
  console.log(key, localStorage.getItem(key));
  let itemsInCart = JSON.parse(localStorage.getItem(key));
  console.log('articles :', itemsInCart);

  //création de la ul recevant les articles
  let cartItemUl = document.createElement("ul");
  cartItemUl.classList.add("listContainer");

  //création de la div recevant les articles
  let cartItemList = document.createElement("li");
  cartItemList.classList.add("products__list");

  //ajout d'une icone
  let deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-times-circle");
  deleteIcon.classList.add("col-1");
  deleteIcon.dataset.key = i;

  deleteIcon.addEventListener("click", (e) => {
    let key = e.target.dataset.key;
    localStorage.removeItem(key);
    document.location.reload();
  });

  //création ajout de l'imageURL
  let itemImg = document.createElement("img");
  itemImg.setAttribute("src", itemsInCart.url);
  itemImg.classList.add("itemImg", "col-1");

  //création d'un span contenant le nom de l'objet
  let itemName = document.createElement("span");
  itemName.classList.add("itemName", "col-2");
  itemName.innerHTML = itemsInCart.nom;

  //création d'un span qui contiendra le span prix
  // let itemPrice = document.createElement("div");
  // itemPrice.classList.add("price", "col-2");
  let itemPrice = document.createElement("span");
  itemPrice.classList.add("price", "col-3");

  //création du span prix 
  let price = document.createElement("span");
  price.classList.add("price");
  price.innerHTML = itemsInCart.prix / 100 + ',00€';

  //création de la span qui recevra les quantités
  // let itemQuantity = document.createElement("div");
  // itemQuantity.classList.add("quantity", "col-3");
  let itemQuantity = document.createElement("span");
  itemQuantity.classList.add("input", "col-3");

  //insertion d'une icone
  let quantityCursorLeft = document.createElement("i");
  quantityCursorLeft.setAttribute("class", "fas fa-chevron-circle-left");

  //ajout de l'input quantité
  let quantityInput = document.createElement("input");
  quantityInput.classList.add("quantityInput");
  quantityInput.setAttribute("type", "number");
  quantityInput.setAttribute("name", "quantity");
  quantityInput.setAttribute("value", itemsInCart.quantite);
  quantityInput.setAttribute("min", "1");
  quantityInput.setAttribute("max", "5");
  quantityInput.dataset.key = i; //clé du localeStorage qui permet de retrouver l'appareil sur lequel on se trouve. On l'identifie via sa clé (key) dans le localStorage.

  // Ajout d'un écouteur sur quantityInput pour chaque ligne parcouru dans le localStorage
  quantityInput.addEventListener('change', (e) => {

    //permet d'identifier l'input sur lequel on clic
    console.log('change :', e.target.dataset.key);//key correspond a la clé du localStorage correpondant au produit qu'on modifie
    console.log(e.target.value);
    let newQuantity = e.target.value; //récupère la valeur de l'input
    let appareil = JSON.parse(localStorage.getItem(e.target.dataset.key));
    //récupèration de l'appareil
    console.log('1 :', appareil);
    appareil.quantite = newQuantity; //modifie la quantité de l'appareil.
    console.log('2 :', appareil);
    localStorage.setItem(e.target.dataset.key, JSON.stringify(appareil)); //enregistre le produit modifié dans le localStorage
    //calcul du total d'une ligne à la modification des quantités.
    let newTotalLine = appareil.quantite * (appareil.prix / 100);
    total.innerHTML = newTotalLine.toFixed(2) + '€';
    console.log(newTotalLine);

    //calcul du montant total du panier
    let newMontantPanier = 0;
    for (let i = 0; i < localStorage.length; i++) {
      console.log(i);
      let key = localStorage.key(i);
      console.log(key, localStorage.getItem(key));
      let appareil = JSON.parse(localStorage.getItem(key)); //permet de récupérer l'objet du localStorage
      newMontantPanier += (appareil.prix / 100) * appareil.quantite;
    }
    console.log('total panier', newMontantPanier);
    totalArea.innerHTML = newMontantPanier.toFixed(2) + '€';
  })

  let quantityCursorRight = document.createElement("i");
  quantityCursorRight.setAttribute("class", "fas fa-chevron-circle-right");

  let total = document.createElement("span");
  total.classList.add("totalLigne", "col-2");
  itemPrice.classList.add("total");

  let totalPrice = document.createElement("span");
  totalPrice.classList.add("totalPrice");
  let prixLigne = (itemsInCart.prix / 100) * itemsInCart.quantite + ',00€';
  totalPrice.innerHTML = prixLigne;
  console.log('montantpanier : ', montantPanier);
  console.log('ligne : ', prixLigne);

  montantPanier += parseInt(prixLigne);
  console.log('total : ', montantPanier.toFixed(2) + '€');

  let totalArea = document.getElementById("cartTotalAmountDiv");
  totalArea.innerHTML = "Montant total : " + montantPanier.toFixed(2) + '€';

  document.getElementById('cartItems').append(cartItemUl, itemPrice)
  cartItemUl.append(cartItemList);
  cartItemList.append(deleteIcon, itemImg, itemName, itemPrice, itemQuantity, total);
  itemPrice.append(price);
  itemQuantity.append(quantityCursorLeft, quantityInput, quantityCursorRight);
  total.append(totalPrice);

}

//permet de supprimer le contenu entier du panier
let removeAll = document.getElementById("removeAll");
removeAll.addEventListener("click", (e) => {
  localStorage.clear();
  document.location.reload();
});


/*************************************FORM**********************************/

// récupération du formulaire
let form = document.querySelector("#inscription");
console.log('form :', form);

//On écoute les modifications apportées dans l'évenement que l'on cible (input email).
form.email.addEventListener('change', (e) => {

  //je récupère la balise qui me permettra de transmettre un message au client selon que la valeur saisie dans l'evenement cible est bon ou mauvais en fonction du type que l'on attend.
  let element = document.getElementById("emailWarning");
  verifInput(e.target.value, "email", element);
});

form.lastName.addEventListener('change', (e) => {
  let element = document.getElementById("lastNameWarning");
  verifInput(e.target.value, "string", element);
});

form.firstName.addEventListener('change', (e) => {
  let element = document.getElementById("firstNameWarning");
  verifInput(e.target.value, "string", element);
});

form.address.addEventListener('change', (e) => {
  let element = document.getElementById("addressWarning");
  verifInput(e.target.value, "address", element);
});

form.city.addEventListener('change', (e) => {
  let element = document.getElementById("cityWarning");
  verifInput(e.target.value, "string", element);
});

//Soumission du formulaire. On met l'écouteur d'évènement directement sur le form et on écoute l'évènement.
form.addEventListener('submit', (e) => {
  e.preventDefault();
  e.stopPropagation();

  checkForSubmit(e.target); //On envoi le form pour récupérer les champs
});

/************************** Validation FORM******************************/

/*fonction qui me permet de vérifier le type de la valeur saisie dans les champs selon que ce soit un email, un string ou une adresse par rapport à la regExp qui lui est attribué. 
* un message est ensuite affichée si la valeur est bonne ou fausse
*/
const verifInput = (value, type, element) => {
  console.log("coucou  :", value);
  console.log("coucou  :", type);
  let regExp;

  //on vérifie que les champs soient bien remplis et qu'aucun espace ou tab etc seul ne soit accepté comme valeur valide.
  // if (localStorage.length === 0) {
  //   console.log("vide");
  //   alert("Pensez à remplir votre panier avant de passer commande!");
  if (value.trim() === "") {//
    element.innerHTML = "Données non valides";
    element.classList.remove("text-success");
    element.classList.add("text-danger");
    return false;
  }
  switch (type) {
    case "email":
      console.log("verif");
      regExp = new RegExp("^[0-9a-zA-Z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}");
      break;
    case "string":
      console.log("string");
      regExp = new RegExp("^[-'a-zA-ZÀ-ÖØ-öø-ÿ ]+$");
      break;
    case "address":
      console.log("address");
      regExp = new RegExp("^[-'a-zA-Z0-9À-ÖØ-öø-ÿ ]+$");
      break;
  }
  console.log("value: ", value); //verifie la valeur envoyé dans l'input
  if (regExp.test(value)) {
    console.log("ok");
    if (element != undefined) {
      element.innerHTML = "Données valides";
      element.classList.remove("text-danger");
      element.classList.add("text-success");
    }
    return true;
  } else {
    console.log("pas ok");
    if (element != undefined) {
      element.innerHTML = "Données non valides";
      element.classList.remove("text-success");
      element.classList.add("text-danger");
    }
    return false;
  };
}

// fonction qui verifie que les champs sont tous bons pour l'envoi

const checkForSubmit = (form) => {
  let fields = [
    {
      "type": "email",
      "value": form.elements["email"].value,
    },
    {
      "type": "string",
      "value": form.elements["lastName"].value,
    },
    {
      "type": "string",
      "value": form.elements["firstName"].value,
    },
    {
      "type": "address",
      "value": form.elements["address"].value,
    },
    {
      "type": "string",
      "value": form.elements["city"].value,
    }
  ];

  let isValid = false;

  fields.forEach((item) => {
    //on parcours notre tableaux de champs, et on execute notre fonction de vérification
    isValid = verifInput(item["value"], item["type"]);
    if (!isValid) { //si isValid est false on sort de la boucle
      return false
    }
  })

  //si tous les champs sont bons isValid sera égal a true
  if (isValid) {
    if (localStorage.length === 0) {
      console.log("vide");
      alert("Pensez à remplir votre panier avant de passer commande !")
    } else {
      // tout est ok on envois le formulaire
      console.log("on envoi le formulaire");
      sendOrder(form);
      alert("Votre commande à bien été prise en compte !");
    }
  };

  function sendOrder(form) {
    let order = [];
    let formData = new FormData(document.getElementById("inscription")); //récupère les valeurs entrées dans me formulaire et les formates
    formData.forEach(function (value, key) { //me permet de creer une nouvelle ligne pour chaque clé et valeur du tableau
      order[key] = value;
    })
    console.log(order);

    let productsList = [];
    let montantCommande = 0;
    for (let i = 0; i < localStorage.length; i++) {
      console.log(i);
      let key = localStorage.key(i);
      console.log(key, localStorage.getItem(key));
      let itemsInCart = JSON.parse(localStorage.getItem(key));
      console.log('articles :', itemsInCart);
      productsList.push(itemsInCart.id);
      montantCommande += itemsInCart.quantite * (itemsInCart.prix / 100);
    }
    localStorage.setItem("total", document.getElementById("cartTotalAmountDiv").innerText);

    console.log(montantCommande);
    let post = {
      "contact": {
        "firstName": order.firstName,
        "lastName": order.lastName,
        "email": order.email,
        "address": order.address,
        "city": order.city
      },
      "products": productsList
    }
    console.log("post :", post);
    console.log("products", productsList);

    fetch(apiUrlPostOriginal, { // ce que j'envoie
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post)
    })
      .then(response => response.json())
      .then(data => {
        console.log('data :', data);
        localStorage.setItem("commandeOK", JSON.stringify(data));
        console.log(localStorage);
        window.location = "confirmation.html";
      })
      .catch(error => { // en cas d'erreur
        alert("error");
      });
  }
};
/* ^ = désigne le début du text
* [a-zA-Z0-9.-_] = indique les caractères autorisés (l'alphabet en minuscule et en majuscule, les chiffres de 0 à 9, les caractères point, tiret et underscore).
* + = on peut en écrire plusieurs.
* [@]{1} = on doit utiliser le @ qui doit être utilisé {1} nombre de fois max qu'il peut être utilisé.
*[a-z]{2,10} = après le point, on peut utiliser des lettres minuscules allant de 2 lettres min jusqu'a 10 max.
* $ = désigne la fin de l'expression régulière
* 'g' = marqueur ou flag qui précise comment lire la regex. g correspond à la recherche globale, elle permet de retrouver toutes les correspondances.
*/


