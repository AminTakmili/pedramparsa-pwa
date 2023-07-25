import { ValidatorComponent } from './validator/validator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { PrimarysliderComponent } from './primaryslider/primaryslider.component';
import { PrimarycardComponent } from './primarycard/primarycard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { WordCardComponent } from './word-card/word-card.component';
import { SectionlistComponent } from './sectionlist/sectionlist.component';
import { IdiomCardComponent } from './idiom-card/idiom-card.component';



@NgModule({
  
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PrimarycardComponent,
    PrimarysliderComponent,
    ValidatorComponent,
    WordCardComponent,
	IdiomCardComponent,
    SectionlistComponent

  ],
  exports:[ 
    PrimarycardComponent,
    PrimarysliderComponent,
    ValidatorComponent,
    WordCardComponent,
	IdiomCardComponent,
    SectionlistComponent

  ]
  
})
export class SharemoduleModule { }
