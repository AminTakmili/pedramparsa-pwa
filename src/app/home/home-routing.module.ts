import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'grammar',
    loadChildren: () =>
      import('../grammar/grammar.module').then((m) => m.GrammarPageModule),
  },
  {
    path: 'vocabulary',
    loadChildren: () =>
      import('../vocabulary/vocabulary.module').then(
        (m) => m.VocabularyPageModule
      ),
  },
  {
    path: 'readings',
    loadChildren: () =>
      import('../readings/readings.module').then((m) => m.ReadingsPageModule),
  },
  {
    path: 'video',
    loadChildren: () =>
      import('../vidio/vidio.module').then((m) => m.VidioPageModule),
  },
  {
    path: 'exam',
    loadChildren: () =>
      import('../exam/exam.module').then((m) => m.ExamPageModule),
  },
  {
    path: 'textbook',
    loadChildren: () => import('../textbook/textbook.module').then( m => m.TextbookPageModule)
  },
  {
    path: 'my-word',
    loadChildren: () => import('../my-word/my-word.module').then( m => m.MyWordPageModule)
  },
  {
    path: 'podcasts',
    loadChildren: () => import('../podcasts/podcasts.module').then( m => m.PodcastsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
