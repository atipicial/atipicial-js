const nodeLedger = require("@ledgerhq/hw-transport-node-hid").default;
const ledger = require("@atipicial/atipicial-ledger").default;
const atipicial = require("@atipicial/atipicial-js");

const atipicialJs = { ...atipicial, ledger };
const addressNumber = 0;

const atipicialscan = new atipicialJs.api.atipicialscan.instance("TestNet");

let ledgerInstance = null;

atipicialJs.ledger
  .getDevicePaths(nodeLedger)
  .then((paths) => {
    console.log("\n\n ---Ledger devices---");
    console.log(paths);
    ledgerInstance = nodeLedger.open(paths[0]);
    return ledgerInstance;
  })
  .then((ledger) => {
    ledgerInstance = ledger;
    const bip = atipicialJs.ledger.BIP44(addressNumber);
    console.log("\n\n ---BIP44 String---");
    console.log(bip);
    return atipicialJs.ledger.getPublicKey(ledger, bip);
  })
  .then((key) => {
    console.log("\n\n ---Public Key---");
    console.log(key);
    return key;
  })
  .then((publicKey) => {
    return atipicialJs.api.sendAsset({
      api: atipicialscan,
      account: new atipicialJs.wallet.Account(publicKey),
      intents: atipicialJs.api.makeIntent(
        { ATC: 1 },
        "ALq7AWrhAueN6mJNqk6FHJjnsEoPRytLdW"
      ),
      signingFunction: async (tx, pubKey) => {
        const sig = await atipicialJs.ledger.getSignature(
          ledgerInstance,
          tx,
          atipicialJs.ledger.BIP44(addressNumber)
        );
        const witness = await atipicialJs.tx.Witness.fromSignature(sig, pubKey);
        return witness.serialize();
      },
    });
  })
  .then((sendAsset) => {
    console.log("\n\n---SendAsset---");
    console.log(sendAsset.response);
  })
  .catch((e) => {
    console.log(e);
  });
