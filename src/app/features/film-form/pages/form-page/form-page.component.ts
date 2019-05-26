import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-film-form',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {

  moviePoster: string;

  constructor() { }

  ngOnInit() {}

  printPoster(posterUrl: string) {
    this.moviePoster = posterUrl;
  }
}
