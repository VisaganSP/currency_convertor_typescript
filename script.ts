function convertCurrency(event: Event) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  // Form validation
  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  // Clear previous result
  document.getElementById("result")!.innerText = "";

  // Getting all the inputs
  const amountElement = document.getElementById("amount") as HTMLInputElement;
  const amount = parseFloat(amountElement.value);

  const fromCurrencyElement = document.getElementById(
    "fromCurrency"
  ) as HTMLSelectElement;
  const fromCurrency = fromCurrencyElement.value;

  const toCurrencyElement = document.getElementById(
    "toCurrency"
  ) as HTMLSelectElement;
  const toCurrency = toCurrencyElement.value;

  // API call to get the exchange rate
  fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.rates[toCurrency];
      const result = (amount * rate).toLocaleString(); // Format result with commas

      document.getElementById(
        "result"
      )!.innerText = `${amount.toLocaleString()} ${fromCurrency} = ${result} ${toCurrency}`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
