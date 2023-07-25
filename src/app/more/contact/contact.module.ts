import { MapService } from './../../services/map.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactPageRoutingModule } from './contact-routing.module';

import { ContactPage } from './contact.page';
// import { MapService } from 'src/app/core/services/map.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactPageRoutingModule,
    
  ],
  declarations: [ContactPage],
  providers:[MapService]
})
export class ContactPageModule {}
