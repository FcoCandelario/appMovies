import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from 'src/app/interfaces/interfaces';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@Component({
  selector: 'app-slideshow-pairs',
  templateUrl: './slideshow-pairs.component.html',
  styleUrls: ['./slideshow-pairs.component.scss'],
})
export class SlideshowPairsComponent implements OnInit {

  @Input() movies:Movie[] = [];
  @Output() loadingMore = new EventEmitter;

  slideOptions = {
    slidesPerView: 3.3,
    freeMode:true,
    spaceBetween: -10
  }

  constructor(private modalController : ModalController) { }

  ngOnInit() {}

  onClick(){
    this.loadingMore.emit();
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
