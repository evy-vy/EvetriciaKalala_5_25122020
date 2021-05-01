/*************************Données globales nécessaires à la construction du projet*************************/

const apiUrlOriginal = 'http://localhost:3000/api/cameras/'; //url API.
const apiUrlRescue = 'https://jwdp5.herokuapp.com/api/cameras/'; //url de secours.
let cameras = 'cameras'; //Choix du Produit à vendre.
let urlId = ""; // récupération de l'id pour affichage individuel des produits. 

/****************************Page-2**Affichage du produit sélectionné par l'internaute**********************/

//Récupération de l'URL de la page sur laquelle on se trouve + ajout de l'id produit.

function getId() {
  let url = window.location.search;
  let params = new URLSearchParams(url);
  let id = params.get('id');
  console.log(id);
  return id;
}
urlId = getId();

/* 
*  The fetch method, which uses promises, allows to make network requests to retrieve objects from an API.
*  To get the results of promises, I have to return all the fetch.
*/
function selectedUrl(id) {
  return fetch(apiUrlOriginal + id)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      alert(error);
    })
}

//Me permet de récuperer et d'afficher le produit sélectionné selon son id
async function cameraId() {
  let camera = await selectedUrl(urlId);
  displayCameraById(camera);
}
cameraId();

function displayCameraById(camera) {

  //création d'une ligne
  let newDiv = document.createElement('div');
  newDiv.classList.add('row');

  //création d'une liste désordonnée
  let newUl = document.createElement('ul');
  newUl.classList.add('class', 'list', 'col-10', 'col-sm-9', 'col-md-7', 'col-lg-6', 'col-xl-5');

  // création d'une liste
  let newLi = document.createElement('li');
  newLi.classList.add('list__card', 'card', 'border-secondary', 'text-center', 'card-body', 'text-black', 'lead', 'mt-5');

  //// Dans la liste : ////

  // ajout du titre
  let title = document.createElement('h2');
  title.classList.add('list__title', 'card-title', 'card-header', 'text-uppercase', 'text-center', 'col-12', 'mb-3');
  title.innerHTML = camera.name;

  // de l'image
  let image = document.createElement('img');
  image.src = camera.imageUrl;
  image.classList.add('list__image', 'card-img-top');
  image.setAttribute('alt', 'appareil photo ' + camera.name);

  // du paragraphe descriptif
  let paragraph = document.createElement('p');
  paragraph.classList.add('list__description', 'mt-3', 'mb-3', 'lead');
  paragraph.innerText = camera.description;

  //containerChoice
  let containerChoice = document.createElement('div');
  containerChoice.classList.add('containerChoice', 'container-fluid', 'd-flex', 'flex-wrap', 'mb-3')

  // quantité
  let quantity = document.createElement('span');
  quantity.classList.add('quantity', 'row-inline', 'fw-bold', 'fs-5');
  quantity.innerText = 'Quantité :'

  let quantityInput = document.createElement('input');
  quantityInput.id = 'quantity';
  quantityInput.classList.add('mx-2', 'my-2');
  quantityInput.setAttribute('type', 'number');
  quantityInput.setAttribute('name', 'quantity');
  quantityInput.setAttribute('value', '1');
  quantityInput.setAttribute('min', '1');
  quantityInput.setAttribute('max', '5');

  // options (titre)
  let lensesTitle = document.createElement('span');
  lensesTitle.classList.add('lenses', 'd-inline-block', 'row-inline', 'fw-bold', 'fs-5', 'sm-mx-2');
  lensesTitle.innerText = 'Lenses :'

  // options (select & options).
  /* Création d'une fonction me permettant dans creer un input select dans lequel je peux lister, grâce à une boucle, les lentilles disponibles pour l'appareil photo selectionné.
  */

  //création des variables nécessaire à la création de la structure du select input et des options
  let selectOption;
  let cameraOption;
  let lenses = camera.lenses;

  const optionsCamera = () => {
    selectOption = document.createElement('select');
    selectOption.id = 'selectOptions';
    selectOption.setAttribute('name', 'selectOptions');
    selectOption.classList.add('mx-2');

    //pour chaque valeur trouvée dans le array 'lenses' de la camera sélectionnée, une option nouvelle option est créée.
    for (i = 0; i < lenses.length; i++) {
      console.log(lenses[i]);
      cameraOption = document.createElement('option');
      cameraOption.setAttribute('value', lenses[i]);
      cameraOption.classList.add('mx-2', 'my-2');
      cameraOption.innerHTML = lenses[i];
      selectOption.append(cameraOption);
    }
  }

  optionsCamera();

  //création du button 'en savoir plus'
  let btn = document.createElement('button');
  btn.id = 'cardBtn';
  btn.setAttribute('type', 'button');
  btn.classList.add('list__btn', 'btn', 'col-7', 'col-sm-5', 'col-md-4', 'col-md-5', 'center');

  //lien du bouton, vers la page produit
  let link = document.createElement('a');
  link.href = 'panier.html';
  link.classList.add('mb-1', 'text-light');
  link.innerText = 'Ajouter au panier';

  //ajout de chaque élément ci-dessus au html
  newDiv.append(newUl);
  newUl.append(newLi);
  newLi.append(title, image, paragraph, containerChoice, btn);
  containerChoice.append(quantity, lensesTitle);
  quantity.append(quantityInput);
  lensesTitle.append(selectOption);
  btn.append(link);
  document.getElementById('cameraId').append(newDiv);
};
