import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class PaymentService {
  fetchPlans = "plans/api-subscribtions";

  constructor(public http: HttpClient) {}

  getPlans(data:any) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.fetchPlans, data)
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
