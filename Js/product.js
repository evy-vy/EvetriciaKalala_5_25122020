/*************************Données globales nécessaires à la construction du projet*************************/
let camera; //variable qui récupère le produit à afficher.
let urlId = ""; // variable qui récupère l'id produit pour affichage individuel. 
let compteur = document.getElementById("howManyInBag"); //permet de saisir l'Id dans lequel sera comptabiliser les articles ajouté au panier
compteur.innerHTML = localStorage.length;

/*********************Fonction(s) scope globale***********************/

//Par cette fonction, on vérifie si le localStorage est vide ou non.
function getLocalStorageEltById(id, option) {

  //condition permettant de vérifier que le panier est vide
  if (localStorage.length === 0) {
    return null;
  }

  //Boucle permettant de parcourir le localStorage, de récupérer la clé des éléments présents, de la stocker sous forme d'objet dans la constante elt, puis de comparer l'id et l'option d'un objet récupéré dans le localStorage à l'id et à l'option de l'item ajouté au clic.
  for (i = 0; i < localStorage.length; i++) {
    let element = localStorage.getItem(i);
    let elt = JSON.parse(element);
    if (elt.id === id && elt.option === option) {
      return i;
    }
  }
  return null;
}

/****************************Page-2**Affichage du produit sélectionné par l"internaute**********************/

/*
*Récupération de l'URL de la page sur laquelle on se trouve + ajout de l"id produit. 
*On accède au éléments de l'url de la page en cours grace a window.location.search 
*/

function getId() {
  const url = window.location.search; //renvoie la partie chaine de requête d'une url
  const params = new URLSearchParams(url); //permet d'extraire l'id
  const id = params.get("id"); //méthode get qui retourne la première valeur associée au paramètre de recherche donné.
  return id;
}

urlId = getId();

function selectedUrl(urlId) {
  return fetch(api("apiUrlOriginal") + urlId)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      alert(error);
    })
}

//Me permet de récuperer et d"afficher le produit sélectionné selon son id
async function cameraId() {
  camera = await selectedUrl(urlId);
  displayCameraById(camera);
}

cameraId();

