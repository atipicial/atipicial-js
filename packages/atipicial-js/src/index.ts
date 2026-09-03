import * as api from "@atipicial/atipicial-api";
import * as atipicialCore from "@atipicial/atipicial-core";
import * as experimental from "./experimental";

const { sc, rpc, wallet, CONST, u, tx, logging } = atipicialCore;

/**
 * Semantic path for creation of a resource.
 */
const create = {
  account: (k: string): atipicialCore.wallet.Account => new wallet.Account(k),
  privateKey: wallet.generatePrivateKey,
  signature: wallet.generateSignature,
  wallet: (k: atipicialCore.wallet.WalletJSON): atipicialCore.wallet.Wallet =>
    new wallet.Wallet(k),
  contractParam: (
    type: keyof typeof sc.ContractParamType,
    value?:
      | string
      | number
      | boolean
      | atipicialCore.sc.ContractParamJson[]
      | null
      | undefined,
  ): atipicialCore.sc.ContractParam => sc.ContractParam.fromJson({ type, value }),
  script: sc.createScript,
  scriptBuilder: (): atipicialCore.sc.ScriptBuilder => new sc.ScriptBuilder(),
  rpcClient: (net: string): atipicialCore.rpc.RPCClient => new rpc.RPCClient(net),
  query: (
    req: atipicialCore.rpc.QueryLike<unknown[]>,
  ): atipicialCore.rpc.Query<unknown[], unknown> => new rpc.Query(req),
  network: (net: Partial<atipicialCore.rpc.NetworkJSON>): atipicialCore.rpc.Network =>
    new rpc.Network(net),
  stringStream: (str?: string): atipicialCore.u.StringStream =>
    new u.StringStream(str),
};

/**
 * Semantic path for verification of a type.
 */
const is = {
  address: wallet.isAddress,
  publicKey: wallet.isPublicKey,
  encryptedKey: wallet.isAEP2,
  privateKey: wallet.isPrivateKey,
  wif: wallet.isWIF,
  scriptHash: wallet.isScriptHash,
};

/**
 * Semantic path for deserialization of object.
 */
const deserialize = {
  attribute: tx.TransactionAttribute.deserialize,
  script: tx.Witness.deserialize,
  tx: tx.Transaction.deserialize,
};

/**
 * Semantic path for signing using private key.
 */
const sign = {
  hex: wallet.sign,
  message: (msg: string, privateKey: string): string => {
    const hex = u.str2hexstring(msg);
    return wallet.sign(hex, privateKey);
  },
};

/**
 * Semantic path for verifying signatures using public key.
 */
const verify = {
  hex: wallet.verify,
  message: (msg: string, sig: string, publicKey: string): boolean => {
    const hex = u.str2hexstring(msg);
    return wallet.verify(hex, sig, publicKey);
  },
};

export default {
  create,
  deserialize,
  is,
  sign,
  verify,
  encrypt: {
    privateKey: wallet.encrypt,
  },
  decrypt: {
    privateKey: wallet.decrypt,
  },
  u,
  CONST,
  experimental,
};

export { experimental, api, sc, rpc, wallet, CONST, u, tx, logging };
