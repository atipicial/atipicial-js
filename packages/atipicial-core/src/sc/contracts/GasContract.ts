import { NATIVE_CONTRACT_HASH } from "../../consts";
import { ContractMethodDefinition } from "../manifest";
import { Aep17Contract } from "./Aep17Contract";
import gasAbi from "./templates/GasTemplateAbi.json";

let SINGLETON: GasContract;

export class GasContract extends Aep17Contract {
  public static get INSTANCE(): GasContract {
    if (!SINGLETON) {
      SINGLETON = new GasContract();
    }
    return SINGLETON;
  }

  /**
   * The list of methods found on the GAS contract.
   */
  public static getMethods(): ContractMethodDefinition[] {
    return gasAbi.methods.map((m) => ContractMethodDefinition.fromJson(m));
  }

  constructor() {
    super(NATIVE_CONTRACT_HASH.AtipicialDollar, GasContract.getMethods());
  }
}