//fonction qui affiche les éléments dans le html
function displayCameraById(camera) {

  // création d"une ligne
  const newDiv = document.createElement("div");
  newDiv.classList.add("row");

  // création d"une liste désordonnée
  const newUl = document.createElement("ul");
  newUl.classList.add("class", "list", "col-8", "col-sm-6", "col-md-5", "col-xl-4", "ms-sm-3", "ms-md-1", "ms-xl-5", "mb-3");

  // création d"une liste
  const newLi = document.createElement("li");
  newLi.classList.add("list__card", "card", "text-center", "card-body", "text-light", "lead");

  // ajout du titre
  const title = document.createElement("h2");
  title.classList.add("list__title", "card-title", "card-header", "text-uppercase", "text-center", "col-12");
  title.innerHTML = camera.name;

  // de l"image
  const image = document.createElement("img");
  image.src = camera.imageUrl;
  image.classList.add("list__image", "card-img-top");
  image.setAttribute("alt", "appareil photo " + camera.name);

  // du paragraphe descriptif
  const paragraph = document.createElement("p");
  paragraph.classList.add("list__description", "mt-3", "mb-2", "lead");
  paragraph.innerText = camera.description;

  // du prix
  const price = document.createElement("span");
  price.classList.add("list__price", "mb-2", "mx-3");
  price.innerHTML = "Prix : " + camera.price / 100 + ",00€";

  //containerChoice
  const containerChoice = document.createElement("div");
  containerChoice.classList.add("containerChoice", "container-fluid", "d-flex", "flex-wrap", "mb-3")

  // quantité
  const quantity = document.createElement("span");
  quantity.classList.add("quantity", "row-inline", "fw-bold", "fs-6");
  quantity.innerText = "Quantité :"

  let quantityInput = document.createElement("input");
  quantityInput.id = "quantity";
  quantityInput.classList.add("mx-2", "my-2");
  quantityInput.setAttribute("type", "number");
  quantityInput.setAttribute("name", "quantity");
  quantityInput.setAttribute("value", "1");
  quantityInput.setAttribute("min", "1");
  quantityInput.setAttribute("max", "100");

  // options (titre)
  const lensesTitle = document.createElement("span");
  lensesTitle.classList.add("lenses", "row-inline", "fw-bold", "fs-6", "sm-mx-2");
  lensesTitle.innerText = "Lentilles :"

  /* options (select & options).
  * Création d"une fonction me permettant de creer un input select dans lequel je peux lister, grâce à une boucle, les lentilles disponibles pour l"appareil photo selectionné.
  */

  //création des variables et constante nécessaire à la création de la structure du select input et des options
  let selectOption;
  let cameraOption;
  let lenses = camera.lenses;

  const optionsCamera = () => {

    selectOption = document.createElement("select");
    selectOption.id = "selectOptions";
    selectOption.setAttribute("name", "selectOptions");
    selectOption.classList.add("mx-2");

    //pour chaque valeur trouvée dans le array "lenses" de la camera sélectionnée, une nouvelle option est créée.
    for (i = 0; i < lenses.length; i++) {
      cameraOption = document.createElement("option");
      cameraOption.setAttribute("value", lenses[i]); //[i] correspond à la valeur récupérée.
      cameraOption.classList.add("mx-2", "my-2");
      cameraOption.innerHTML = lenses[i];
      selectOption.append(cameraOption);
    }
  }

  optionsCamera();

  //création du button "ajouter au panier"
  let btn = document.createElement("button");
  btn.id = "cartBtn";
  btn.setAttribute("type", "button");
  btn.classList.add("list__btn", "btn", "add-cart", "mb-1", "col-10", "col-sm-7", "col-md-6", "col-xl-5", "center", "text-light");
  btn.innerText = "Ajouter au panier";

  //Ajout des articles aux paniers et définition des fonctionnalitées enclanchées au clic
  let addToCart = btn;
  addToCart.addEventListener("click", () => {

    //création de l'objet au clic
    let item = {
      "nom": camera.name,
      "prix": camera.price,
      "url": camera.imageUrl,
      "option": selectOption.value,
      "quantite": quantityInput.value,
      "id": camera._id
    }

    //création d'une variable qui à pour valeur une fonction ayant pour paramètre l'id et l'option de item créé au clic. 
    let localStorageElt = getLocalStorageEltById(item.id, item.option);

    //permet de saisir l'Id dans lequel sera comptabiliser les articles ajouté au panier
    const compteur = document.getElementById("howManyInBag");

    //si null => l'objet correspondant aux données envoyées lors du clic est créé dans le localStorage sous forme de chaine
    if (localStorageElt === null) {
      localStorage.setItem(localStorage.length, JSON.stringify(item));

      //permet d"afficher le nombre d'article ajouté au panier au niveau de la barre de navigation grace au nombre d'éléments comptés dans le localStorage.
      compteur.innerHTML = localStorage.length;
      alert("L'article à bien été ajouté au panier");

    } else {

      //les valeurs recupérées sont enregistrés dans la constante element.
      let element = JSON.parse(localStorage.getItem(localStorage.key(localStorageElt)));

      // addition des quantités. parseInt analyse une chaîne et renvoi un entier.
      item.quantite = parseInt(element.quantite) + parseInt(item.quantite);

      // mise à jour de l'élément dans le localStorage
      localStorage.setItem(localStorageElt, JSON.stringify(item));
      compteur.innerHTML = localStorage.length;
      alert("L'article à bien été ajouté au panier");
    }
  });


  //ajout de chaque élément ci-dessus au html
  document.getElementById("cameraId").append(newDiv);
  newDiv.append(newUl);
  newUl.append(newLi);
  newLi.append(title, image, paragraph, price, containerChoice, btn);
  containerChoice.append(quantity, lensesTitle);
  quantity.append(quantityInput);
  lensesTitle.append(selectOption);
};
