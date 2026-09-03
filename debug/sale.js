var Atipicial = require("../lib/index");

const contractHash = "ae36e5a84ee861200676627df409b0f6eec44bd7";

const config = {
  net: "TestNet",
  account: new Atipicial.wallet.Account(
    "L2QTooFoDFyRFTxmtiVHt5CfsXfVnexdbENGDkkrrgTTryiLsPMG"
  ),
  intents: Atipicial.api.makeIntent(
    { GAS: 1 },
    Atipicial.wallet.getAddressFromScriptHash(contractHash)
  ),
  script: {
    scriptHash: contractHash,
    operation: "mintTokens",
    args: [],
  },
  gas: 0,
};

Atipicial.api
  .doInvoke(config)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
