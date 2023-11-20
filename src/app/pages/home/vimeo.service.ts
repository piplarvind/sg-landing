import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VimeoService {
  private apiUrl = 'https://api.vimeo.com/videos';

  constructor(private http: HttpClient) {}

  getVideoInfo(videoId: string): Observable<any> {
    const headers = {
      Authorization: 'Bearer dded623a2babee6be87f44635ac93b95',
    };
    return this.http.get(`${this.apiUrl}/${videoId}`, { headers });
  }
}
