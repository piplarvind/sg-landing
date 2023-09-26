import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class HomeService {
  
  constructor(public http: HttpClient) {}

 
}
