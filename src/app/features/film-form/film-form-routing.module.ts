import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormPageComponent } from './pages/form-page/form-page.component';
import { ConfirmationPageComponent } from './pages/confirmation-page/confirmation-page.component';

const formRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'enter'},
  {path: 'enter', component: FormPageComponent},
  {path: 'thankyou', component: ConfirmationPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(formRoutes)],
  exports: [RouterModule]
})
export class FilmFormRoutingModule { }
