async function getQuotes(symbolsConfig) {
  const updated = {};
  for (const symbolName in symbolsConfig) {
    const quote = await quoteCoin(symbolName);
    const currentCoinEl = document.getElementById("current-coin" + symbolName);
    currentCoinEl.innerHTML = "USD $" + quote.market_data.current_price.usd;
    updated[symbolName] = quote.market_data.current_price.usd;
  }
  return updated;
}

// config
const config = {
  // mock(Datos forzados)
  trackSymbols: {},
  addSymbolToTrack(id, min, max) {
    this.trackSymbols[id] = {
      currentQuote: 0,

      alert: {
        min,
        max,
      },
    };
    this.persistConfig();
  },
  persistConfig() {
    localStorage.setItem("track-config", JSON.stringify(this.trackSymbols));
  },
  loadPersistedConfig() {
    const saved = localStorage.getItem("track-config");
    this.trackSymbols = JSON.parse(saved);
  },
  getTrackSymbols() {
    const trackSymbols = [];
    for (const symbol in this.trackSymbols) {
      trackSymbols.push(symbol);
    }
    return trackSymbols;
  },
  getMax(id) {
    return this.trackSymbols[id].alert.max;
  },
  getMin(id) {
    return this.trackSymbols[id].alert.min;
  },
  getCurrentQuote(id) {
    return this.trackSymbols[id].currentQuote;
  },

  removeSymbolToTrack(symName) {
    delete this.trackSymbols[symName];
    this.persistConfig();
  },
  updateAndCheckQuotes(updatedQuotes) {
    for (const sym in updatedQuotes) {
      const quote = updatedQuotes[sym];
      this.trackSymbols[sym].currentQuote = quote;
      const currentMin = this.trackSymbols[sym].alert.min;
      const currentMax = this.trackSymbols[sym].alert.max;
      if (currentMin <= quote && quote <= currentMax) {
        resetAlert(sym, this.trackSymbols[sym]);
      }
      if (quote > currentMax && currentMax > 0) {
        fireAlert(sym, this.trackSymbols[sym]);
      }
      if (quote < currentMin && currentMin > 0) {
        fireAlert(sym, this.trackSymbols[sym]);
      }
    }
  },
};

function resetAlert(symbol, symbolConfig) {
  document.getElementById("icon-tag").href = "/images/cloud.png";
  document.title = "OK";
  const cardDiv = document.getElementById(symbol);
  const circleIcon = cardDiv.querySelector(".circle");

  if (document.title === "OK") {
    circleIcon.classList.remove("circle-icon-alert");
    circleIcon.classList.add("circle-icon");
  }
}

function fireAlert(symbol, symbolConfig) {
  console.log("FIRE!!!!", symbol, symbolConfig);
  document.getElementById("icon-tag").href = "/images/fire.png";
  document.title = symbol + ":" + symbolConfig.currentQuote;
  const cardDiv = document.getElementById(symbol);
  const circleIcon = cardDiv.querySelector(".circle");
  circleIcon.classList.add("circle-icon-alert");
}

//Functions

function renderResult(id, symbolCoin, result, quote) {
  const trackList = document.querySelector(".track-list");
  //Track DIV
  const trackDiv = document.createElement("div");
  trackDiv.classList.add("track");
  //create li and span
  const newTrackItem = document.createElement("li");
  const newTrackName = document.createElement("li");
  const newTrackQuote = document.createElement("span");

  newTrackItem.innerText = symbolCoin;
  newTrackItem.classList.add("track-item");
  trackDiv.appendChild(newTrackItem);

  newTrackName.innerText = "( 1 " + result + " )";
  newTrackName.classList.add("track-item-name");
  trackDiv.appendChild(newTrackName);

  newTrackQuote.innerHTML = "USD $" + quote;
  newTrackQuote.classList.add("track-item-price");
  trackDiv.appendChild(newTrackQuote);

  const addButton = document.createElement("button");
  addButton.textContent = "Track +";
  addButton.classList.add("add-btn");
  addButton.type = "submit";
  addButton.id = "add-button" + id;
  trackDiv.appendChild(addButton);
  trackList.appendChild(trackDiv);
}

