import { URLS } from 'src/Constants/Constants';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Role } from 'src/Models/Role';
import { Administrateur } from 'src/Models/Administrateur';
import { Service } from 'src/Services/Service';


export class AddNewAdminService {

    
    static async createNewAdmin(http: HttpClient, AddForm: FormGroup, roles: Role[]) {
        let options = await Service.getHeadersWithIdToken();
        let email: string = AddForm.value.email;
        let password: string = this.generatePassword();
        let admin: Administrateur = {
            nom: AddForm.value.nom,
            prenom: AddForm.value.prenom,
            phoneNumber: AddForm.value.phoneNumber,
        }
        let result = await http.post(URLS.createNewAdmin, {
            "email": email,
            "password": password,
            "roles": roles,
            "admin": admin,
        }, options).toPromise()
        return result
    }

    private static generatePassword() {
        const allowedCharacters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const charactersLength = allowedCharacters.length;
        const length = 15;
        let password = ""
        for (let i = 0; i < length; i++) {
            let charPos = Math.floor(Math.random() * charactersLength);
            password += allowedCharacters.charAt(charPos);
        }
        return password
    }
}