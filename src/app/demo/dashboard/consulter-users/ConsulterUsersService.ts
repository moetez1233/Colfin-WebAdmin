import { HttpClient } from '@angular/common/http';
import { Service } from 'src/Services/Service';
import { URLS } from 'src/Constants/Constants';

export class ConsulterUsersService {

    static async getDemandesByUserId(http: HttpClient, idUser: string): Promise<any> {
        let options = await Service.getHeadersWithIdToken();
        let data = { idUser }
        let result: any = (await http.post(URLS.getDemandesByUserId, data, options).toPromise())
        return result;
    }

    static async getUsers(http: HttpClient) {
        let options = await Service.getHeadersWithIdToken();
        let result: any = (await http.get(URLS.getUsers, options).toPromise())
        return result;
    }
    /* ================================   get reclamation ==================================== */
    /* afficher tous les claim  */
 static async getreclamation(http: HttpClient) {
        let options = await Service.getHeadersWithIdToken();
        let result: any = (await http.get(URLS.getClaim, options).toPromise())
        return result;
    }
    /* methode nous donne juste la raclamation distingue par id user  */
    static async getClaimByUserId(http: HttpClient, idUser: string): Promise<any> {
        let options = await Service.getHeadersWithIdToken();
        let data = { idUser }
        let result: any = (await http.post(URLS.getClaimByUserId, data, options).toPromise())
        return result;
    }
   /* methode d'affichage les reclamation par tableau dans tableau (voir fnct dans le back) */
    static async getChaqueClaim(http: HttpClient) {
        let options = await Service.getHeadersWithIdToken();
        let result: any = (await http.get(URLS.getChaqueClaim, options).toPromise())
        return result;
    }


}