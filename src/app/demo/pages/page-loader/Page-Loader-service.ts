import { URLS } from 'src/Constants/Constants';
import { HttpClient } from '@angular/common/http';
import { Service } from 'src/Services/Service';


export class PageLoaderService {

    static async getUserDetails(http: HttpClient, uid: string): Promise<any> {
        let options = await Service.getHeadersWithIdToken();
        let result: any = (await http.post(URLS.getAdminAndRefByUID, { "uid": uid }, options).toPromise());
        return result
    }
}