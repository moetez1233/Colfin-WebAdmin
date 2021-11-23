import { Position } from "./position";
import { Notice } from "./notice";
import { Language } from "./language";
import { AccountStatus } from "./account-status";
import { Wallet } from "./wallet";

export class User {
  updated ?: number;
  ag_latitude?: number;
  ag_longitude?: number;
  id?: string;
  activity?: string;
  fullName?:string;
  birthDate?: string;
  cin?: string;
  approved?: number = 0;
  code?: string;
  email?: string;
  image?: string;
  latitude?: number;
  longitude?: number;
  locationImage?: string;
  nif?: string;
  status: AccountStatus = 0;
  balance?: string = "0";
  phoneNumber?: string;
  currentLanguage?: Language = Language.French;
  wallet?: Wallet = new Wallet();
  // metadata?: any;
  lastFetch?: number;
  notice?: Notice;
}
