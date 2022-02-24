// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;// change this later
export default class CurrencyExchange {
  static getExchange() {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response)
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}

// let test = CurrencyExchange.getExchange();
// test.then(function (response) {
//   console.log(response);
// }, function (error) {
//   console.log(error);
// });
