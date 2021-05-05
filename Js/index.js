/*************************Données globales nécessaires à la construction du projet*************************/

const apiUrlOriginal = "http://localhost:3000/api/cameras/"; //url API.
const apiUrlRescue = "https://jwdp5.herokuapp.com/api/cameras/"; //url de secours.
let cameras = "cameras"; //Choix du Produit à vendre.

/*******************************Page-1**Affichage de l"enssemble des produits*******************************/
/***********************************Récupération des éléments dans l"api***********************************/

/* La méthode fetch, qui utilise des promesses, permet de faire des requête réseau pour récupérer des objets à partir d"une API. Pour obtenir le résultat de ma promesse, il faut retourner tout le fetch. */

function getArticles() {
  return fetch(apiUrlOriginal)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      alert(error);
    })
}

/* Boucle pour récuperer chaque caméra du tableau cameras présent dans l"Api. Le résultat est stocké dans la fonction displayArticles. */

async function camerasContainer() {
  cameras = await getArticles();
  for (camera of cameras) {
    displayArticles(camera);
  }
}

//appel de la fonction pour afficher les caméras dans la console
camerasContainer();

/*************création de la structure des cartes produit à afficher dans le html (bootstrap).*************/

//Affichage des données stockées dans displayArticle, dans le html récupéré
function displayArticles(camera) {

  //création d"une ligne
  let newDiv = document.createElement("div");
  newDiv.classList.add("row");

  //création d"une liste désordonnée
  let newUl = document.createElement("ul");
  newUl.classList.add("class", "list", "col-10", "col-sm-8", "col-md-7", "col-lg-4", "col-xl-5");

  // création d"une liste
  let newLi = document.createElement("li");
  newLi.classList.add("list__card", "card", "border-secondary", "text-center", "card-body", "text-black", "lead", "my-5");

  //// Dans la liste : ////

  // ajout du titre
  let title = document.createElement("h2");
  title.classList.add("list__title", "card-title", "card-header", "text-uppercase", "text-center", "col-12", "mb-3");
  title.innerHTML = camera.name;

  // de l"image
  let image = document.createElement("img");
  image.src = camera.imageUrl;
  image.classList.add("list__image", "card-img-top");
  image.setAttribute("alt", "appareil photo " + camera.name);

  // du paragraphe descriptif
  let paragraph = document.createElement("p");
  paragraph.classList.add("list__description", "mt-3", "mb-3", "lead");
  paragraph.innerText = camera.description;

  // du button "en savoir plus"
  let btn = document.createElement("button");
  btn.id = "cardBtn";
  btn.setAttribute("type", "button");
  btn.classList.add("list__btn", "btn", "col-7", "col-sm-5", "col-md-4", "col-md-5", "center");

  // lien du bouton, vers la page produit
  let link = document.createElement("a");
  link.href = "product.html?id=" + camera._id;
  link.classList.add("mb-1", "text-light");
  link.innerText = "En savoir plus";

  //ajout de chaque élément ci-dessus au html
  newDiv.append(newUl);
  newUl.append(newLi);
  newLi.append(title, image, paragraph, btn);
  btn.append(link);
  document.getElementById("camerasContainer").append(newDiv);
}
/************************************************Fin page-1************************************************/

