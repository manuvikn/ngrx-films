import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Film } from '../../state/films/film.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FilmsService {
  private readonly BASE_URL: string = 'http://www.omdbapi.com/?apikey=';
  private readonly API_KEY: string = '9df570f2';

  private _httpClient: HttpClient = inject(HttpClient);

  getFilmsBySearch(search: string): Observable<Film[]> {
    return this._httpClient
      .get<{ Search: any[]; Error: string }>(
        `${this.BASE_URL}${this.API_KEY}&s=${search}`
      )
      .pipe(
        map<{ Search: any[]; Error: string }, Film[]>(
          ({ Search: list, Error: error }) => {
            if (error) throw new Error(error);

            return list.map(
              ({ Title, Year, imbdID, Type, Poster }) =>
                new Film(Title, Number(Year), Number(imbdID), Type, Poster)
            );
          }
        )
      );
  }
}
