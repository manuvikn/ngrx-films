import { createReducer, on } from '@ngrx/store';
import { Film } from './film.model';
import { loadFilms, loadFilmsError, loadFilmsSuccess } from './films.actions';

export interface FilmsState {
  films: Array<Film>;
  error: string;
}

export const initialState: FilmsState = {
  films: [],
  error: '',
};

const _filmsReducer = createReducer(
  initialState,
  on(loadFilms, (state: FilmsState) => ({ ...state })),
  on(loadFilmsSuccess, (state: FilmsState, { films }) => ({
    ...state,
    films,
    error: '',
  })),
  on(loadFilmsError, (state: FilmsState, { error }) => ({
    ...state,
    error,
    films: [],
  }))
);

export function filmsReducer(state: any, action: any) {
  return _filmsReducer(state, action);
}
