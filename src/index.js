import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './exchange.js';

function math(firstNum, secondNum) {
  return firstNum * secondNum;
}

function outputIsoCodes(object) {
  $("#isoApiCodes").html("");
  let isoObjectKeys = Object.keys(object);
  isoObjectKeys.forEach(isocode => {
    $("#isoApiCodes").append(`<li>${isocode}</li>`);
  });
}

function isoHtmlListener() {
  $("#iso-html-text").on("click", function () {
    $("#useable-iso").toggle();
  });
}

$(document).ready(function () {
  $("#start").click(function () {
    $("#start").hide();
    $("#main-body").show();
    let test = CurrencyExchange.getExchange();
    test.then(function (response) {
      const body = JSON.parse(response);

      isoHtmlListener();
      outputIsoCodes(body["conversion_rates"]);
      $('#user-selection-form').submit(function (event) {
        event.preventDefault();
        const userUsdSelection = $("input[name='usdTotal']").val();
        const isoCode = $("input[name='isoSelect']").val().toUpperCase();
        let isoMathNumber = body["conversion_rates"][isoCode];
        let convertedCurrencyNumber = math(userUsdSelection, isoMathNumber);
        $('#usd-amount').show();
        $('#convert-amount').show();
        $('#usdNumberAmount').text(userUsdSelection);
        $('#isoSelectionPrint').text(isoCode);
        if (isNaN(convertedCurrencyNumber)) {
          $('#isoNumberAmount').text("Iso Code Not Recognized Please ReEnter ISO");
        } else {
          $('#isoNumberAmount').text(convertedCurrencyNumber);
        }
      });
    }, function (error) {
      let messageObject = JSON.parse(error);
      console.log(messageObject);
      $('#error-type').text("Error Type:");
      $('#api-link-error').text("API Docs link:");
      $('#error-message-3').html(messageObject["error-type"]);
      $('#error-message').html(messageObject["documentation"]);
      $('#error-message-2').text("There was an error with api promise");
    });
  });
});
