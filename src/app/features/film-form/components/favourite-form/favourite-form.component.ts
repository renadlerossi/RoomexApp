import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favourite-form',
  templateUrl: './favourite-form.component.html',
  styleUrls: ['./favourite-form.component.scss']
})
export class FavouriteFormComponent implements OnInit {
  titles = ['Mr.', 'Mrs.', 'Ms.', 'Dr.'];
  countries = ['Ireland', 'UK'];
  testMovies: Film[];
  keyword = 'Title';

  @Output() moviePoster = new EventEmitter<string>();

  public favouriteFilmForm = this.formBuilder.group({
    titleGroup: this.formBuilder.group({
      title: this.titles[0]
    }),
    firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z \u00C0-\u00ff]+')]],
    lastName: [{value: '', disabled: true}, Validators.required],
    username: ['', Validators.minLength(5)],
    favouriteMovie: [''],
    countryGroup: this.formBuilder.group({
      country: [this.countries[0], Validators.required]
    }),
    postCode: ['', [Validators.minLength(6), Validators.maxLength(10)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private filmService: FilmService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    // Last Name custom validation
    this.getFormControl('firstName').valueChanges.subscribe((changes) => {
      const lastNameFormControl = this.getFormControl('lastName');
      if (changes) {
        lastNameFormControl.enable();
      } else {
        lastNameFormControl.setValue(''); // Hard reset value
        lastNameFormControl.disable();
      }
    });

    // Username custom validation
    this.getFormControl('username').valueChanges.subscribe((changes) => {
      const usernameFormControl = this.getFormControl('username');
      if (changes.includes('@')) {
        usernameFormControl.setValidators(Validators.email);
      } else {
        usernameFormControl.setValidators(Validators.minLength(5));
      }
      usernameFormControl.updateValueAndValidity();
    });

    // Country custom validation
    this.getFormControl(['countryGroup', 'country']).valueChanges.subscribe((changes) => {
      const postcodeFormControl = this.getFormControl('postCode');
      console.log(changes);
      if (changes === this.countries[0]) {
        postcodeFormControl.setValidators([Validators.minLength(6), Validators.maxLength(10)]);
        postcodeFormControl.updateValueAndValidity();
      } else {
        postcodeFormControl.setValidators([Validators.required, Validators.pattern('^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$')]);
        postcodeFormControl.updateValueAndValidity();
      }
    });
  }

  getFormControl(formControlName) {
    return this.favouriteFilmForm.get(formControlName);
  }

  selectEvent(item: Film) {
    this.moviePoster.emit(item.Poster);
    this.getFormControl('favouriteMovie').setValue(item.Title);
  }

  onChangeSearch(val: string) {
    // omdbapi works better with more than 3 characters search
    if (val && val.length > 2) {
      this.getFilmTest(val);
    }
  }

  getFilmTest(searchValue: string) {
    this.filmService.getFilmList(searchValue).subscribe((response) => this.testMovies = response.Search);
  }

  submitForm() {
    if (this.favouriteFilmForm.valid) {
      this.filmService.saveFormValue(this.favouriteFilmForm.value);
      this.router.navigate(['thankyou']);
    } else {
      this.toastr.error('Please check form for errors', 'Form Error', {
        timeOut: 3000
      });
    }
  }

}
