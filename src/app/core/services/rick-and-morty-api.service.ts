import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import {
  Character,
  DefaultResponse,
  Episode,
  WorldLocation,
} from 'src/app/shared/models/rick-api.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyApiService {
  constructor(private http: HttpClient) {}

  private calculateApiUrl(ids: string[], apiName: string): string {
    return `${environment.apiBaseUrl}api/${apiName}/${ids.join(',')}`;
  }

  getCharactersByPage(page: string): Observable<DefaultResponse<Character>> {
    const url = this.calculateApiUrl([], 'character');
    return this.http.get<DefaultResponse<Character>>(url, { params: { page } });
  }

  getLocationsByIds(ids: string[]): Observable<WorldLocation[]> {
    const url = this.calculateApiUrl(ids, 'location');
    return this.http
      .get<WorldLocation[]>(url)
      .pipe(
        map((response) => (Array.isArray(response) ? response : [response]))
      );
  }

  getEpisodesByIds(ids: string[]): Observable<Episode[]> {
    const url = this.calculateApiUrl(ids, 'episode');
    return this.http
      .get<Episode[] | Episode>(url)
      .pipe(
        map((response) => (Array.isArray(response) ? response : [response]))
      );
  }
}
