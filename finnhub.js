const API_KEY = "c4be422ad3i848j2a9ig";
const FINN_BASE_URL = "https://finnhub.io/api/v1";

function fetchJSON(input, options) {
  return fetch(input, options).then((res) => res.json());
}

function fetchFinnhub(endpoint) {
  const tokenSymbol = endpoint.includes("?") ? "&" : "?";
  const url = FINN_BASE_URL + endpoint + tokenSymbol + "token=" + API_KEY;
  return fetchJSON(url);
}

function searchStocks(q) {
  return fetchFinnhub("/search?q=" + q);
}
function quoteStock(sym) {
  return fetchFinnhub("/quote?symbol=" + sym);
}
