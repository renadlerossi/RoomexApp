import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormPageComponent } from './pages/form-page/form-page.component';
import { ConfirmationPageComponent } from './pages/confirmation-page/confirmation-page.component';
import { FilmFormRoutingModule } from './film-form-routing.module';
import { FavouriteFormComponent } from './components/favourite-form/favourite-form.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FilmService } from './services/film.service';

@NgModule({
  declarations: [
    FormPageComponent,
    ConfirmationPageComponent,
    FavouriteFormComponent
  ],
  imports: [
    CommonModule,
    FilmFormRoutingModule,
    ReactiveFormsModule,
    AutocompleteLibModule
  ],
  exports: [
    FormPageComponent
  ],
  providers: [
    FilmService
  ]
})
export class FilmFormModule { }
