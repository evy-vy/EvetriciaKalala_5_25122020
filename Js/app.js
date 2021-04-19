
////////////////////////création de la promesse + requête xml/////////////////////////////
const promiseGetCameras = new Promise((resolve, reject) => {
  let request = new XMLHttpRequest();
  request.open("Get", "https://jwdp5.herokuapp.com/api/cameras", true);
  request.onreadystatechange = function () {
    if (this.readystate == XMLHttpRequest.Done
      && this.status == 200) {
      resolve(JSON.parse(this.responseText));
    } else {
      reject(this.status);
    }
  }
  request.send();
});

////////////////////////////récupération de l'état de la promesse/////////////////////////

promiseGetCameras
  .then((cameras) => {

    ///création d'une carte produit dans le html pour chaque objet récupéré dans l'API///
    const camerasCards = document.getElementById('camerasCards');
    for (camera of cameras) {
      camerasCards.innerHTML +=
        `<div class="row">
            <ul class="col-10 col-sm-8 col-md-7 col-xl-5">
              <li class="card card-body text-white lead mb-5">
                <h5 class=" card-title h4 font-weight-bold text-uppercase">${camera.name}
                </h5>
                <img src="${camera.imageUrl}">
                <p class = "description__text mt-3 mb-4 lead">${camera.description}</p>
                <button id= cardSubmit type="button" class ="btn btn-info btn-lg col-10 col-sm-7 col-lg-5 center">
                  <a href="product.html?id=${camera._id}"class="stretched-link mb-1 text-light">
                    En savoir plus
                  </a>
                </button>
              </li>
            <ul>
          </div>`
    }
  })
promiseGetCameras
  .catch(dataStatus => {
    console.log(dataStatus);
  });
