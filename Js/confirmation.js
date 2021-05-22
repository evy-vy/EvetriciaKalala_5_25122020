

//on le transforme en objet pour pouvoir le manipuler
let result = JSON.parse(localStorage.getItem("commandeOK"));
//récupération du prix dans le localStorage
let commandeTotal = localStorage.getItem("total");

let greeting = document.getElementById("greeting");
greeting.innerHTML = "Bonjour " + result.contact.firstName + " " + result.contact.lastName + ", " + " Oripix vous remercie pour votre commande."

let purchaseId = document.getElementById("purchaseId"); //intégrer le prix dans le html 
purchaseId.innerHTML = "<span> Commande N° :</span> " + result.orderId;
totalPurchase.innerHTML = commandeTotal


localStorage.clear();
