import { URLS, Constants } from 'src/Constants/Constants';
import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Administrateur } from 'src/Models/Administrateur';
import { AngularFireAuth } from '@angular/fire/auth';
import { Service } from 'src/Services/Service';
@Injectable()
export class AdminProfileService {
    @Output() static details: EventEmitter<any> = new EventEmitter();

    static async updateAdminProfile(http: HttpClient, admin: Administrateur, uid: string): Promise<any> {
        let options = await Service.getHeadersWithIdToken();
        return (await http.post(URLS.updateAdminProfile, { "admin": admin, "uid": uid }, options).toPromise())
    }

    static async sendResetPassword(AUTH: AngularFireAuth) {
        return await AUTH.auth.sendPasswordResetEmail(Constants.authAdmin.email)
    }

    static updateNameandUrl(name: string, url: string) {
        this.details.emit({ name, url });
    }

    static getAdminDetails() {
        return this.details;
    }

}