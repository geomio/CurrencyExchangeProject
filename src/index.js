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
      console.log("response ", body["conversion_rates"]);
      console.log("will show body item ", body["conversion_rates"].USD);
      const userUsdSelection = $("input[name='usdTotal']").val();
      const isoCode = $("input[name='isoSelect']").val();
      console.log("will show eur ", body["conversion_rates"].EUR);
      console.log(userUsdSelection);
      console.log(isoCode);
      let isoMathNumber = body["conversion_rates"][isoCode];
      console.log("should show conversion number", isoMathNumber);
      let convertedCurrencyNumber = math(userUsdSelection, isoMathNumber);
      console.log("convertLog ", convertedCurrencyNumber);
      $('#usdAmount').show();
      $('#convertAmount').show();
      $('#usdNumberAmount').text(userUsdSelection);
      $('#isoSelectionPrint').text(isoCode);
      $('#isoNumberAmount').text(convertedCurrencyNumber);
    }, function (error) {
      console.log(error);
    });
  });
});

