import { VideopageComponent } from './videopage/videopage.component';
import { VideoslistComponent } from './videoslist/videoslist.component';
import { VideosgroupComponent } from './videosgroup/videosgroup.component';
// import { BooksectionComponent } from './../grammar/booksection/booksection.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VidioPage } from './vidio.page';

const routes: Routes = [
  {
    path: '',
    component: VidioPage,
  },
  {
    path: ':id',
    component: VideosgroupComponent
    // component: VidioPage
  },
  {
    path: ':id/:videoListId',
    component: VideoslistComponent
    // component: VidioPage
  }, 
  {
    path: ':id/:videoListId/:videoId',
    component: VideopageComponent
    // component: VidioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VidioPageRoutingModule {}
