import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'],
})
export class AboutusComponent implements OnInit {
html:any
  constructor(
    public modalController: ModalController,
    private global:GlobalService

  ) { }

  ngOnInit() {this.getData()}
  async getData(){

    await this.global.showLoading()
    this.global.httpGet('support/about-us').subscribe(
     async (res:any) => {
       console.log(res);
       await this.global.dismisLoading()

       this.html= res.data.description
      },
     async (error:any) => {
       console.log(error);
       await  this.global.dismisLoading()
       this.global.showError(error)
     }
    )
  }

}
