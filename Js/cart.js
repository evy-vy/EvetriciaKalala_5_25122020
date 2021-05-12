/*************************Données globales nécessaires à la construction du projet*************************/

const apiUrlOriginal = "http://localhost:3000/api/cameras/"; //url API.
const apiUrlRescue = "https://jwdp5.herokuapp.com/api/cameras/"; //url de secours.
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
  console.log('montantpanoer : ', montantPanier);
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
console.log('email :', form.email);

//On écoute la modification de l'email
form.email.addEventListener('change', () => {

  //this permet de surveiller les changements apporté par l'utilisateur au moment de la saisie dans l'élément que l'on est en train d'écouter soit form.email.
  validEmail(this);
});



/************************** Validation FORM******************************/
// creation de la fonction validEmail qui récupère la variable passé dans la fonction validEmail(this). On la nomme comme on le souhaite

const validEmail = (inputEmail) => {

  //création de la reg exp pour vérification email
  let emailRegExp = new RegExp("^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}");
  console.log('reg exp :', emailRegExp);

  //On test l'expression régulière.
  let testEmail = emailRegExp.test(inputEmail.value);
  console.log(testEmail);


  //récupération de la balise small
  let small = document.getElementById("emailWarning");
  console.log("small :", small);

  if (testEmail) {
    small.innerHTML = 'Données valides';
    small.classList.remove('text-danger');
    small.classList.add('text-success');
  } else {
    small.innerHTML = 'Données non valides';
    small.classList.remove('text-success');
    small.classList.add('text-danger');
  }

  //On écoute la soumission du fomrulaire
  form.email.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validEmail(form.email)) {
      form.submit();
    }
  });
};



  // const validAdress = (inputAdress) => {
  //   const adressRegExp = new RegExp("^[a-zA-ZÀ-ú\-\s]");
  //   console.log('strings :', inputAdress.test);
  //   return adressRegExp.test(inputAdress);
  // }


  // /* On test l'expression régulière.
  // * la variable est égale à l'expression régulière. 
  // * on passe en param ce que l'utilisateur à tapé dans le form*/
  // if (emailRegExp.test(inputEmail.value)) {
  //   small.innerHTML = "Données valides";
  //   small.classList.remove('text-danger');
  //   small.classList.add('text-success');
  // } else {
  //   small.innerHTML = "Données non valides";
  //   small.classList.remove('text-success');
  //   small.classList.add('text-danger');
  // }



/* ^ = désigne le début du text
* [a-zA-Z0-9.-_] = indique les caractères autorisés (l'alphabet en minuscule et en majuscule, les chiffres de 0 à 9, les caractères point, tiret et underscore).
* + = on peut en écrire plusieurs.
* [@]{1} = on doit utiliser le @ qui doit être utilisé {1} nombre de fois max qu'il peut être utilisé.
*[a-z]{2,10} = après le point, on peut utiliser des lettres minuscules allant de 2 lettres min jusqu'a 10 max.
* $ = désigne la fin de l'expression régulière
* 'g' = marqueur ou flag qui précise comment lire la regex. g correspond à la recherche globale, elle permet de retrouver toutes les correspondances.
*/


