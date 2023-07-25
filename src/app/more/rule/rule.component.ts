import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss'],
})
export class RuleComponent implements OnInit {
  html:any
  constructor(
    public modalController: ModalController,
    private global:GlobalService

  ) { }

  ngOnInit() {this.getData()}
 async getData(){

  await  this.global.showLoading()
    this.global.httpGet('support/terms').subscribe(
     async (res:any) => {
       console.log(res);
       await  this.global.dismisLoading()

      this.html= res.data[0].description
     },
     async (error:any) => {
      await  this.global.dismisLoading()
      this.global.showError(error)
       console.log(error);
     }
    )
  }

}
