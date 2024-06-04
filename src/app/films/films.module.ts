import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilmsRoutingModule } from './films.routing.module';
import { FilmsComponent } from './films.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FilmsRoutingModule, FormsModule],
  exports: [],
  declarations: [FilmsComponent],
})
export class FilmsModule {}
