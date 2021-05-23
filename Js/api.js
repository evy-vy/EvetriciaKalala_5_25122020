const api = (url) => {
  // console.log(url);
  let apiUrl =
  {
    apiUrlOriginal: "http://localhost:3000/api/cameras/",
    apiUrlRescue: "https://jwdp5.herokuapp.com/api/cameras/",
    apiUrlPostOriginal: "http://localhost:3000/api/cameras/order/",
    apiUrlPost: "https://jwdp5.herokuapp.com/api/cameras/order/"
  }

  return apiUrl[url];
}

let test = api('apiUrlOriginal');
console.log(test);