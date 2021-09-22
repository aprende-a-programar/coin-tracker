async function getQuotes(symbolsConfig) {
  const updated = {};
  for (const symbolName in symbolsConfig) {
    const quote = await quoteStock(symbolName);
    updated[symbolName] = quote.c;
  }
  return updated;
}

// config
const config = {
  // mock
  trackSymbols: {},
  addSymbolToTrack(symName, min, max) {
    this.trackSymbols[symName] = {
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
  updateAndCheckQuotes(updatedQuotes) {
    resetAlert();
    for (const sym in updatedQuotes) {
      const quote = updatedQuotes[sym];
      this.trackSymbols[sym].currentQuote = quote;
      const currentMin = this.trackSymbols[sym].alert.min;
      const currentMax = this.trackSymbols[sym].alert.max;
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
  document.getElementById("icon-tag").href = "cloud.png";
  document.title = "OK";
}
function fireAlert(symbol, symbolConfig) {
  // console.log("FIRE!!!!", symbol, symbolConfig);
  document.getElementById("icon-tag").href = "fire.png";
  document.title = symbol + ":" + symbolConfig.currentQuote;
}

// async/await
async function main() {
  config.loadPersistedConfig();
  setInterval(async function () {
    const updatedQuotes = await getQuotes(config.trackSymbols);
    config.updateAndCheckQuotes(updatedQuotes);
  }, 2000);
}

main();
