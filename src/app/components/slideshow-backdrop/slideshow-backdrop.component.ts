import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movie } from '../../interfaces/interfaces';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() movies:Movie[] = [];
  @Output() load = new EventEmitter<boolean>();

  slideOptions = {
    slidesPerView: 1.1,
    freeMode:true
  }

  constructor(private modadController: ModalController) { }

  ngOnInit() {}

  async showDetailMovie(id:string){
    
    const modal = await this.modadController.create({
      component: MovieDetailComponent,
      componentProps:{
        id
      }
    });

    modal.onDidDismiss().then(data =>{
      this.load.emit(true);
    });

    modal.present();  
  }

}
