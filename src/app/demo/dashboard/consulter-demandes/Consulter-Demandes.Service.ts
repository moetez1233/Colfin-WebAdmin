import { HttpClient } from '@angular/common/http';
import { Service } from 'src/Services/Service';
import { URLS } from 'src/Constants/Constants';
import { Injectable, Output, EventEmitter } from '@angular/core'
import { Demande } from 'src/Models/demande';

@Injectable()
export class ConsulterDemandesServices {
    @Output() static fire: EventEmitter<any> = new EventEmitter();

    static setDemande(demande: Demande, displayDemande: Demande) {
        this.fire.emit({ "demande": demande, "displayDemande": displayDemande });
    }

    static getData() {
        return this.fire
    }

    static async getDemandes(http: HttpClient): Promise<any> {
        let options = await Service.getHeadersWithIdToken();
        let result: any = (await http.get(URLS.getDemandes, options).toPromise())
        return result;
    }
    
    static async confirmeDemande(http: HttpClient, idUser: string, dataUser: any, idDemande: string, dataDemande: any): Promise<any> {
        let options = await Service.getHeadersWithIdToken();
        let result: any = (await http.post(URLS.confirmeDemande, {
            "idUser": idUser,
            "dataUser": dataUser,
            "idDemande": idDemande,
            "dataDemande": dataDemande,
        }, options).toPromise())
        return result;
    }

    static async rejectDemande(http: HttpClient, idUser: string, idDemande: string, dataDemande: any): Promise<any> {
        let options = await Service.getHeadersWithIdToken();
        let result: any = (await http.post(URLS.rejectDemande, {
            "idUser": idUser,
            "idDemande": idDemande,
            "dataDemande": dataDemande,
        }, options).toPromise())
        return result;
    }
}