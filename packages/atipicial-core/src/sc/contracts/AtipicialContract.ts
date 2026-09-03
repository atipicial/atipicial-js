import { NATIVE_CONTRACT_HASH } from "../../consts";
import { BigInteger, HexString } from "../../u";
import { ContractParam } from "../ContractParam";
import { ContractMethodDefinition } from "../manifest";
import { ContractCall } from "../types";
import { Aep17Contract } from "./Aep17Contract";
import atipicialAbi from "./templates/AtipicialTemplateAbi.json";

let SINGLETON: AtipicialContract;

export class AtipicialContract extends Aep17Contract {
  public static get INSTANCE(): AtipicialContract {
    if (!SINGLETON) {
      SINGLETON = new AtipicialContract();
    }
    return SINGLETON;
  }

  /**
   * The list of methods found on the ATC contract.
   */
  public static getMethods(): ContractMethodDefinition[] {
    return atipicialAbi.methods.map((m) => ContractMethodDefinition.fromJson(m));
  }

  constructor() {
    super(NATIVE_CONTRACT_HASH.AtipicialCoin, AtipicialContract.getMethods());
  }

  public unclaimedGas(address: string, end: number | BigInteger): ContractCall {
    return this.call(
      "unclaimedGas",
      ContractParam.hash160(address),
      ContractParam.integer(end),
    );
  }

  public getCandidates(): ContractCall {
    return this.call("getCandidates");
  }

  public getRegisterPrice(): ContractCall {
    return this.call("getRegisterPrice");
  }

  public registerCandidate(publicKey: string | HexString): ContractCall {
    return this.call("registerCandidate", ContractParam.publicKey(publicKey));
  }

  public vote(address: string, voteTo: string | HexString): ContractCall {
    return this.call(
      "vote",
      ContractParam.hash160(address),
      ContractParam.publicKey(voteTo),
    );
  }
}
