/*************************Données globales nécessaires à la construction du projet*************************/
let cameras; //Choix du Produit à vendre.


/*******************************Page-1**Affichage de l"ensemble des produits*******************************/


//permet de saisir l'Id dans lequel sera comptabiliser les articles ajouté au panier
let compteur = document.getElementById("howManyInBag");
compteur.innerHTML = localStorage.length;


/***********************************Récupération des éléments dans l"api***********************************/

/* La méthode fetch, qui utilise des promesses, permet de faire des requêtes réseau pour récupérer des objets à partir d"une API. Pour obtenir le résultat de ma promesse, il faut retourner tout le fetch. Cependant, il retourne une promesse non résolu que l'on recupère dans la fonction suivante*/

function getArticles() {
  return fetch(api("apiUrlRescue"))
    .then(response => {
      return response.json();
    })
    .catch(error => {
      alert(error);
    })
}

/*  
fonction asynchrone qui stock dans la variable "cameras" la fonction precédente qui contient la promesse retournée. 
* Await qui ne peut qu'être exécucté dans des fonctions asynchrone,permet d'attendre les données. d'attendre que la promesse soit résolue.
* On boucle ensuite dans ces données pour récuperer chaque objet présent dans le tableau de donnée renvoyé par l'API. Le résultat est stocké dans la fonction displayArticles.
*/
async function camerasContainer() {
  cameras = await getArticles();
  // console.log(cameras); //test
  for (camera of cameras) {
    displayArticles(camera);
  }
}

//appel de la fonction pour exécuter le corps de la fonction.
camerasContainer();

/*************création de la structure des cartes produit à afficher dans le html (bootstrap).*************/

//Affichage des données stockées dans displayArticle, dans le html récupéré
function displayArticles(camera) {
  // console.log(camera); /*test*/
  //création d'une div
  const newDiv = document.createElement("div");
  newDiv.classList.add("row");

  //création d"une liste désordonnée
  const newUl = document.createElement("ul");
  newUl.classList.add("class", "list", "col-7", "col-sm-6", "col-md-5", "col-xl-4", "ms-sm-3", "ms-xl-5", "mb-3", "mx-2");

  // création d"une liste
  const newLi = document.createElement("li");
  newLi.classList.add("list__card", "card", "text-center", "card-body", "text-light", "lead"/*, "my-5"*/);

  //// Dans la liste : ////

  // ajout du titre
  const title = document.createElement("h2");
  title.classList.add("list__title", "card-title", "card-header", "text-uppercase", "text-center", "col-12", "mb-3");
  title.innerHTML = camera.name;

  // de l'image
  const image = document.createElement("img");
  image.src = camera.imageUrl;
  image.classList.add("list__image", "card-img-top");
  image.setAttribute("alt", "appareil photo " + camera.name);

  // du paragraphe descriptif
  const paragraph = document.createElement("p");
  paragraph.classList.add("list__description", "mt-3", "mb-3", "lead");
  paragraph.innerText = camera.description;

  // lien vers la page produit
  const link = document.createElement("a");
  link.id = "cardBtn";
  link.href = "product.html?id=" + camera._id;
  link.setAttribute("role", "button");
  link.classList.add("list__btn", "btn", "center", "text-light", "mb-1", "col-11", "col-sm-8", "col-md-7", "col-lg-6", "col-xl-5");

  link.innerText = "En savoir plus";

  //ajout de chaque élément ci-dessus au html
  newDiv.append(newUl);
  newUl.append(newLi);
  newLi.append(title, image, paragraph, link);
  document.getElementById("camerasContainer").append(newDiv);
}
/************************************************Fin page-1************************************************/

