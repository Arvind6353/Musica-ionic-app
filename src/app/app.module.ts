import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Media } from '@ionic-native/media';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { MusicProvider } from '../providers/music/music';
import { MusicPage } from '../pages/music/music';
import { MusicPageModule } from '../pages/music/music.module';
import { MusicPlayerPageModule } from '../pages/music-player/music-player.module';
import { MusicPlayerPage } from '../pages/music-player/music-player';
import { FavoritesPageModule } from '../pages/favorites/favorites.module';
import { FavoritesPage } from '../pages/favorites/favorites';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    MusicPageModule,
    FavoritesPageModule,
    MusicPlayerPageModule,
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MusicPage,
    MusicPlayerPage,
    FavoritesPage
  ],
  providers: [
    Media,
    SocialSharing,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MusicProvider
  ]
})
export class AppModule {}
