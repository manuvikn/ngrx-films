import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilmsState } from './film.reducer';

export const selectFilmState = createFeatureSelector<FilmsState>('film');

export const selectAllFilms = createSelector(
  selectFilmState,
  (state: FilmsState) => state.films
);

export const selectFilmsError = createSelector(
  selectFilmState,
  (state: FilmsState) => state.error
);
