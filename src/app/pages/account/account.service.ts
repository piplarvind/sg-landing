import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
// @Injectable()
export class AccountService {
  changePasswordUrl = "dashboard/change-password";
  athleteParentsUrl = "parent/athlete";
  athleteFFFUrl = "parent/fff";
  parentAthletesUrl = "parent";

  constructor(public http: HttpClient) {}

  changePassword(data: any) {
    let headers1 = new HttpHeaders({
      Authorization: localStorage.token,
    });
    console.log('headers1', headers1)
    return new Promise((resolve, reject) => {
      this.http
        .put(`${this.changePasswordUrl}`, data, { headers: headers1 })
        .subscribe(
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
   * Get parents for the specified athlete user
   */
  getAthleteParents(athId: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.athleteParentsUrl}/${athId}`).subscribe(
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
   * Get  Friends Family & Fans for the specified athlete user
   */
getAthleteFFF(athId: string) {
  return new Promise((resolve, reject) => {
    this.http.get(`${this.athleteFFFUrl}/${athId}`).subscribe(
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
   * Get athletes for the specified parent user
   */
  getParentAthletes(parentId: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.parentAthletesUrl}/${parentId}`).subscribe(
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
