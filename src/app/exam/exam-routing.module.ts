import { ExamtextComponent } from './examtext/examtext.component';
import { ExamtypeComponent } from './examtype/examtype.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamPage } from './exam.page';
import { EmamSectionComponent } from './emam-section/emam-section.component';

const routes: Routes = [
  {
    path: '',
    component: ExamPage
  },
  {
    path: ':bookId',
    component: EmamSectionComponent
  },
  {
    path: ':bookId/:leasonId',
    component: ExamtypeComponent
  },
  {
    path: ':bookId/:leasonId/:examText',
    component: ExamtextComponent
  },
  // {
  //   path: ':id/Hören',
  //   component: ExamtextComponent
  // },
  // {
  //   path: ':id/Sprechen',
  //   component: ExamtextComponent
  // },
  // {
  //   path: ':id/Schreiben',
  //   component: ExamtextComponent
  // },
  // {
  //   path: ':id/Lesen',
  //   component: ExamtextComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamPageRoutingModule {}
