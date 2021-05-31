/***********************Fonction API***********************/

const api = (url) => {
  let apiUrl =
  {
    apiUrlOriginal: "http://localhost:3000/api/cameras/",
    // apiUrlRescue: "https://jwdp5.herokuapp.com/api/cameras/",
    apiUrlPostOriginal: "http://localhost:3000/api/cameras/order/",
    // apiUrlPostRescue: "https://jwdp5.herokuapp.com/api/cameras/order/"
  }

  return apiUrl[url];
}
