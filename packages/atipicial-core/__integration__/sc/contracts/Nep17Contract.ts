import { getIntegrationEnvUrl } from "../../../../../testHelpers";
import { NATIVE_CONTRACT_HASH } from "../../../src/consts";
import { RPCClient } from "../../../src/rpc";
import { Aep17Contract } from "../../../src/sc/contracts/Aep17Contract";
import testWallet from "../../../__tests__/testWallet.json";

let rpcClient: RPCClient;
beforeAll(async () => {
  const url = await getIntegrationEnvUrl();
  rpcClient = new RPCClient(url);
});

describe("Aep17Contract", () => {
  test("totalSupply", async () => {
    const atipicialContract = new Aep17Contract(NATIVE_CONTRACT_HASH.AtipicialCoin);
    const contractCall = atipicialContract.totalSupply();

    const result = await rpcClient.invokeFunction(
      contractCall.scriptHash,
      contractCall.operation,
      contractCall.args,
    );

    expect(result.state).toBe("HALT");
    expect(result.stack).toStrictEqual([
      {
        type: "Integer",
        value: "100000000",
      },
    ]);
  });

  test("symbol", async () => {
    const atipicialContract = new Aep17Contract(NATIVE_CONTRACT_HASH.AtipicialCoin);
    const contractCall = atipicialContract.symbol();

    const result = await rpcClient.invokeFunction(
      contractCall.scriptHash,
      contractCall.operation,
      contractCall.args,
    );

    expect(result.state).toBe("HALT");
    expect(result.stack).toStrictEqual([
      {
        type: "ByteString",
        value: "TkVP",
      },
    ]);
  });

  test("decimals", async () => {
    const atipicialContract = new Aep17Contract(NATIVE_CONTRACT_HASH.AtipicialDollar);
    const contractCall = atipicialContract.decimals();

    const result = await rpcClient.invokeFunction(
      contractCall.scriptHash,
      contractCall.operation,
      contractCall.args,
    );

    expect(result.state).toBe("HALT");
    expect(result.stack).toStrictEqual([
      {
        type: "Integer",
        value: "8",
      },
    ]);
  });

  test("balanceOf", async () => {
    const atipicialContract = new Aep17Contract(NATIVE_CONTRACT_HASH.AtipicialDollar);
    const contractCall = atipicialContract.balanceOf(testWallet.accounts[0].address);

    const result = await rpcClient.invokeFunction(
      contractCall.scriptHash,
      contractCall.operation,
      contractCall.args,
    );

    expect(result.state).toBe("HALT");
    expect(result.stack).toHaveLength(1);

    expect(result.stack[0].type).toBe("Integer");
    expect(parseInt(result.stack[0].value as string)).toBeGreaterThan(0);
  });
});
