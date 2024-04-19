import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetInTouchService {
  private saveInquiryUrl = "inquiries/save";
  
  constructor(private http: HttpClient) { }

  submitInquiry(formData: FormData) {
    return this.http.post<any>(`${this.saveInquiryUrl}`, formData);
  }

}
