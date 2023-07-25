import { PodcastpageComponent } from './podcastpage/podcastpage.component';
import { PodcastslistComponent } from './podcastslist/podcastslist.component';
import { PodcastsgroupComponent } from './podcastsgroup/podcastsgroup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PodcastsPage } from './podcasts.page';

const routes: Routes = [
  {
    path: '',
    component: PodcastsPage
  },
  {
    path: ':id',
    component: PodcastsgroupComponent
  },
  {
    path: ':id/:videoListId',
    component: PodcastslistComponent
  },
  {
    path: ':id/:videoListId/:podcastId',
    component: PodcastpageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PodcastsPageRoutingModule {}
