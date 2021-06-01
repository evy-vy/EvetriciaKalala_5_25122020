/****************************Page-4***Confirmation*********************************/

//on récupère le contenu du localStorage, que l'on transforme en objet pour pouvoir le manipuler
let result = JSON.parse(localStorage.getItem("commandeOK"));

//récupération du prix dans le localStorage
let commandeTotal = localStorage.getItem("total");

//Insertion des données dans le html
let greeting = document.getElementById("greeting");
greeting.innerHTML = "Bonjour " + result.contact.firstName + " " + result.contact.lastName + ", " + " Oripix vous remercie pour votre commande."

//intégrer le prix dans le html 
let purchaseId = document.getElementById("purchaseId");
purchaseId.innerHTML = "<span> Commande N° :</span> " + result.orderId;
totalPurchase.innerHTML = commandeTotal

//suppression de toutes les clés présentes dans le localStorage
localStorage.clear();
