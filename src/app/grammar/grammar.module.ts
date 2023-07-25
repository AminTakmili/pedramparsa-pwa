import { BookdetailsComponent } from './bookdetails/bookdetails.component';
import { BooksectionComponent } from './booksection/booksection.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrammarPageRoutingModule } from './grammar-routing.module';

import { GrammarPage } from './grammar.page';
import { SharemoduleModule } from '../sharemodule/sharemodule.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrammarPageRoutingModule,
    SharemoduleModule,
    // PageComponent
  ],
  declarations: [
    GrammarPage,
    BooksectionComponent,
    BookdetailsComponent
    // PageComponent
  ]
})
export class GrammarPageModule {}
