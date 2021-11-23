import { HttpClient } from '@angular/common/http';
import { Service } from 'src/Services/Service';
import { URLS } from 'src/Constants/Constants';
import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core'
import { Role } from 'src/Models/Role';
import { Administrateur } from 'src/Models/Administrateur';
@Injectable()
export class RoleService {
    @Output() static fire: EventEmitter<any> = new EventEmitter();
    static async getAllRoles(http: HttpClient) {
        let options = await Service.getHeadersWithIdToken();
        let result: any = (await http.get(URLS.getAllRoles, options).toPromise())
        return result.status ? result.roles : []
    }

    static setAdminRoles(adminRoles: Role[]) {
        this.fire.emit({ "setAdminRoles": true, adminRoles })
    }

    static get() {
        return this.fire
    }

    static resetPage() {
        this.fire.emit({ "resetPage": true })
    }

    static initializeRole(admin: Administrateur) {
        this.fire.emit({ "initRoles": true, admin })
    }
}