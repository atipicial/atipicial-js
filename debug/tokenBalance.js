const Atipicial = require("../packages/atipicial-js/dist/index");
const testKeys = require("../packages/atipicial-core/__tests__/testKeys.json");

const url = "http://test1.atipicial.io:8880";
console.log(Atipicial.aep5);
const printTokenBalances = function (scriptHash) {
  return Atipicial.aep5
    .getToken(url, scriptHash)
    .then(({ symbol }) => {
      console.log(`=== ${symbol} ===`);
    })
    .then(() => {
      const balances = Object.keys(testKeys).map((key) => {
        const addr = testKeys[key].address;
        return Atipicial.aep5
          .getToken(url, scriptHash, addr)
          .then((res) => console.log(`${key}: ${res.balance}`));
      });
      return Promise.all(balances);
    });
};

printTokenBalances(Atipicial.CONST.CONTRACTS.TEST_LWTF)
  .then(() => printTokenBalances(Atipicial.CONST.CONTRACTS.TEST_RPX))
  .then(() => printTokenBalances("ae36e5a84ee861200676627df409b0f6eec44bd7"));
