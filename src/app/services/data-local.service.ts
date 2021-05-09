import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DetailMovie } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  movies: DetailMovie[] = [];
  private _storage:  Storage | null = null;


  constructor(private storage: Storage, public toastController: ToastController) { 
    this.init();
    this.loadingFavorites();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async loadingFavorites(){

    const result = await this.storage.get('favorites');
    
    //asignamos el result o un valor vacio si no hay registros.
    this.movies = result || [];
    
    return this.movies;
  }

  saveMovie(detailMovie : DetailMovie){
    
    const exist = this.movies.find(findMovie => findMovie.title === detailMovie.title);
    
    if(!exist){
      this.movies.unshift(detailMovie);
      this.storage.set('favorites',this.movies);
      this.presentToast('Agregado a favoritos');
    }else{
      this.movies = this.movies.filter( movie => movie.id !== detailMovie.id);
      this._storage.set('favorites',this.movies);
      this.presentToast('Se eliminó de favoritos');
    }
  }

  async existsMovie(id){

    await this.loadingFavorites();
    const exist = this.movies.find( movie => movie.id === id);

    //Retorna true o false 
    return (exist) ? true:false;
  }

  async presentToast(message){
    const toast = await this.toastController.create({
      message,
      duration:300
    });

    toast.present();
  }

}
