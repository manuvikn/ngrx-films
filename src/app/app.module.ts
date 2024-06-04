import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { filmsReducer } from './state/films/film.reducer';
import { FilmEffects } from './state/films/film.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FilmsService } from './films/services/films.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ film: filmsReducer }),
    EffectsModule.forRoot([FilmEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  exports: [],
  providers: [FilmsService],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
