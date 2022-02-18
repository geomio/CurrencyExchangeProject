import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './exchange.js'

function math(usdNum, isoNum) {
  return usdNum * isoNum;
}

$(document).ready(function () {
  $('#userSelectionForm').submit(function (event) {
    event.preventDefault();
    let test = CurrencyExchange.getExchange();
    test.then(function (response) {
      const body = JSON.parse(response)
      console.log(typeof body["conversion_rates"].USD);
      console.log("response ", body["conversion_rates"]);
      const userUsdSelection = $("input[name='usdTotal']").val();
      const isoCode = $("input[name='isoSelect']").val();
      console.log(userUsdSelection);
      console.log(isoCode);
      let userMathNumber = math(userUsdSelection, 10);
      console.log("change me ", userMathNumber);
    }, function (error) {
      console.log(error);
    });
  });
});

