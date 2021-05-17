
// let result = JSON.parse(commande); 
let result = JSON.parse(localStorage.getItem("commandeOK"));//on le transforme en objet pour pouvoir le manipuler
console.log("result :", result);
console.log("result :", result.contact.firstName);
console.log("result last :", result.contact.lastName);
console.log("result prod :", result.products.prix);

let greeting = document.getElementById("greeting");
greeting.innerHTML = "Bonjour " + result.contact.firstName + " " + result.contact.lastName + ", " + " Oripix vous remercie pour votre commande."

let purchaseId = document.getElementById("purchaseId"); //intégrer le prix dans le html 
purchaseId.innerHTML = "Commande N° : " + result.orderId;
totalPurchase.innerHTML = "Montant total de la commande: " + parseInt(result.products.prix).toFixed(2) + "€";

// localStorage.clear();
