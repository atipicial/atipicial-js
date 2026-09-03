import { rpc } from "@atipicial/atipicial-core";
import * as TestHelpers from "../../../../testHelpers";

import { getFeeInformation } from "../../src/api/getFeeInformation";

let client: rpc.AtipicialServerRpcClient;
beforeAll(async () => {
  const url = await TestHelpers.getIntegrationEnvUrl();
  client = new rpc.AtipicialServerRpcClient(url);
}, 20000);

describe("getFeeInformation", () => {
  test("success", async () => {
    const result = await getFeeInformation(client);

    expect(Object.keys(result)).toEqual(
      expect.arrayContaining(["feePerByte", "executionFeeFactor"]),
    );
  });
});
