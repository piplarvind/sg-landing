import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class LoginService {
  passwordForgot = "forget/";
  resetPassword = "change-password/";

  constructor(public http: HttpClient) {}

  forgotpassword(email: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.passwordForgot, email).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  changePassword(token: string, data: any) {
    return new Promise((resolve, reject) => {
      let resetUrl = this.resetPassword + token;
      this.http.post(resetUrl, data).subscribe(
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
