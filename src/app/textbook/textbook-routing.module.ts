import { TextbookDetailComponent } from './textbook-detail/textbook-detail.component';
import { TextbookSectionComponent } from './textbook-section/textbook-section.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextbookPage } from './textbook.page';

const routes: Routes = [
  {
    path: '',
    component: TextbookPage
  },
  {
    path: ':bookid',
    component: TextbookSectionComponent
  },
  {
    path: ':bookid/:detailsid',
    component: TextbookDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextbookPageRoutingModule {}
