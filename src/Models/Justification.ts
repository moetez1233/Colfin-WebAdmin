import { Constants } from 'src/Constants/Constants';

export class Justification {
    idJus?: string;
    description?: string;
    idAdmin: string;
    interface?: string;
    attribute?: string;
    created?: string;
    fromCollection?: string;
    idObject?: string;

    constructor() {
        let time = new Date().getTime();
        this.idAdmin = Constants.admin.id;
        this.idJus = Constants.admin.id + time
        this.created = time.toString();
    }
}