export class Transaction {
  amount?: number;
  anonymous?: boolean;
  archived?: boolean;
  created?: number;
  description?: string;
  code?: string = "";
  favourite?: boolean;
  fee?: number;
  id: string;
  latitude?: number = 0;
  longitude?: number = 0;
  metadata?: any;
  operationType?: number;
  rating?: number;
  sender?: string;
  source?: string;
  transactionStatus?: number;
  reason?: number;
  updated?: number;
  user?: string;
}
