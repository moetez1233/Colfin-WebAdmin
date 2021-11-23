import { Position } from "./position";
import { Notice } from "./notice";
import { Language } from "./language";
import { AccountStatus } from "./account-status";
import { Wallet } from "./wallet";


/*export class Agree {
  id?: string;
    categorie?: number;
    Lat?: number;
    Long?: number;
    idUser?: string;
    imagefacade?: string;
    contact?: number;
    adresse?:string;
    nip?:string;
    nomfr?:string;
    update?:number
}*/
export class Agree {
  id?: string;
  updated ?: number;
  Lat?: number;
  Long?: number;
  activity?: string;
  locationImage?: string;
  phoneNumber?: string;
  cache?:number;
}

