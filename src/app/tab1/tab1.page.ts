import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  movies : Movie[] = [];
  moviesPopular : Movie[] = [];


  constructor(private movieService: MoviesService) {}

  ngOnInit(){
    this.movieService.getMovies().subscribe(response =>{
      //console.log('Response',response);
      this.movies = response.results;
    });

    this.getMoviesPopular();
  }

  loadingMore(){
    this.getMoviesPopular();
  }

  getMoviesPopular(){

    this.movieService.getMoviesPopular().subscribe(response =>{
      //console.log('Populares',response);
      const arrTemp = [...this.moviesPopular,...response.results];
      this.moviesPopular = arrTemp;
    });
  }
}
