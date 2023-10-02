import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class HomeService {
  fetchLanding = "landing/";

  constructor(public http: HttpClient) {}

  getLandingData() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.fetchLanding)
        .subscribe(
          (res: any) => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  
}
