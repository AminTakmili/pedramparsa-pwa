import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren : () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'dictionary',
        children: [
          {
            path: '',
            loadChildren: () => import('../dictionary/dictionary.module').then(m => m.DictionaryPageModule)
          }
        ]
      },
      {
        path: 'leitner',
        children: [
          {
            path: '',
            loadChildren: () => import('../leitner/leitner.module').then(m => m.LeitnerPageModule)
          }
        ]
      },
      {
        path: 'shops',
        children: [
          {
            path: '',
            loadChildren: () => import('../shops/shops.module').then(m => m.ShopsPageModule)
          }
        ]
      },
      {
        path: 'more',
        children: [
          {
            path: '',
            loadChildren: () => import('../more/more.module').then(m => m.MorePageModule)
          }
        ]
      },
      
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
