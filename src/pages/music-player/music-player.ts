import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Media, MediaObject } from "@ionic-native/media";

/**
 * Generated class for the MusicPlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-music-player",
  templateUrl: "music-player.html"
})
export class MusicPlayerPage {
  music = {};
  songMedia: MediaObject;
  songPaused = false;

  //const file: MediaObject = this.media.create('file.mp3');

  constructor(
    private media: Media,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.music = this.navParams.get("music");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MusicPlayerPage");
  }

  ionViewWillLeave(){
    this.stop();
  }

  play() {
    if (this.songMedia == null) {
      this.songMedia = this.media.create(this.music["music_url"]);
      this.songMedia.play();
    } else {
      if(this.songPaused) {
        this.songMedia.play();
        this.songPaused = false;
      }
    }
  }

  pause() {
    if(this.songMedia != null) {
      this.songMedia.pause();
      this.songPaused = true;
    }
  }

  stop() {
    if (this.songMedia != null) {
      this.songMedia.stop();
      this.songMedia.release();
      this.songMedia = null;
    }
  }
}
