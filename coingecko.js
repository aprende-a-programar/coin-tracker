const COIN_GECKO_BASE_URL = "https://api.coingecko.com/api/v3";

function fetchJSON(input, options) {
  return fetch(input, options).then((res) => res.json());
}

function fetchCoinGecko(endpoint) {
  const url = COIN_GECKO_BASE_URL + endpoint;
  return fetchJSON(url);
}

function searchCoinStocks(q) {
  return fetchCoinGecko("/search?query=" + q);
}

function quoteCoin(id) {
  return fetchCoinGecko("/coins/" + id);
}
