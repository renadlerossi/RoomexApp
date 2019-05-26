import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { FavouriteFormComponent } from './favourite-form.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';

describe('FavouriteFormComponent', () => {
  let component: FavouriteFormComponent;
  let fixture: ComponentFixture<FavouriteFormComponent>;
  let router: Router;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteFormComponent ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AutocompleteLibModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        HttpClient,
        HttpHandler
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(FavouriteFormComponent);
      component = fixture.componentInstance;
      router = TestBed.get(Router);
    });
  }));

  it('form should be invalid without full name', async(() => {
    const firstNameInput = component.favouriteFilmForm.controls.firstName;
    firstNameInput.setValue('');
    firstNameInput.updateValueAndValidity();

    const lastNameInput = component.favouriteFilmForm.controls.lastName;
    lastNameInput.setValue('');
    lastNameInput.updateValueAndValidity();

    expect(component.favouriteFilmForm.valid).toBeFalsy();
  }));

  it('username should be invalid if has less than 5 characters', async(() => {
    const usernameInput = component.favouriteFilmForm.controls.username;
    usernameInput.setValue('666');
    usernameInput.updateValueAndValidity();

    expect(usernameInput.valid).toBeFalsy();
  }));

  it('username should be validated as email if has @', async(() => {
    const usernameInput = component.favouriteFilmForm.controls.username;
    usernameInput.setValue('aaaa@aaa.com');
    usernameInput.updateValueAndValidity();

    expect(usernameInput.valid).toBeTruthy();
  }));

  it('should be invalid if country is set to Ireland and Eircode is not within 6-10 characters long', async (() => {
    const inputCountry = component.favouriteFilmForm.get(['countryGroup', 'country']);
    inputCountry.setValue('Ireland');
    inputCountry.updateValueAndValidity();

    const inputPostCode = component.favouriteFilmForm.controls.postCode;
    inputPostCode.setValue('aaaaa');
    inputPostCode.updateValueAndValidity();

    expect(component.favouriteFilmForm.valid).toBeFalsy();
  }));

  it('should be invalid if country is set to UK but no postcode was provided', async (() => {
    const inputCountry = component.favouriteFilmForm.get(['countryGroup', 'country']);
    inputCountry.setValue('UK');
    inputCountry.updateValueAndValidity();

    const inputPostCode = component.favouriteFilmForm.controls.postCode;
    inputPostCode.setValue('');
    inputPostCode.updateValueAndValidity();

    expect(component.favouriteFilmForm.valid).toBeFalsy();
  }));

});
