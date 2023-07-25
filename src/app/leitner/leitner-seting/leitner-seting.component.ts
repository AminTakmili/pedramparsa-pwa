import { ModalController } from '@ionic/angular';
import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';
import * as persianTools from '@persian-tools/persian-tools';


@Component({
  selector: 'app-leitner-seting',
  templateUrl: './leitner-seting.component.html',
  styleUrls: ['./leitner-seting.component.scss'],
})
export class LeitnerSetingComponent implements OnInit {
  severalDay:String|TypeError='0'
  data!:any
  listOfNumber:Array<number> =[]
  DailyWordsLoading:boolean=false
  DailyWordscount:number|string=10
  // remembering:any
  constructor(
    private global:GlobalService,
    public modalController: ModalController,
    // public routerOutlet: IonRouterOutlet,
  ) { }

  ngOnInit() {
    this.getData()

    for (let index = 10; index <=100; index=index+10) {
      this.listOfNumber.push(index)      
    }
  }
  getData(){
    this.global.httpGet('leitner/report').subscribe(
     async (res:any) => {
      // console.log(res);
      // console.log(res['several_day_of_practice']);
     this.data=res
      this.severalDay= persianTools.numberToWords(`${res['several_day_of_practice']}`, { ordinal: true })
      // console.log(this.severalDay );
      this.DailyWordscount=res['max_daily_words']

     
     },
    async (error:any) => {
      
    }
    )
  }
  setDailyWordsCount(e){

    // console.log(e.detail.value);
    this.DailyWordsLoading=true

    this.global.httpPost('leitner/set-daily-words-count',{count:e.detail.value}).subscribe(
     async (res:any) => {
      this.DailyWordsLoading=false
      //  console.log(res);
     },
     async (error:any) => {
      this.DailyWordsLoading=false
       this.global.showError(error)
      //  console.log(error);
     },
    )
  }
  clearAll(){
    this.global.showAlert(
      'توجه!!',
       'آیا میخواهید کل کلمات درون لایتر را پاک کنید؟', 
       [
			{
				text: 'بلی',
				role: 'yes'
			},
			{
				text: 'خیر',
				role: 'cancel'
			}
		]).then((alert : any) => {
			alert.present();
			alert.onDidDismiss().then(async ( e : any) => {
				if (e.role === 'yes') {
					await this.global.showLoading('لطفا منتظر بمانید...');
					this.global.httpDelete('leitner/remove-all', {}).subscribe(async (res:any) => {

						await this.global.dismisLoading();

						this.global.showToast(res.msg,500,'bottom','success','ios');

					}, async (error:any) => {
						await this.global.dismisLoading();
						this.global.showError(error);
					});
				}
			});
		});
  }

}
