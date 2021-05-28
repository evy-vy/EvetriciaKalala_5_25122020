/*********************************************Page-3**Le Panier*********************************************/
/*************************Données globales nécessaires à la construction du projet*************************/
let montantPanier = 0;

let compteur = document.getElementById("howManyInBag");
compteur.innerHTML = localStorage.length;

/******Fonction(s) scope globale*******/

//fonction qui permet l'ajout d'une icone delete pour chaque article ajouté au panier
const supprimer = cle => {

  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fas fa-times-circle");
  deleteIcon.classList.add("col-1");
  deleteIcon.dataset.key = cle; //la clé est l'identifiant de l'appareil sur lequel on se trouve dans le localStorage

  return deleteIcon;
}

/*********************************récupération des articles dans le localStorage********************************/

//cette boucle me permettant de récuperer les articles présent dans le localstorage ainsi que l'ensemble des informations lié à chaque article grace à leur clé et de les afficher dans la console
for (let i = 0; i < localStorage.length; i++) {

  const key = localStorage.key(i);
  const itemsInCart = JSON.parse(localStorage.getItem(key));

  //création du tableau recevant les articles
  const tbody = document.createElement("tbody");
  tbody.classList.add("tableBody");

  //création d'une ligne
  const tableRow = document.createElement("tr");
  tableRow.classList.add("allLine");
  tbody.append(tableRow);

  //création de la ligne de données
  const tableData = document.createElement("td");
  tableData.classList.add("imgNamePrice");

  //création d'une div
  const tableDiv = document.createElement("div");
  tableDiv.classList.add("cart-info");
  tableData.append(tableDiv);

  //je stock le retour de ma fonction "supprimer" pour pouvoir la rappeler. i est la clé d'un appareil bouclé dans le localstorage
  const iconSupprimer = supprimer(localStorage.key(i));

  //On écoute le clic sur l'icone supprimer
  iconSupprimer.addEventListener("click", (e) => {
    const key = e.target.dataset.key; //permet de cibler la clé sur laquelle se produit l'évènement
    localStorage.removeItem(key);
    document.location.reload();
  });

  //création de l'image
  const tableImg = document.createElement("img");
  tableImg.setAttribute("src", itemsInCart.url);
  tableImg.classList.add("itemImg");
  tableImg.setAttribute("alt", "appareil photo " + itemsInCart.nom);

  //création d'une div
  const tableDivName = document.createElement("div");
  tableDivName.classList.add("namePrice");


  //création d'un paragraphe contenant le nom de l'objet
  const tableParagraph = document.createElement("p");
  tableParagraph.classList.add("itemName");
  tableParagraph.innerHTML = itemsInCart.nom + "<br><br>";

  const itemOption = document.createElement("small");
  itemOption.classList.add("lense");
  itemOption.innerHTML = "<strong> Lentille : </strong>" + itemsInCart.option;

  //création d'un small contenant le prix de l'objet
  const itemPrice = document.createElement("small");
  itemPrice.classList.add("price");

  //constante qui contient le prix de l'item sélectionné
  const price = itemsInCart.prix / 100;
  itemPrice.innerHTML = "<strong> Prix : </strong> " + price.toFixed(2) + "€";

  tableDivName.append(tableParagraph, itemOption, itemPrice);

  //création de la ligne de données pour l'input
  const tableDataInput = document.createElement("td");
  tableDataInput.classList.add("dataInput");

  //création de l'input quantité
  const quantityField = quantityKey => {
    const quantityInput = document.createElement("input");
    quantityInput.setAttribute("type", "number");
    quantityInput.setAttribute("name", "quantity");
    quantityInput.setAttribute("value", itemsInCart.quantite);
    quantityInput.setAttribute("min", "1");
    quantityInput.setAttribute("max", "100");
    quantityInput.dataset.key = quantityKey; //clé du localeStorage qui permet de retrouver l'appareil sur lequel on se trouve. On l'identifie via sa clé (key) dans le localStorage.
    return quantityInput;
  }

  const quantityChoice = quantityField(i);

  // Ajout d'un écouteur sur quantityInput pour chaque ligne parcouru dans le localStorage
  quantityChoice.addEventListener('change', (e) => {

    //récupère la valeur de l'input
    const newQuantity = e.target.value;

    //récupèration de l'appareil
    /*
    *e.target.dataset.key permet d'identifier l'input sur lequel on clic.
    *key correspond a la clé du localStorage correpondant au produit qu'on modifie
    */
    const appareil = JSON.parse(localStorage.getItem(e.target.dataset.key));

    //modifie la quantité de l'appareil.
    appareil.quantite = newQuantity;

    //met à jour le produit modifié dans le localStorage
    localStorage.setItem(e.target.dataset.key, JSON.stringify(appareil));

    //prix d'un article * sa quantité
    const newTotalLine = appareil.quantite * (appareil.prix / 100);
    dataTotalLigne.innerHTML = newTotalLine.toFixed(2) + '€';

    //calcul du montant total du panier
    let newMontantPanier = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      //permet de récupérer l'objet du localStorage
      const appareil = JSON.parse(localStorage.getItem(key));
      newMontantPanier += (appareil.prix / 100) * appareil.quantite;
    }

    //affichage du montant total du panier dans le html
    totalArea.innerHTML = "<p><strong> Montant total </strong> :  " + newMontantPanier.toFixed(2) + "€</p>";
  })

  //creation d'un td
  const dataTotalLigne = document.createElement("td");
  dataTotalLigne.classList.add("totalLigne");
  itemPrice.classList.add("total");
  const prixLigne = (itemsInCart.prix / 100) * itemsInCart.quantite;
  dataTotalLigne.innerHTML = prixLigne.toFixed(2) + "€";

  // calcul la somme de la ligne
  montantPanier += parseInt(prixLigne);

  // inclus le prix total de panier dans la div cartTotalAmoutDiv
  const totalArea = document.getElementById("cartTotalAmountDiv");
  totalArea.innerHTML = "<p><strong>Montant total </strong> : " + montantPanier.toFixed(2) + "€</p>";

  //inject le code js dans le html 
  document.getElementById("table").append(tbody)
  tableDiv.append(iconSupprimer, tableImg, tableDivName);
  tableRow.append(tableData, tableDataInput, dataTotalLigne);
  tableDataInput.append(quantityChoice);
}

