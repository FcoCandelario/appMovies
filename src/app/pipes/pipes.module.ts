import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { MoviePairsPipe } from './movie-pairs.pipe';
import { FilterImagePipe } from './filter-image.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    MoviePairsPipe,
    FilterImagePipe
  ],
  exports:[
    ImagenPipe,
    MoviePairsPipe,
    FilterImagePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
