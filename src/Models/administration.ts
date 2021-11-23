import { Position } from "./position";
import { Notice } from "./notice";
import { Language } from "./language";
import { AccountStatus } from "./account-status";
import { Wallet } from "./wallet";

export class Administration {
    id?: string;
    //idUser?:string;
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
    positionAdm?:Position
  }