async function searchAndAddCoin() {
  const formEl = document.querySelector(".search-form");
  const inputEl = document.querySelector(".search-form__input");
  const buttonSearchEl = document.querySelector(".search-form__button");
  const trackListEl = document.querySelector(".track-list");
  formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query === "") {
      return;
    }
    const searchResults = await searchCoinStocks(query);
    const arrayResult = searchResults.coins;

    const idArray = arrayResult.map((t) => t.id);
    for (let i = 0; i < idArray.length; i++) {
      const element = idArray[i];
      const respuesta = await quoteCoin(element);
      const imageLogo = respuesta.image.small;
      const symbolCoin = respuesta.symbol.toUpperCase();
      const quote = respuesta.market_data.current_price.usd;
      const nameCoin = respuesta.name;
      renderResult(element, symbolCoin, nameCoin, quote);
      addCoin(element, symbolCoin, quote, imageLogo);
    }

    inputEl.value = "";

    buttonSearchEl.addEventListener("focus", () => {
      trackListEl.innerHTML = "";
    });
    inputEl.addEventListener("focus", () => {
      trackListEl.innerHTML = "";
    });
  });
}
function renderCard(id, symbol, quote, logo) {
  const cardContainer = document.querySelector(".cards-container");
  //Card DIV
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.id = id;

  //Create BUTTON CARD CROSS
  const buttonCross = document.createElement("button");
  buttonCross.innerHTML = '<img src="./images/cross-button.png" alt="" />';
  buttonCross.classList.add("card-cross");
  buttonCross.id = id;
  cardDiv.appendChild(buttonCross);
  // Create circle-icon DIV
  const circleIcon = document.createElement("div");
  circleIcon.classList.add("circle");
  circleIcon.id = id;
  cardDiv.appendChild(circleIcon);

  //Create coin-logo DIV
  const coinLogoDiv = document.createElement("div");
  coinLogoDiv.classList.add("coin-logo-content");
  cardDiv.appendChild(coinLogoDiv);
  const coinTitle = document.createElement("h3");
  coinTitle.innerHTML = symbol;
  coinTitle.classList.add("coin-title");
  coinLogoDiv.appendChild(coinTitle);

  const coinLogo = document.createElement("img");
  coinLogo.classList.add("logo_card");
  coinLogo.src = logo;
  coinLogoDiv.appendChild(coinLogo);

  const coinName = document.createElement("h4");
  coinName.innerHTML = "( 1 " + id + " )";
  coinName.classList.add("coin-name-card");
  cardDiv.appendChild(coinName);

  //Create Current Coin
  const currentCoinEl = document.createElement("h3");
  currentCoinEl.innerHTML = "USD $" + quote;
  currentCoinEl.classList.add("current-coin-card");
  currentCoinEl.id = "current-coin" + id;
  cardDiv.appendChild(currentCoinEl);
  //Add to localStorage

  //Create Input Container DIV
  const inputContainerDiv = document.createElement("div");
  inputContainerDiv.classList.add("input-container");
  cardDiv.appendChild(inputContainerDiv);

  //Create Form Max
  const formMaxEl = document.createElement("form");
  formMaxEl.classList.add("card-max");
  inputContainerDiv.appendChild(formMaxEl);
  const inputMaxEl = document.createElement("input");
  inputMaxEl.type = "text";
  inputMaxEl.placeholder = "Ej. $50000";
  inputMaxEl.classList.add("card-max-input");
  inputMaxEl.id = "max-input" + id;
  formMaxEl.appendChild(inputMaxEl);
  const buttonMaxEl = document.createElement("button");
  buttonMaxEl.innerHTML = '<img src="./images/max-button.png" alt=""  />';
  buttonMaxEl.classList.add("max");
  buttonMaxEl.id = "max-button" + id;
  formMaxEl.appendChild(buttonMaxEl);

  //Create Form Min
  const formMinEl = document.createElement("form");
  formMinEl.classList.add("card-min");
  inputContainerDiv.appendChild(formMinEl);
  const inputMinEl = document.createElement("input");
  inputMinEl.type = "text";
  inputMinEl.placeholder = "Ej. $30000";
  inputMinEl.classList.add("card-min-input");
  inputMinEl.id = "min-input" + id;
  formMinEl.appendChild(inputMinEl);
  const buttonMinEl = document.createElement("button");
  buttonMinEl.innerHTML = '<img src="./images/min-button.png" alt=""  />';
  buttonMinEl.classList.add("min");
  buttonMinEl.id = "min-button" + id;
  formMinEl.appendChild(buttonMinEl);

  cardContainer.appendChild(cardDiv);

  buttonCross.addEventListener("click", (e) => {
    e.preventDefault();
    cardDiv.remove();
    config.removeSymbolToTrack(id);
  });
}
function addCoin(id, symbol, quote, logo) {
  const addButtonEl = document.getElementById("add-button" + id);
  addButtonEl.addEventListener("click", (e) => {
    e.preventDefault();
    renderCard(id, symbol, quote, logo);
    const cardDiv = document.getElementById(id);
    config.addSymbolToTrack(id, 0, 0);
    minAndMaxValues(id);
  });
}
function minAndMaxValues(element) {
  const maxButtonEl = document.getElementById("max-button" + element);
  const minButtonEl = document.getElementById("min-button" + element);

  maxButtonEl.addEventListener("click", (e) => {
    e.preventDefault();
    const maxInputEl = document.getElementById("max-input" + element);
    const maxValueInput = maxInputEl.value;
    const minValue = config.getMin(element);
    config.addSymbolToTrack(element, minValue, maxValueInput);
  });

  minButtonEl.addEventListener("click", (e) => {
    e.preventDefault();
    const minInputEl = document.getElementById("min-input" + element);
    const minValueInput = minInputEl.value;
    const maxValue = config.getMax(element);
    config.addSymbolToTrack(element, minValueInput, maxValue);
  });
}

async function main() {
  config.loadPersistedConfig();
  const idArray = config.getTrackSymbols();
  searchAndAddCoin();
  for (let i = 0; i < idArray.length; i++) {
    const id = idArray[i];
    const respuesta = await quoteCoin(id);
    const imageLogo = respuesta.image.small;
    const symbolCoin = respuesta.symbol.toUpperCase();
    const quote = respuesta.market_data.current_price.usd;
    renderCard(id, symbolCoin, quote, imageLogo);
    minAndMaxValues(id);
  }
  setInterval(async function () {
    const updatedQuotes = await getQuotes(config.trackSymbols);
    config.updateAndCheckQuotes(updatedQuotes);
  }, 30000);
}

main();
