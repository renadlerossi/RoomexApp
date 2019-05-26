import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { FilmResponse } from '../models/film-response';
import { Form } from '../models/form';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  private apiKey = 'ae85ebef';
  private formStreamSource = new BehaviorSubject(undefined);

  public formValue$ = this.formStreamSource.asObservable();

  constructor(private http: HttpClient) { }

  getFilmList(userInput: string): Observable<FilmResponse> {
    return this.http.get<FilmResponse>('http://www.omdbapi.com/?apikey=' + this.apiKey + '&s=' + userInput);
  }

  saveFormValue(form: Form) {
    this.formStreamSource.next(form);
  }
}
