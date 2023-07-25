import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-leitner-steps-report',
  templateUrl: './leitner-steps-report.component.html',
  styleUrls: ['./leitner-steps-report.component.scss'],
})
export class LeitnerStepsReportComponent implements OnInit {
  @Input('step')step
data:Array<object> =[]
limit:number=50
offset:number=0
count:number=0
  constructor(
    private global:GlobalService,
    public modalController: ModalController,
    // public routerOutlet: IonRouterOutlet,
  ) { }

  ngOnInit() {
    this.getData()
  }
  getData(){
    this.global.httpPost('leitner/show',
    {

      step:this.step,
      offset:this.offset,
      limit:this.limit,
    }
    ).subscribe(
     async (res:any) => {
      // console.log(res);
      
      this.count=res.count
      this.data.length==0&& this.data==[]&& this.data? this.data=res.data:this.data=[...this.data,...res.data]  
     },
    async (error:any) => {
      
    }
    )
  }
  async loadData(e:any){
    // console.log((this.offset+this.limit),this.count);
    if ((this.offset+this.limit)<this.count) {
      if ((this.count-(this.offset+this.limit))<this.limit) {
        this.offset=this.offset+this.limit
        this.limit=this.count-this.offset
      }else{
        this.offset=this.offset+this.limit
      }
        await this.getData()
        e.target.complete();
    }else{
      e.target.complete();
      e.target.disabled = true;
    }
  }
  delet(item,index:number){
    this.global.httpDelete(
      'leitner/remove-by-word',
      {
        word_id:item['word_id']

      }
    ).subscribe(
      async (res:any) => {
      // console.log(res);
      // this.isLeitner=!this.isLeitner
      this.data.splice(index, 1);
      this.global.showToast(res.msg,500,'bottom','success','ios')

      },
      async (error:any) => {
        // this.isLeitner=true

        this.global.showError(error)
        console.log(error);
      },
    )

  }


}
