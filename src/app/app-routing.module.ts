import { NotLoginGuardGuard } from './guards/not-login.guard';
import { IsLoginGuard } from './guards/is-login.guard';
import { PrimarysliderComponent } from './sharemodule/primaryslider/primaryslider.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PrimarycardComponent } from './sharemodule/primarycard/primarycard.component';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule),
    canActivate:[IsLoginGuard]

  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate:[IsLoginGuard]

  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate:[NotLoginGuardGuard]


  },  {
    path: 'conjugate-adjective',
    loadChildren: () => import('./conjugate-adjective/conjugate-adjective.module').then( m => m.ConjugateAdjectivePageModule)
  },

  



 


 
  
  // {
  //   path: 'grammar',
  //   loadChildren: () => import('./grammar/grammar.module').then( m => m.GrammarPageModule)
  // },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
