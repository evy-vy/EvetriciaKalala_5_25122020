/*************************Données globales nécessaires à la construction du projet*************************/
/***********************************************variables*************************************************/
let montantPanier = 0;

/*******************************Page-3**Le Panier*******************************/

//Saisie de l'Id dans lequel sera comptabiliser les articles ajoutés au panier
let compteur = document.getElementById("howManyInBag");
compteur.innerHTML = localStorage.length;


/***************récupération des articles dans le localStorage**************/

//fonction qui permet de 
const supprimer = cle => {
  //ajout d'une icone delete pour chaque article ajouté au panier
  let deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-times-circle");
  deleteIcon.classList.add("col-1");
  deleteIcon.dataset.key = cle; //la clé est l'identifiant de l'appareil sur lequel on se trouve dans le localStorage
  console.log(deleteIcon);
  return deleteIcon;
}

//cette boucle me permettant de récuperer les articles présent dans le localstorage ainsi que l'ensemble des informations lié à chaque article grace à leur clé et de les afficher dans la console
for (let i = 0; i < localStorage.length; i++) {
  console.log(i);

  let key = localStorage.key(i);
  console.log(key, localStorage.getItem(key));
  let itemsInCart = JSON.parse(localStorage.getItem(key));
  console.log('articles :', itemsInCart);

  //création du tableau recevant les articles
  let tbody = document.createElement("tbody");
  tbody.classList.add("tableBody");

  //création d'une ligne
  let tableRow = document.createElement("tr");
  tableRow.classList.add("allLine");
  tbody.append(tableRow);

  //création de la ligne de données
  let tableData = document.createElement("td");
  tableData.classList.add("imgNamePrice");

  //création d'une div
  let tableDiv = document.createElement("div");
  tableDiv.classList.add("cart-info");
  tableData.append(tableDiv);

  //je stock le retour de ma fonction "supprimer" pour pouvoir la rappeler. i est la clé d'un appareil bouclé dans le localstorage
  let iconSupprimer = supprimer(localStorage.key(i));

  //On écoute le clic sur l'icone supprimer
  iconSupprimer.addEventListener("click", (e) => {
    let key = e.target.dataset.key;
    localStorage.removeItem(key);
    document.location.reload();
  });

  //création de l'image
  let tableImg = document.createElement("img");
  tableImg.setAttribute("src", itemsInCart.url);
  tableImg.classList.add("itemImg");
  tableImg.setAttribute("alt", "appareil photo " + itemsInCart.nom);

  //création d'une div
  let tableDivName = document.createElement("div");
  tableDivName.classList.add("namePrice");


  //création d'un paragraphe contenant le nom de l'objet
  let tableParagraph = document.createElement("p");
  tableParagraph.classList.add("itemName");
  tableParagraph.innerHTML = itemsInCart.nom + "<br><br>";

  const itemOption = document.createElement("small");
  itemOption.classList.add("lense");
  itemOption.innerHTML = "<strong> Lentille : </strong>" + itemsInCart.option;

  //création d'un small contenant le prix de l'objet
  let itemPrice = document.createElement("small");
  itemPrice.classList.add("price");

  //variable qui contient le prix de l'item sélectionné
  let price = itemsInCart.prix / 100;
  itemPrice.innerHTML = "<strong> Prix : </strong> " + price.toFixed(2) + "€";


  tableDivName.append(tableParagraph, itemOption, itemPrice);

  //création de la ligne de données pour l'input
  let tableDataInput = document.createElement("td");
  tableDataInput.classList.add("dataInput");

  //création de l'input quantité
  const quantityField = quantityKey => {
    let quantityInput = document.createElement("input");
    // quantityInput.classList.add("quantityInput");
    quantityInput.setAttribute("type", "number");
    quantityInput.setAttribute("name", "quantity");
    quantityInput.setAttribute("value", itemsInCart.quantite);
    quantityInput.setAttribute("min", "1");
    quantityInput.setAttribute("max", "5");
    quantityInput.dataset.key = quantityKey; //clé du localeStorage qui permet de retrouver l'appareil sur lequel on se trouve. On l'identifie via sa clé (key) dans le localStorage.
    console.log(quantityInput);
    return quantityInput;
  }

  let quantityChoice = quantityField(i);

  // // Ajout d'un écouteur sur quantityInput pour chaque ligne parcouru dans le localStorage
  quantityChoice.addEventListener('change', (e) => {
    //si la quantite saisie est inferieur a 1 ou sup à 5 => message d'alerte
    if (e.target.value < 1 || e.target.value > 5) {
      alert("Merci de saisir une quantité comprise entre 1 et 5")
      console.log("non");
      return false
    }

    //permet d'identifier l'input sur lequel on clic
    console.log('change :', e.target.dataset.key); //key correspond a la clé du localStorage correpondant au produit qu'on modifie
    console.log(e.target.value);
    let newQuantity = e.target.value; //récupère la valeur de l'input
    let appareil = JSON.parse(localStorage.getItem(e.target.dataset.key)); //récupèration de l'appareil
    console.log('1 :', appareil);
    appareil.quantite = newQuantity; //modifie la quantité de l'appareil.
    console.log('2 :', appareil);
    localStorage.setItem(e.target.dataset.key, JSON.stringify(appareil)); //enregistre le produit modifié dans le localStorage
    let newTotalLine = appareil.quantite * (appareil.prix / 100);
    dataTotalLigne.innerHTML = newTotalLine.toFixed(2) + '€';
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
    totalArea.innerHTML = "<p><strong> Montant total </strong> :  " + newMontantPanier.toFixed(2) + "€</p>";
  })

  //creation d'un td
  let dataTotalLigne = document.createElement("td");
  dataTotalLigne.classList.add("totalLigne");
  itemPrice.classList.add("total");
  let prixLigne = (itemsInCart.prix / 100) * itemsInCart.quantite;
  dataTotalLigne.innerHTML = prixLigne.toFixed(2) + "€";
  console.log('montantpanier : ', montantPanier);
  console.log('ligne : ', prixLigne);

  // calcul la somme de la ligne
  montantPanier += parseInt(prixLigne);
  console.log('total : ', montantPanier.toFixed(2) + '€');

  // inclus le prix total de panier dans la div cartTotalAmoutDiv
  let totalArea = document.getElementById("cartTotalAmountDiv");
  totalArea.innerHTML = "<p><strong>Montant total </strong> : " + montantPanier.toFixed(2) + "€</p>";

  //inject le code js dans le html 
  document.getElementById("table").append(tbody)
  tableDiv.append(iconSupprimer, tableImg, tableDivName);
  tableRow.append(tableData, tableDataInput, dataTotalLigne);
  tableDataInput.append(quantityChoice);
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
  // console.log(form.email); //test
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



/************************** Validation FORM******************************/

/*fonction qui me permet de vérifier le type de la valeur saisie dans les champs selon que ce soit un email, un string ou une adresse par rapport à la regExp qui lui est attribué. 
* un message est ensuite affichée si la valeur est bonne ou fausse
*/
const verifInput = (value, type, element) => {
  console.log("coucou  :", value);
  console.log("coucou  :", type);
  let regExp;

  //on vérifie que les champs soient bien remplis et qu'aucun espace ou tab etc seul ne soit accepté comme valeur valide.

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
  console.log("regex", regExp);
  console.log("type :", type);
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

//Soumission du formulaire. On met l'écouteur d'évènement directement sur le form et on écoute l'évènement.
form.addEventListener('submit', (e) => {
  e.preventDefault();
  e.stopPropagation();

  checkForSubmit(e.target); //On envoi le form pour récupérer les champs
});

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
      // alert("c'est pas boooon on recommence"); //test
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
    let formData = new FormData(document.getElementById("inscription")); //récupère les valeurs entrées dans le formulaire et les formates
    formData.forEach(function (value, key) { //me permet de creer une nouvelle ligne pour chaque clé et valeur du tableau
      order[key] = value;
    })
    console.log(order);

    let productsList = [];
    for (let i = 0; i < localStorage.length; i++) {
      console.log(i);
      let key = localStorage.key(i);
      console.log(key, localStorage.getItem(key));
      let itemsInCart = JSON.parse(localStorage.getItem(key));
      console.log('articles :', itemsInCart);
      productsList.push(itemsInCart.id);
    }
    localStorage.setItem("total", document.getElementById("cartTotalAmountDiv").innerHTML);

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

    fetch(api("apiUrlPost"), { // ce que j'envoie
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
        alert(error);
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


