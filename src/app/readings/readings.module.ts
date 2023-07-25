import { BooksectionreadingComponent } from './Booksectionreading/Booksectionreading.component';
import { SharemoduleModule } from './../sharemodule/sharemodule.module';
import { PrimarysliderComponent } from './../sharemodule/primaryslider/primaryslider.component';
import { BookdetailsreadingComponent } from './bookdetailsreading/bookdetailsreading.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadingsPageRoutingModule } from './readings-routing.module';

import { ReadingsPage } from './readings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadingsPageRoutingModule,
    SharemoduleModule
  ],
  declarations: [
    ReadingsPage,
    BookdetailsreadingComponent,
    BooksectionreadingComponent
  
  ]
})
export class ReadingsPageModule {}
