import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class AccountService {
  athleteParentsUrl = "parent/athlete";
  parentAthletesUrl = "parent";

  constructor(public http: HttpClient) {}

  /**
   * Get parents for the specified athlete user
   */
  getAthleteParents(athId: string) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.athleteParentsUrl}/${athId}`)
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
   * Get athletes for the specified parent user
   */
  getParentAthletes(parentId: string) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.parentAthletesUrl}/${parentId}`)
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
