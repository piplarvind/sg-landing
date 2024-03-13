import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  makeAPaymentURL = "payments";
  applyCouponURL = "coupon/apply-coupon";
  makeAGusetPaymentURL = "payments/guest";
  subscribeBetaURL = "payments/beta-testing";
  getPaymentHistoriesURL = "payments/user-payment";
  getFailedPaymentHistoriesURL = "payments/user-failed-payment";
  getOnePlanURL = "plans";
  constructor(public http: HttpClient) {}

  makeAPayment(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.makeAPaymentURL, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  applyCoupon(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.applyCouponURL, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  makeAGuestPayment(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.makeAGusetPaymentURL, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  subscribeBeta(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.subscribeBetaURL, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getOnePlanData(planId: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.getOnePlanURL + "/" + planId).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  /**
   * Get Payment History for the specified user
   */
  getPaymentHistories(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.getPaymentHistoriesURL}`, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  /**
   * Get failed Payment History for the specified user
   */
  getFailedPaymentHistories(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.getFailedPaymentHistoriesURL}`, data).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
