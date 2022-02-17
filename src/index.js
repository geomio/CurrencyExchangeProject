import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './exchange.js'

async function /*replace a with api call name here*/a() {
}

$(document).ready(function () {
  $('#userSelectionForm').submit(function (event) {
    event.preventDefault();
    let test = CurrencyExchange.getExchange();
    test.then(function (response) {
      const body = JSON.parse(response)
      console.log(typeof body["conversion_rates"].USD);
      console.log("response ", body["conversion_rates"]);
      console.log("test var ", test);
    }, function (error) {
      console.log(error);
    });
  });
});

