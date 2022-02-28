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
  let isoObjectKeys = Object.keys(object)
  isoObjectKeys.forEach(isocode => {
    $("#isoApiCodes").append(`<li>${isocode}</li>`)
  })
}

function isoListener() {
  $("#isoIdHtmlText").on("click", function () {
    $("#useableIso").toggle();
  });
}

$(document).ready(function () {
  $("#start").click(function () {
    $("#startText").hide();
    $("#start").hide();
    let test = CurrencyExchange.getExchange();
    test.then(function (response) {
      const body = JSON.parse(response);
      $("#mainBody").show();
      isoListener();
      outputIsoCodes(body["conversion_rates"]);
      $('#userSelectionForm').submit(function (event) {
        event.preventDefault();
        const userUsdSelection = $("input[name='usdTotal']").val();
        const isoCode = $("input[name='isoSelect']").val().toUpperCase();
        let isoMathNumber = body["conversion_rates"][isoCode];
        let convertedCurrencyNumber = math(userUsdSelection, isoMathNumber);
        $('#usdAmount').show();
        $('#convertAmount').show();
        $('#usdNumberAmount').text(userUsdSelection);
        $('#isoSelectionPrint').text(isoCode);
        if (isNaN(convertedCurrencyNumber)) {
          $('#isoNumberAmount').text("Iso Code Not Recognized Please ReEnter ISO");
        } else {
          $('#isoNumberAmount').text(convertedCurrencyNumber);
        }
      });
    }, function (error) {
      console.log(error);
    });
  });
});

// body["conversion_rates"].USD <-area of api object where iso info is stored change USD To other iso if needing to see other prices