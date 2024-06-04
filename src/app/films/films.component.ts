import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Signal,
  WritableSignal,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Observable, debounceTime, fromEvent, map } from 'rxjs';
import { Film } from '../state/films/film.model';
import { Store, select } from '@ngrx/store';
import {
  selectAllFilms,
  selectFilmsError,
} from '../state/films/film.selectors';
import { loadFilms } from '../state/films/films.actions';

@Component({
  selector: 'rxf-films',
  template: `
    <h1>Films component</h1>
    <input
      #searchEl
      [(ngModel)]="searchValue"
      type="text"
      placeholder="Search by movie title..."
    />

    <ng-container *ngIf="error$ | async as error; else filmList">
      <h2>{{ error }}</h2>
    </ng-container>

    <ng-template #filmList>
      <div>
        <ul style="padding: 0px;">
          @for (film of films$ | async; track $index) {
          <li
            [ngStyle]="{
              'text-decoration': 'unset',
              display: 'flex',
              gap: '1em',
              'align-items': 'flex-start',
              'margin-bottom': '1em',
              padding: '.5em',
              border: '1px solid black'
            }"
          >
            <img [src]="film.poster" [alt]="film.title" width="50" />
            <div>
              <div>
                <strong>Title: </strong>
                {{ film.title }}
              </div>
              <div>
                <strong>Type: </strong>
                {{ film.type }}
              </div>
              <div>
                <strong>Year: </strong>
                {{ film.year }}
              </div>
            </div>
          </li>
          }
        </ul>
      </div>
    </ng-template>
  `,
  styles: `
  :host {
    width: 80%;
    display: block;
    margin: auto;
  }
  `,
})
export class FilmsComponent implements OnInit, AfterViewInit {
  films$: Observable<Film[]>;
  error$: Observable<string>;

  searchEl: Signal<ElementRef | undefined> = viewChild('searchEl', {
    read: ElementRef,
  });
  searchValue: WritableSignal<string> = signal('Spider-Man');

  constructor() {
    this.films$ = this._store.pipe(select(selectAllFilms));
    this.error$ = this._store.pipe(select(selectFilmsError));
  }

  private _store: Store = inject(Store);

  ngOnInit(): void {
    this._store.dispatch(loadFilms({ search: this.searchValue() }));
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchEl()?.nativeElement, 'input')
      .pipe(
        map(({ target: { value } }: any) => value.trim()),
        debounceTime(400)
      )
      .subscribe((search) => this._store.dispatch(loadFilms({ search })));
  }
}
