import { createAction, props } from '@ngrx/store';
import { Film } from './film.model';

export const loadFilms = createAction(
  '[Films] Load films',
  props<{ search: string }>()
);

export const loadFilmsSuccess = createAction(
  '[Films] Load films success',
  props<{ films: Array<Film> }>()
);

export const loadFilmsError = createAction(
  '[Films] Load films error',
  props<{ error: string }>()
);
