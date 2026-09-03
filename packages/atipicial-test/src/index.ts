import { api, rpc } from "@atipicial/atipicial-js";

const RPC_URL = "https://seed1.atipicial.com:20332";

const rpcClient = new rpc.RPCClient(RPC_URL);
console.log("Atipicial Weather Report");

rpcClient
  .getBlockCount()
  .then((currentHeight) => console.log(`Blockchain height: ${currentHeight}`))
  .then(() => api.getFeeInformation(rpcClient))
  .then((feeInfo) =>
    console.log(
      `Current fees: ${feeInfo.feePerByte} per byte, ${feeInfo.executionFeeFactor} multipler`,
    ),
  );
