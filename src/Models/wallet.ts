import { walletTypes } from "./wallet-types";
export class Wallet {
  operationLimit?: number = 1;
  periodLimit?: number = 1;
  transferLimit?: number = 1;
  type: walletTypes;
  withdrawalLimit?: number = 1;
  operation?: number = 1;
  period?: number = 1;
  transfer?: number = 1;
  withdrawal?: number = 1;
  operations?: number = 1;
  periods?: number = 1;
  transfers?: number = 1;
  withdrawals?: number = 1;
}
