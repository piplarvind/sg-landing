import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class RegisterService {
  private saveRegisterUrl = "onboard/register";

  constructor(public http: HttpClient) {}

  saveUserData(userData: any): Observable<any> {
    return this.http.post(`${this.saveRegisterUrl}`, userData);
  }

}
