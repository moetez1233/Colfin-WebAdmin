import { Role } from './Role';
export class Administrateur {
    nom?: string;
    prenom?: string;
    userName?: string;
    //defaultName?: string;
    id?: string;
    defaultId?: string;
    rolesGroupe?: string[] = [];
    profileImgUrl?: string;
    metadata?: any;
    accountStatut?: number;
    firstSignIn?: number;
    phoneNumber?: string;
    updated?: number;
    created?: number;
    isMaster?: boolean;
}