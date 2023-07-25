import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { BooksectionComponent } from './booksection/booksection.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrammarPage } from './grammar.page';

const routes: Routes = [
  {
    path: '',
    component: GrammarPage,
  },
  {
    path: ':bookid',
    component: BooksectionComponent,
  },
  {
    path:':bookid/:detailsid',
    component:BookdetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrammarPageRoutingModule {}
