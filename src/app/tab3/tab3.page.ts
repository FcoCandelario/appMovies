import { Component } from '@angular/core';
import { DetailMovie, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{

  movies: DetailMovie[] = [];
  genders: Genre[] = [];

  favoriteGenre: any[] = [];

  constructor(private datalocalService: DataLocalService,
              private moviesService: MoviesService,
              ) {}


  ionViewWillEnter(){
    this.loadingMovies();
  }

  async loadingMovies(){
    //Cargamos favoritos
    this.movies = await this.datalocalService.loadingFavorites();
    
    //Cargamos generos
    this.genders = await this.moviesService.getGenders();
    
    //relacionamos las peliculas con los generos
    this.moviesGenders(this.genders,this.movies);

    console.log("ionView");
  }

  moviesGenders(genders: Genre[], movies: DetailMovie[]){
    
    this.favoriteGenre = [];

    genders.forEach(gender =>{

      this.favoriteGenre.push({
        gender:gender.name,
        movies: movies.filter( movieP =>{
          return movieP.genres.find(genre => genre.id === gender.id);
        })
      });

    });
  }

}
