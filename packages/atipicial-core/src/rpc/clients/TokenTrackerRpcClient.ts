import {
  Query,
  GetAep17BalancesResult,
  GetAep17TransfersResult,
  GetAep11TransfersResult,
  GetAep11BalancesResult,
} from "../Query";
import { RpcDispatcher, RpcDispatcherMixin } from "./RpcDispatcher";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function TokenTrackerRpcMixin<TBase extends RpcDispatcherMixin>(
  base: TBase,
) {
  return class TokenTrackerRpcInterface extends base {
    public async getAep17Transfers(
      accountIdentifier: string,
      startTime?: string,
      endTime?: string,
    ): Promise<GetAep17TransfersResult> {
      return this.execute(
        Query.getAep17Transfers(accountIdentifier, startTime, endTime),
      );
    }
    public async getAep17Balances(
      accountIdentifier: string,
    ): Promise<GetAep17BalancesResult> {
      return this.execute(Query.getAep17Balances(accountIdentifier));
    }

    public async getAep11Transfers(
      accountIdentifier: string,
      startTime?: string,
      endTime?: string,
    ): Promise<GetAep11TransfersResult> {
      return this.execute(
        Query.getAep11Transfers(accountIdentifier, startTime, endTime),
      );
    }

    public async getAep11Balances(
      accountIdentifier: string,
    ): Promise<GetAep11BalancesResult> {
      return this.execute(Query.getAep11Balances(accountIdentifier));
    }
  };
}

export class TokenTrackerRpcClient extends TokenTrackerRpcMixin(RpcDispatcher) {
  public get [Symbol.toStringTag](): string {
    return `TokenTrackerRpcClient(${this.url})`;
  }
}
