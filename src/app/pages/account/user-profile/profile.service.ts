import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ProfileService {
  uploadImageUrl = "upload-image";
  getProfileUrl = "profiles/api";
  updateProfileUrl = "profiles/update";
  getCountryUrl = "lookup/country";
  getStateUrl = "lookup/state";
  getStatusUrl = "lookup/status";
  getHnadedUrl = "lookup/handed";
  getUniformSizeUrl = "uniform-sizes";

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

  getStatusData(id: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.getStatusUrl}/${id}`)
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

  getHandedData(id: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.getHnadedUrl}/${id}`)
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

  getUniformSizeData(id: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${this.getUniformSizeUrl}/${id}`)
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
