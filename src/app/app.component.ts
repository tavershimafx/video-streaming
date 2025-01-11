import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from './app.constants';
import { IMovieDetails, IMovieSnapshot } from './app.models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'office-ng-movies';
  movies?: IMovieSnapshot[]
  query?: string
  preLoading: boolean = true;
  range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  showDetails: boolean = false
  detail?: IMovieDetails

  constructor(private httpClient: HttpClient) {
    this.getMovies()
  }

  search(){
    this.getMovies()
  }

  home(){
    this.showDetails = false
    this.detail = undefined
  }
  movieDetails(id: string) {
        this.showDetails = true
    this.preLoading = true
    this.httpClient.get<IMovieDetails>(`${BASE_URL}/details/?imdbId=${id}`).subscribe({
      next: (k: IMovieDetails) => {
       console.log(k)
        this.detail = k
        this.preLoading = false
      },
      error: (x: any) => {

        this.preLoading = true
      }
    })
  }

  private getMovies() {
    this.preLoading = true
    this.httpClient.get<IMovieSnapshot[]>(`${BASE_URL}/get/?q=${this.query}`).subscribe({
      next: (k: IMovieSnapshot[]) => {
        if (k.length > 0){
          this.movies = k
          this.preLoading = false
          return
        }
      },
      error: (x: any) => {

        this.preLoading = true
      }
    })
  }
}
