import Account from "./Account";
import { decryptAtipicial2 } from "./aep2";
import { DEFAULT_SCRYPT } from "../consts";

/**
 * Upgrades a Atipicial2 account to a Atipicial account. If an encrypted account is provided, the returned account is also encrypted with the same passphrase.
 */
export async function upgrade(
  account: Account,
  passphrase = "",
  scryptParams = DEFAULT_SCRYPT,
): Promise<Account> {
  // Checks that account is upgradable
  if (!account.tryGet("privateKey") && passphrase === "") {
    throw new Error(`The account needs an unencrypted private key.`);
  }
  // Check if address is atipicial2 style (Starts with A)
  if (!account.address.startsWith("A")) {
    throw new Error(`This is not a atipicial2 Address.`);
  }

  if (passphrase) {
    const wifKey = await decryptAtipicial2(
      account.encrypted,
      passphrase,
      scryptParams,
    );
    const atipicialAccount = new Account(wifKey);
    return await atipicialAccount.encrypt(passphrase, scryptParams);
  }

  const wifKey = account.WIF;
  const atipicialAccount = new Account(wifKey);
  return atipicialAccount;
}
