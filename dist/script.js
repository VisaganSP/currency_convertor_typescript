"use strict";
function convertCurrency(event) {
    event.preventDefault();
    const form = event.target;
    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
    }
    document.getElementById("result").innerText = "";
    const amountElement = document.getElementById("amount");
    const amount = parseFloat(amountElement.value);
    const fromCurrencyElement = document.getElementById("fromCurrency");
    const fromCurrency = fromCurrencyElement.value;
    const toCurrencyElement = document.getElementById("toCurrency");
    const toCurrency = toCurrencyElement.value;
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then((response) => response.json())
        .then((data) => {
        const rate = data.rates[toCurrency];
        const result = (amount * rate).toLocaleString();
        document.getElementById("result").innerText = `${amount.toLocaleString()} ${fromCurrency} = ${result} ${toCurrency}`;
    })
        .catch((error) => {
        console.error("Error:", error);
    });
}
//# sourceMappingURL=script.js.map