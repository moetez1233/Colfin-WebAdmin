import { HttpClient } from '@angular/common/http';
import { Service } from 'src/Services/Service';
import { URLS } from 'src/Constants/Constants';

export class AdminListService {
    static async getAdminsAndRefs(http: HttpClient) {
        let options = await Service.getHeadersWithIdToken();
        let result: any = (await http.get(URLS.getAdminsAndRefs, options).toPromise())
        return result;
    }
}