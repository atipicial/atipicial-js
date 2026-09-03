const sc = require("@atipicial/atipicial-core").sc;

const nativeContractNames = [
  "AtipicialCoin",
  "AtipicialDollar",
  "PolicyContract",
  "ManagementContract",
  "OracleContract",
  "DesignationContract",
];

console.log(
  nativeContractNames
    .map((name) => `${name} = "${sc.getNativeContractHash(name)}"`)
    .join(",\n")
);
