import { rpc, CONST } from "@atipicial/atipicial-core";
import * as TestHelpers from "../../../../testHelpers";

import { getTokenInfos, TokenInfo } from "../../src/api/getTokenInfos";

let client: rpc.AtipicialServerRpcClient;

beforeAll(async () => {
  const url = await TestHelpers.getIntegrationEnvUrl();
  client = new rpc.AtipicialServerRpcClient(url);
}, 20000);

describe("getTokenInfos", () => {
  test("ATC & GAS", async () => {
    const atipicialScriptHash = CONST.NATIVE_CONTRACT_HASH.AtipicialCoin;
    const gasScriptHash = CONST.NATIVE_CONTRACT_HASH.AtipicialDollar;
    const result = await getTokenInfos([atipicialScriptHash, gasScriptHash], client);
    expect(result).toStrictEqual([
      {
        symbol: "ATC",
        decimals: 0,
        totalSupply: "100000000",
      } as TokenInfo,
      {
        symbol: "GAS",
        decimals: 8,
        totalSupply: expect.any(String),
      } as TokenInfo,
    ]);

    expect(parseInt(result[1].totalSupply)).toBeGreaterThan(0);
  });
});
