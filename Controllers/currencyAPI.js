const apiKey = '2f96338704925bd0eb0b3e03'; // Replace with your actual API key
const targetCurrency = 'EGP'; // Egyptian Pound
const apiUrl = `https://open.er-api.com/v6/latest/USD?apikey=${apiKey}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    if (data.result === 'success') {
      const exchangeRate = data.rates[targetCurrency];
      return exchangeRate;
    } else {
      return 1;
    }
  })
  .catch(error => console.error('Error fetching exchange rates:', error));
