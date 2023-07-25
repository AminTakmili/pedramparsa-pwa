import { BooksectionreadingComponent } from './Booksectionreading/Booksectionreading.component';
import { BookdetailsreadingComponent } from './bookdetailsreading/bookdetailsreading.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadingsPage } from './readings.page';

const routes: Routes = [
  {
    path: '',
    component: ReadingsPage
  },
  {
    path: ':bookid',
    component: BooksectionreadingComponent,
  }
  ,
  {
    path: ':bookid/:detail',
    component: BookdetailsreadingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadingsPageRoutingModule {}
