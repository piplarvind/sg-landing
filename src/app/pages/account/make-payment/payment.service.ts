import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  makeAPaymentURL = "payments";
  getPaymentHistoriesURL = "payments/user-payment";
  constructor(public http: HttpClient) {}

  makeAPayment(data:any) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.makeAPaymentURL, data)
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

  /**
   * Get payment histories for the specified user
   */
  getPaymentHistories(data:any) {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.getPaymentHistoriesURL}`, data)
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
