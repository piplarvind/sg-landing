import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { VimeoService } from './vimeo.service';

@Injectable({
  providedIn: 'root',
})
export class FetchThumbnailURLService {
  constructor(private vimeoService: VimeoService) {}

  fetchThumbnailURL(url: string): Observable<string | null> {
    const match = url.match(/\/video\/(\d+)/);
    const videoId = match ? match[1] : null;

    if (!videoId) {
      return new Observable<string | null>((observer) => {
        observer.next(null);
        observer.complete();
      });
    }

    return this.vimeoService.getVideoInfo(videoId).pipe(
      map((data: any) => data.pictures.sizes[2].link),
      catchError((error) => {
        console.error('Error fetching Vimeo video information:', error);
        return new Observable<string | null>((observer) => {
          observer.next(null);
          observer.complete();
        });
      })
    );
  }
}
