import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MorePage } from './more.page';
import { DetailComponent } from './supports/detail/detail.component';
import { SupportsComponent } from './supports/supports.component';

const routes: Routes = [
  {
    path: '',
    component: MorePage
  },
  {
    path: 'support',
    component: SupportsComponent
  },
  {
    path: 'support/:detailId',
    component: DetailComponent
  },
    
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  }
  // {
  //   path: 'contact',
  //   loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MorePageRoutingModule {}
