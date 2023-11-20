import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class HomeService {
  fetchLanding = "landing/";
  fetchSports = "sports/active";
  fetchSetting = "settings/landing";
  contactUrl = "feedback/";

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

  getSettingData() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.fetchSetting)
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

  getSportsData() {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.fetchSports)
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

  submitContactForm(formData) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.contactUrl, formData)
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
