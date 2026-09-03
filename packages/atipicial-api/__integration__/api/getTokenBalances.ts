import { rpc, CONST, wallet } from "@atipicial/atipicial-core";
import * as TestHelpers from "../../../../testHelpers";
import testWalletJson from "../../../atipicial-core/__tests__/testWallet.json";

import { getTokenBalances } from "../../src/api/getTokenBalances";

let client: rpc.AtipicialServerRpcClient;
const address = testWalletJson.accounts[0].address;

beforeAll(async () => {
  const url = await TestHelpers.getIntegrationEnvUrl();
  client = new rpc.AtipicialServerRpcClient(url);
}, 20000);

describe("getTokenBalances", () => {
  test("ATC & GAS (some balance)", async () => {
    const atipicialScriptHash = CONST.NATIVE_CONTRACT_HASH.AtipicialCoin;
    const gasScriptHash = CONST.NATIVE_CONTRACT_HASH.AtipicialDollar;
    const result = await getTokenBalances(
      address,
      [atipicialScriptHash, gasScriptHash],
      client,
    );
    expect(result).toStrictEqual([expect.any(String), expect.any(String)]);
    expect(parseInt(result[0])).toBeGreaterThan(0);
    expect(parseInt(result[1])).toBeGreaterThan(0);
  });

  test("ATC & GAS (empty)", async () => {
    const atipicialScriptHash = CONST.NATIVE_CONTRACT_HASH.AtipicialCoin;
    const gasScriptHash = CONST.NATIVE_CONTRACT_HASH.AtipicialDollar;
    const result = await getTokenBalances(
      new wallet.Account().address,
      [atipicialScriptHash, gasScriptHash],
      client,
    );
    expect(result).toStrictEqual(["0", "0.00000000"]);
  });
});
