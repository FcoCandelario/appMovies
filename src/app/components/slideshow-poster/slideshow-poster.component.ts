import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from 'src/app/interfaces/interfaces';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';


@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() movies:Movie[] = [];
  @Output() load = new EventEmitter<boolean>();

  slideOptions = {
    slidesPerView: 3.3,
    freeMode:true
  }

  constructor(private modalController : ModalController) { }
  

  ngOnInit() {}

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
