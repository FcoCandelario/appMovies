import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { MovieDetailComponent } from '../components/movie-detail/movie-detail.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textToSearch = '';
  movies: Movie[] = [];
  shearching= false;
  suggestions: string[] = ['Spiderman','Avengers','El señor de los anillos','La vida es bella'];

  constructor(private moviesService: MoviesService,
              private modalController : ModalController
              ) {}

  searchMovie(event){
    
    const movie = event.detail.value;
    

    if(movie.length === 0){
      this.shearching = false;
      this.movies = [];
      return;
    }

    this.shearching = true;

    this.moviesService.getSearchMovie(this.textToSearch).subscribe(response =>{
      this.movies = response['results'];
      this.shearching = false;
      console.log(response);
    });

  }

  async showDetailMovie(id:string){
    const modal = await this.modalController.create({
      component: MovieDetailComponent,
      componentProps:{
        id
      }
    });

    modal.present();
  }

}
