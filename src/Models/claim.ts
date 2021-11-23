import { Position } from "./position";
import { Notice } from "./notice";
import { Language } from "./language";
import { AccountStatus } from "./account-status";
import { Wallet } from "./wallet";
import{Tag} from  "./tags"

export class Claim {
    idUser?: string;
    idAdministration?: string;
    created?:number;
    satisfaction?:number;
    status?: number;
    position?:Position;
    updated?:number
    tags?:Tag[];
    urlImage?:string;
    
  }