import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ProfileService {
  uploadImageUrl = "upload-image";
  getProfileUrl = "profiles/api";
  updateProfileUrl = "profiles/update";
  getCountryUrl = "lookup/country";
  getStateUrl = "lookup/state";


  constructor(public http: HttpClient) {}

  getProfile(id: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.getProfileUrl}/${id}`)
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

  updateProfile(data:any) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.updateProfileUrl, data)
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

  getCountryData(id: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.getCountryUrl}/${id}`)
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

  getStateData(id: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.getStateUrl}/${id}`)
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
