/*************************Données globales nécessaires à la construction du projet*************************/

const apiUrlOriginal = "http://localhost:3000/api/cameras/"; //url API.
const apiUrlRescue = "https://jwdp5.herokuapp.com/api/cameras/"; //url de secours.
let cameras = "cameras"; //Choix du Produit à vendre.
let urlId = ""; // récupération de l"id pour affichage individuel des produits. 

/****************************Page-2**Affichage du produit sélectionné par l"internaute**********************/
//permet de saisir l'Id dans lequel sera comptabiliser les articles ajouté au panier
let compteur = document.getElementById("howManyInBag");
compteur.innerHTML = localStorage.length;
//Récupération de l"URL de la page sur laquelle on se trouve + ajout de l"id produit.

function getId() {
  let url = window.location.search;
  let params = new URLSearchParams(url);
  let id = params.get("id");
  console.log(id);
  return id;
}
urlId = getId();

function selectedUrl(id) {
  return fetch(apiUrlRescue + id)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      alert(error);
    })
}

//Me permet de récuperer et d"afficher le produit sélectionné selon son id
async function cameraId() {
  let camera = await selectedUrl(urlId);
  console.log(camera);
  displayCameraById(camera);
}
cameraId();


/*AddEventListener et localStorage*/

/*Par cette fonction, on vérifie si le localStorage est vide ou non.
* S'il est vide, ou si un objet est inexistant, la valeur qui sera retournée par la fonction sera NULL.
* Sinon, la valeur qui sera retournée sera la clé de l'objet présent dans le local storage.
*/

//function qui retourne comme valeur soit l'inexistance d'un objet (NULL) soit la clé de l'objet présent dans le localStorage.
function getLocalStorageEltById(id, option) {

  //condition permettant de vérifier que le panier est vide
  if (localStorage.length === 0) {
    return null;
  }
  //affiche le résultat du contenu du localStorage
  console.log('getLocalStorage');

  //boucle permettant de parcourir le localStorage
  for (i = 0; i < localStorage.length; i++) {
    //de récupérer la clé des éléments présents.
    let element = localStorage.getItem(localStorage.key(i));
    //la clé (element) qui est un string, est enregistrée dans la variable elt sous forme d'objet grâce à JSON.parse.
    let elt = JSON.parse(element);
    //si la clé et l'option d'un objet récupéré dans le localStorage est strictement égale à l'id et à l'option de l'item ajouté au clic alors la condition retourne la clé.
    if (elt.id === id && elt.option === option) {

      // retourne la clé (key)
      return i;

    }
  }
  // sinon l'élément non trouvé = null
  return null;

}

function displayCameraById(camera) {
  // création d"une ligne
  let newDiv = document.createElement("div");
  newDiv.classList.add("row");

  // création d"une liste désordonnée
  let newUl = document.createElement("ul");
  newUl.classList.add("class", "list", "col-10", "col-sm-9", "col-md-7", "col-lg-6", "col-xl-5");

  // création d"une liste
  let newLi = document.createElement("li");
  newLi.classList.add("list__card", "card", "border-secondary", "text-center", "card-body", "text-black", "lead", "mt-5");

  /* Dans la liste : */

  // ajout du titre
  let title = document.createElement("h2");
  title.classList.add("list__title", "card-title", "card-header", "text-uppercase", "text-center", "col-12");
  title.innerHTML = camera.name;

  // de l"image
  let image = document.createElement("img");
  image.src = camera.imageUrl;
  image.classList.add("list__image", "card-img-top");
  image.setAttribute("alt", "appareil photo " + camera.name);

  // du paragraphe descriptif
  let paragraph = document.createElement("p");
  paragraph.classList.add("list__description", "mt-3", "mb-2", "lead");
  paragraph.innerText = camera.description;

  // du prix
  let price = document.createElement("span");
  price.classList.add("list__price", "mb-2", "mx-3");
  price.innerHTML = "Prix : " + camera.price / 100 + ",00€";

  //containerChoice
  let containerChoice = document.createElement("div");
  containerChoice.classList.add("containerChoice", "container-fluid", "d-flex", "flex-wrap", "mb-3")

  // quantité
  let quantity = document.createElement("span");
  quantity.classList.add("quantity", "row-inline", "fw-bold", "fs-6");
  quantity.innerText = "Quantité :"

  let quantityInput = document.createElement("input");
  quantityInput.id = "quantity";
  quantityInput.classList.add("mx-2", "my-2");
  quantityInput.setAttribute("type", "number");
  quantityInput.setAttribute("name", "quantity");
  quantityInput.setAttribute("value", "1");
  quantityInput.setAttribute("min", "1");
  quantityInput.setAttribute("max", "5");

  // options (titre)
  let lensesTitle = document.createElement("span");
  lensesTitle.classList.add("lenses", "d-inline-block", "row-inline", "fw-bold", "fs-6", "sm-mx-2");
  lensesTitle.innerText = "Lentilles :"

  /* options (select & options).
  * Création d"une fonction me permettant dans creer un input select dans lequel je peux lister, grâce à une boucle, les lentilles disponibles pour l"appareil photo selectionné.
  */

  //création des variables nécessaire à la création de la structure du select input et des options
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
      console.log(lenses[i]);
      cameraOption = document.createElement("option");
      cameraOption.setAttribute("value", lenses[i]);//[i] correspond à la valeur récupérée.
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
  btn.classList.add("list__btn", "btn", "add-cart", "mb-1", "col-8", "col-sm-5", "col-md-4", "col-md-5", "center", "text-light");
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

    //affiche le nombre d'article présent dans le localStorage
    console.log(localStorage.length);

    //création fonction pour récupérer un article du localStorage avec pour paramètre id et option de l'article
    let localStorageElt = getLocalStorageEltById(item.id, item.option);

    //permet de saisir l'Id dans lequel sera comptabiliser les articles ajouté au panier
    let compteur = document.getElementById("howManyInBag");

    console.log(localStorageElt); //affiche si l'article selectionné est déja présent ou null
    console.log(compteur.innerHTML); //affiche le nombre d'article au compteur 

    //si null => l'objet correspondant aux données envoyées lors du clic est créé dans le localStorage sous forme de chaine
    if (localStorageElt === null) {
      localStorage.setItem(localStorage.length, JSON.stringify(item));

      //permet d"afficher le nombre d'article ajouté au panier au niveau de la barre de navigation grace au nombre d'éléments comptés dans le localStorage.
      compteur.innerHTML = localStorage.length;
      alert("L'article à bien été ajouté au panier");

    } else {

      //indique dans la console si l'élément existe déja
      console.log(localStorageElt);

      //les valeurs recupérées sont enregistrés dans la variable element.
      let element = JSON.parse(localStorage.getItem(localStorage.key(localStorageElt)));

      // quantité récupéré dans le localStorage 
      console.log(element.quantite);

      // quantité ajouté au clic
      console.log(item.quantite);

      // addition des quantités. parseInt analyse une chaîne et renvoi un entier.
      item.quantite = parseInt(element.quantite) + parseInt(item.quantite);

      //affichage de la quantité dans la console
      console.log(item.quantite);

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