//permet de supprimer le contenu entier du panier
const removeAll = document.getElementById("removeAll");
removeAll.addEventListener("click", (e) => {
  localStorage.clear();
  document.location.reload();
});

/*************************************FORM**********************************/

// récupération du formulaire
const form = document.querySelector("#inscription");

//On écoute les modifications apportées dans l'évenement que l'on cible (input email).
form.email.addEventListener('change', (e) => {

  //je récupère la balise qui me permettra de transmettre un message au client selon que la valeur saisie dans l'evenement cible est bon ou mauvais en fonction du type que l'on attend.
  const element = document.getElementById("emailWarning");
  verifInput(e.target.value, "email", element);
});

form.lastName.addEventListener('change', (e) => {
  const element = document.getElementById("lastNameWarning");
  verifInput(e.target.value, "string", element);
});

form.firstName.addEventListener('change', (e) => {
  const element = document.getElementById("firstNameWarning");
  verifInput(e.target.value, "string", element);
});

form.address.addEventListener('change', (e) => {
  const element = document.getElementById("addressWarning");
  verifInput(e.target.value, "address", element);
});

form.city.addEventListener('change', (e) => {
  const element = document.getElementById("cityWarning");
  verifInput(e.target.value, "string", element);
});

/************************** Validation FORM******************************/

/*fonction qui me permet de vérifier le type de la valeur saisie dans les champs selon que ce soit un email, un string ou une adresse par rapport à la regExp qui lui est attribué. 
* un message est ensuite affichée si la valeur est bonne ou fausse
*/
const verifInput = (value, type, element) => {

  let regExp;

  //on vérifie que les champs soient bien remplis et qu'aucun espace ou tab etc seul ne soit accepté comme valeur valide.
  if (value.trim() === "") {
    element.innerHTML = "Données non valides";
    element.classList.remove("text-success");
    element.classList.add("text-danger");
    return false;
  }
  switch (type) {
    case "email":
      regExp = new RegExp("^[0-9a-zA-Z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}");
      break;
    case "string":
      regExp = new RegExp("^[-'a-zA-ZÀ-ÖØ-öø-ÿ ]+$");
      break;
    case "address":
      regExp = new RegExp("^[-'a-zA-Z0-9À-ÖØ-öø-ÿ ]+$");
      break;
  }

  if (regExp.test(value)) {
    if (element != undefined) {
      element.innerHTML = "Données valides";
      element.classList.remove("text-danger");
      element.classList.add("text-success");
    }
    return true;
  } else {
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
  const fields = [
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
      alert("Pensez à remplir votre panier avant de passer commande !")
    } else {
      sendOrder(form);
      alert("Votre commande à bien été prise en compte !");
    }
  };

  function sendOrder() {
    const order = [];

    //récupère les valeurs entrées dans le formulaire et les formates
    const formData = new FormData(document.getElementById("inscription"));

    //me permet de creer une nouvelle ligne pour chaque clé et valeur du tableau
    formData.forEach(function (value, key) {
      order[key] = value;
    })

    const productsList = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const itemsInCart = JSON.parse(localStorage.getItem(key));
      productsList.push(itemsInCart.id);
    }
    localStorage.setItem("total", document.getElementById("cartTotalAmountDiv").innerHTML);

    const post = {
      "contact": {
        "firstName": order.firstName,
        "lastName": order.lastName,
        "email": order.email,
        "address": order.address,
        "city": order.city
      },
      "products": productsList
    }

    fetch(api("apiUrlPost"), { //info "https://jwdp5.herokuapp.com/api/cameras/order/"
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post)
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("commandeOK", JSON.stringify(data));
        window.location = "confirmation.html";
      })
      .catch(error => {
        alert(error);
      });
  }
};


