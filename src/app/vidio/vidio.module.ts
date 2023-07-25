import { VideopageComponent } from './videopage/videopage.component';
import { VideoslistComponent } from './videoslist/videoslist.component';
import { GrammarPageModule } from './../grammar/grammar.module';
import { VideosgroupComponent } from './videosgroup/videosgroup.component';
import { BooksectionComponent } from './../grammar/booksection/booksection.component';
import { SharemoduleModule } from './../sharemodule/sharemodule.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VidioPageRoutingModule } from './vidio-routing.module';

import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';

import { VidioPage } from './vidio.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VidioPageRoutingModule,
    SharemoduleModule,
    GrammarPageModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    HttpClientModule,
    
  ],
  declarations: [
    VidioPage,
    VideosgroupComponent,
    VideoslistComponent,
    VideopageComponent,
    // BooksectionComponent 
  ]
})
export class VidioPageModule {}
