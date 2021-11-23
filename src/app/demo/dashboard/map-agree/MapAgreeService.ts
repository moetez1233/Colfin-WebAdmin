import { Service } from 'src/Services/Service';
import { HttpClient } from '@angular/common/http';
import { URLS } from 'src/Constants/Constants';
import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core'
import { Agree } from 'src/Models/Agree';
import{ Administration} from 'src/Models/administration'
@Injectable()
export class MapAgreeService {
    @Output() static fire: EventEmitter<any> = new EventEmitter();

    static async getAgrees(http: HttpClient) {
        let options = await Service.getHeadersWithIdToken();
        let result: any = (await http.get(URLS.getAgrees, options).toPromise())
        return result;
    }

    static clickOnAgree(index, marker) {
        this.fire.emit({ "agreeClicked": true, index, marker })
    }

    static get() {
        return this.fire;
    }

    static setAgree(clickedAgree: Agree, clickedDisplayAgree: Agree) {
        this.fire.emit({ clickedAgree, clickedDisplayAgree })
    }
    /* les administration  */
    static async getAdministrations(http: HttpClient) {
        let options = await Service.getHeadersWithIdToken();
        let result: any = (await http.get(URLS.getAdministration, options).toPromise())
        return result;
    }
    static clickOnAdministration(index, marker) {
        this.fire.emit({ "administrationClicked": true, index, marker })
    }
    static setAdministration(clickedadministration: Administration, clickedDisplayadministration: Administration) {
        this.fire.emit({ clickedadministration, clickedDisplayadministration })
    }
    /* ========================= Function Categories ========================================= */
    static async getCategories(http: HttpClient) {
        let options = await Service.getHeadersWithIdToken();
        let result: any = (await http.get(URLS.getCategories, options).toPromise())
        return result;
    }


}