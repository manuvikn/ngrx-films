import { createReducer, on } from '@ngrx/store';
import { Film } from './film.model';
import { loadFilms, loadFilmsError, loadFilmsSuccess } from './films.actions';

export interface FilmsState {
  films: Array<Film>;
  error: string;
  loading: boolean;
}

export const initialState: FilmsState = {
  films: [],
  error: '',
  loading: false,
};

const _filmsReducer = createReducer(
  initialState,
  on(loadFilms, (state: FilmsState) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(loadFilmsSuccess, (state: FilmsState, { films }) => ({
    ...state,
    films,
    error: '',
    loading: false,
  })),
  on(loadFilmsError, (state: FilmsState, { error }) => ({
    ...state,
    error,
    films: [],
    loading: false,
  }))
);

export function filmsReducer(state: any, action: any) {
  return _filmsReducer(state, action);
}
