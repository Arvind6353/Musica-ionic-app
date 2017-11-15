import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ActionSheetController
} from "ionic-angular";
import { SocialSharing } from '@ionic-native/social-sharing';

import { MusicProvider } from "../../providers/music/music";
import { MusicPlayerPage } from '../music-player/music-player';

/**
 * Generated class for the MusicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-music",
  templateUrl: "music.html"
})
export class MusicPage {
  allMusic = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public musicProvider: MusicProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    private socialSharing: SocialSharing
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad MusicPage");

    let loading = this.loadingCtrl.create({
      content: "Please wait. Loading Music Contents..."
    });

    loading.present();

    this.musicProvider.getMusicDetails().subscribe(music => {
      this.allMusic = music;
      loading.dismiss();
    });
  }

  doRefresh(refresher) {
    console.log("Begin async operation", refresher);

    this.musicProvider.addOneSong().subscribe(song => {
      this.allMusic.unshift(song[Math.floor(Math.random() * 10 + 1) - 1]);
      refresher.complete();
    });
  }



  addToFavorites(music) {
    this.musicProvider.addToFavorites(music);
  }
  share(music) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Share song with others",
      buttons: [
        {
          text: "Share via Facebook",
          handler: () => {
            console.log("fb share");
            let loading = this.loadingCtrl.create({
              content: "Please wait. Sharing details to Facebook..."
            });
            loading.present();
            this.socialSharing.shareViaFacebook(music.name, music.image, music.music_url).then(()=>{
              loading.dismiss();
            })
          }
        },
        {
          text: "Share via Twitter",
          handler: () => {
            console.log("twitter share");
            let loading = this.loadingCtrl.create({
              content: "Please wait. Sharing details to Twitter..."
            });
            loading.present();
            this.socialSharing.shareViaTwitter(music.name, music.image, music.music_url).then(()=>{
              loading.dismiss();
            })
          }
        },
        {
          text: "Share via Whatsapp",
          handler: () => {
            console.log("whatsapp share");
            let loading = this.loadingCtrl.create({
              content: "Please wait. Sharing details to Whatsapp..."
            });
            loading.present();
            this.socialSharing.shareViaWhatsApp(music.name, music.image, music.music_url).then(()=>{
              loading.dismiss();
            })
          }
        },
        {
          text: "Share",
          handler: () => {
            console.log("general share");
            this.socialSharing.share(music.name,"", music.image, music.music_url)
          }
        },
        {
          text: "Cancel",
          role: "destructive"
        }
      ]
    });
    actionSheet.present();
  }


  listen(music) {
    this.navCtrl.push(MusicPlayerPage, {
      music : music
    });
  }



}
