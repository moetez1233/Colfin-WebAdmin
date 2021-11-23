export class Demande {
    id?: string;
    idUser?: string;
    created?: number;
    typeDemande?: number;
    parametreDemande?: any;
    updated?: number;
    status?:number;
    traitedBy?:string;
    raison?:string;
    traitedTime?:number;
    constructor() {
        this.id = "";
        this.idUser = "";
        this.created = 0;
        this.typeDemande = 0;
        this.updated = 0;
    }
}
