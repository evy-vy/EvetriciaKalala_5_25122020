////////////////////////création de la promesse ////////////////
const promiseGetCameras = new Promise((resolve, reject) => {
  let request = new XMLHttpRequest();
  let url = window.location.search;
  let params = new URLSearchParams(url);
  let id = params.get('id');
  console.log(id);
  request.open("Get", `https://jwdp5.herokuapp.com/api/cameras/${id}`)
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
  .then((camera) => {
    console.log(camera);
    let elementCamera = document.getElementById('cameraId');
    elementCamera.innerHTML +=
      `<div class="row">
        <ul class="col-12 col-md-7 col-xl-6">
          <li class="card card-body text-white lead mt-3">
            <h5 class=" card-title h4 font-weight-bold text-uppercase">${camera.name}
            </h5>
            <img src="${camera.imageUrl}">
            <p class = "description__text mt-3 mb-4 lead">${camera.description}</p>
            <span class="price text-dark lead font-weight-bold mb-4">
              <strong><u>Prix : ${camera.price / 100} €</u><strong>
            </span>
            <form>
              <div class="form-row align-items-center">
                <div class="col-auto my-1">
                  <h5>Quantité
                  <input type="number name="howMuch" step="1" value="1" min="1" max="5" class="ml-1 col-2"></input>
                  </h5>
                  <h5>Lenses
                  <select class="custom-select mr-sm-2 ml-3 col-5" id="choixDesLentilles">
                    <option value="1">${camera.lenses[0]}</option>
                    // <option value="2">${camera.lenses[1]}</option>
                  </select>
                </h5>
                </div>
              </div>
            </form>
            <button id= addToCart type="button" class ="btn btn-info btn-lg">
              <a href="product.html?id=${camera._id}" mb-1 text-light">
                Ajouter au panier
              </a>
            </button>
          </li>
        <ul>
      </div>`
  })
promiseGetCameras
  .catch(dataStatus => {
    console.log(dataStatus);
  });