import { PodcastpageComponent } from './podcastpage/podcastpage.component';
import { PodcastslistComponent } from './podcastslist/podcastslist.component';
import { PodcastsgroupComponent } from './podcastsgroup/podcastsgroup.component';
import { HttpClientModule } from '@angular/common/http';
import { SharemoduleModule } from './../sharemodule/sharemodule.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PodcastsPageRoutingModule } from './podcasts-routing.module';

import { PodcastsPage } from './podcasts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PodcastsPageRoutingModule,
    SharemoduleModule,
    HttpClientModule
  ],
  declarations: [PodcastsPage,PodcastsgroupComponent,PodcastslistComponent,PodcastpageComponent]
})
export class PodcastsPageModule {}
