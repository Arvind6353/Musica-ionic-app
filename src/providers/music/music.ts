import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
/*
  Generated class for the MusicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const API: string = "https://orangevalleycaa.org/api/music";
@Injectable()
export class MusicProvider {
  favorites = [];

  constructor(public http: Http) {
    console.log("Hello MusicProvider Provider");
  }

  getMusicDetails() {
    return this.http.get(API).map(res => res.json());
  }

  addOneSong() {
    let oneSongUrl = API;
    return this.http.get(oneSongUrl).map(res => res.json());
  }

  addToFavorites(music) {
    var index = this.favorites.findIndex(fav => fav.id == music.id);
    if (index == -1) {
      this.favorites.push(music);
    }
  }

  getFavorites() {
    return this.favorites;
  }
}
