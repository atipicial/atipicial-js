import * as aep17 from "./aep17";
import { SmartContract } from "./contract";
import {
  getSystemFee,
  calculateNetworkFee,
  setBlockExpiry,
  addFees,
  deployContract,
  getContractHash,
} from "./helpers";

const txHelpers = {
  getSystemFee,
  calculateNetworkFee,
  setBlockExpiry,
  addFees,
};

export { aep17, txHelpers, SmartContract, deployContract, getContractHash };
