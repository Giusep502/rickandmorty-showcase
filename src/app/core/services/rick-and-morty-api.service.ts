import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {
  Character,
  DefaultResponse,
  Episode,
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

  getCharacters(info: {
    page?: string;
    ids?: string[];
  }): Observable<DefaultResponse<Character>> {
    const url = this.calculateApiUrl(info.ids || [], 'character');
    const params = !!info.page ? { page: info.page } : undefined;
    return this.http.get<DefaultResponse<Character>>(url, { params });
  }

  getLocations(info: {
    page?: string;
    ids?: string[];
  }): Observable<DefaultResponse<Location>> {
    const url = this.calculateApiUrl(info.ids || [], 'location');
    const params = !!info.page ? { page: info.page } : undefined;
    return this.http.get<DefaultResponse<Location>>(url, { params });
  }

  getEpisodes(info: {
    page?: string;
    ids?: string[];
  }): Observable<DefaultResponse<Episode>> {
    const url = this.calculateApiUrl(info.ids || [], 'episode');
    const params = !!info.page ? { page: info.page } : undefined;
    return this.http.get<DefaultResponse<Episode>>(url, { params });
  }
}
