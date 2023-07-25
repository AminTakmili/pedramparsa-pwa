import { LeitnerSetingComponent } from './leitner-seting/leitner-seting.component';
import { SwiperModule } from 'swiper/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeitnerPageRoutingModule } from './leitner-routing.module';

import { LeitnerPage } from './leitner.page';
import { LeitnerStepsReportComponent } from './leitner-steps-report/leitner-steps-report.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeitnerPageRoutingModule,
    SwiperModule
  ],
  declarations: [LeitnerPage,LeitnerStepsReportComponent,LeitnerSetingComponent]
})
export class LeitnerPageModule {}
