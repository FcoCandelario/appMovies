import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseMDB, DetailMovie, MovieCredits, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const APIKEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  genders: Genre[] = [];

  constructor(private http: HttpClient) { }

  private executeQuery<T>(query:string){
      query = URL + query;

      query += `&api_key=${APIKEY}&language=es&include_image_language=es`;
      
      return this.http.get<T>(query);
  }

  getMovies(){

    const toDay = new Date();
    const lastDay = new Date(toDay.getFullYear(),toDay.getMonth()+1,0).getDate();
    const NumberMonth = toDay.getMonth()+1;

    let month;

    if(NumberMonth < 10){
      month = '0'+NumberMonth;
    }else{
      month = NumberMonth
    }

    const start = `${toDay.getFullYear()}-${month}-01`;
    const end = `${toDay.getFullYear()}-${month}-${lastDay}`;


    return this.executeQuery<ResponseMDB>(`/discover/movie?primary_release_date.gte=${start}&primary_release_date.lte=${end}`);
  }

  getMoviesPopular(){

    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;

    return this.executeQuery<ResponseMDB>(query);
  }


  getDetailMovie(id:string){
    return this.executeQuery<DetailMovie>(`/movie/${id}?a=1`);
  }

  getDetailActors(id:string){
    return this.executeQuery<MovieCredits>(`/movie/${id}/credits?a=1`);
  }

  getSearchMovie(movie : string){
    return this.executeQuery((`/search/movie?query=${movie}`));
  }

  getGenders(): Promise<Genre[]>{

    return new Promise(resolve =>{
        this.executeQuery(`/genre/movie/list?a=1`).subscribe(response => {
            this.genders = response['genres'];
            console.log(this.genders);
            resolve(this.genders);
        });
    });
    
  }
}
