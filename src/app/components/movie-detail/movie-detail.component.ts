import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { DetailMovie, Actor } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {

  @Input() id;

  detailMovie: DetailMovie = {};
  actors: Actor[] = [];
  stringTextDetail = 150;
  favoriteExist = 'star-outline';

  slideActorsPoster = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  constructor(private movieService: MoviesService,
              private modalController: ModalController,
              private dataLocal: DataLocalService  
            ) { }

  ngOnInit() {
    //console.log(this.id)

    this.dataLocal.existsMovie(this.id).then(
      exist => this.favoriteExist = (exist) ? 'star' : 'star-outline');

    this.movieService.getDetailMovie(this.id).subscribe(response =>{
      console.log(response);
      this.detailMovie = response;
    });

    this.movieService.getDetailActors(this.id).subscribe(response =>{
      console.log(response);
      this.actors = response.cast;
    });
  }

  returnPage(){
    this.modalController.dismiss();
    this.favoriteExist = '';
  }

  addFavorite(){
    this.dataLocal.saveMovie(this.detailMovie);

    if(this.favoriteExist === 'star-outline'){
      this.favoriteExist = 'star';
    }else if(this.favoriteExist === 'star'){
      this.favoriteExist = 'star-outline';
    }
  }

}
