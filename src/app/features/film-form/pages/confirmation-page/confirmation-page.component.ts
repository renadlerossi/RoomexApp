import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FilmService } from '../../services/film.service';
import { Form } from '../../models/form';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss']
})
export class ConfirmationPageComponent implements OnInit {

  formValues: Form;

  constructor(
    private filmService: FilmService,
    private router: Router) {}

  ngOnInit() {
    this.filmService.formValue$.subscribe((data: Form) => {
      if (data) {
        this.formValues = data;
      } else {
        // Redirects to /enter if there is no form values
        this.router.navigate(['enter']);
      }
    });
  }

}
