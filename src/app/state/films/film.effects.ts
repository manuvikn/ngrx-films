import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FilmsService } from '../../films/services/films.service';
import { loadFilms, loadFilmsError, loadFilmsSuccess } from './films.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class FilmEffects {
  private _actions$: Actions = inject(Actions);
  private _filmsService: FilmsService = inject(FilmsService);

  loadFilms$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadFilms),
      mergeMap(({ search }) =>
        this._filmsService.getFilmsBySearch(search).pipe(
          map((films) => loadFilmsSuccess({ films })),
          catchError(({ message: error }) => of(loadFilmsError({ error })))
        )
      )
    )
  );
}
