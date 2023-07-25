import { AddSupportComponent } from './add-support/add-support.component';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
// import { GlobalService } from 'src/app/core/services/global.service';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-supports',
  templateUrl: './supports.component.html',
  styleUrls: ['./supports.component.scss'],
})
export class SupportsComponent implements OnInit {
  limit:number=10
  offset:number=0
  count!:number
  // isEnd:boolean=false
  dataArray:Array<object>=[]

  constructor(
   private global:GlobalService,
   public modalController: ModalController,
   public routerOutlet: IonRouterOutlet,
  ) { }

  ngOnInit() {
    // console.log("object");
    this.getData()

  }

  ionViewWillEnter(){
    console.clear()

  }

  
  // async getData(){
  //   // if (!this.isEnd) {
      
  //     // console.log("get");
  //      this.global.httpPost(
  //     'tickets/list',
  //     {
  //       limit:`${this.limit}`,
  //       offset:`${this.offset}`
  //     }
  //   ).subscribe(
  //    async (res:any) => {
  
  //    console.log(res);
  //   //  console.log(this.dataArray);
  //    if (this.dataArray.length!==0) {
  //     //  this.dataArray=[...this.dataArray,...res.data]
  //      this.dataArray.push(...res.data)
       
  //    }else{
  //     this.dataArray=res.data
  //    }

  //    },
  //    async (error:any) => {
  //     //  this.checkPageNumber=0
  //     this.global.showError(error);
  //      console.log(error);
  //    }
  //   )
  //   // }
   

  // }


  // loadData(event) {
  //   console.log(event);
  //   this.offset=this.offset+this.limit

  //   if ( this.offset+this.limit>this.count) {
  //     console.log("big");
  //     this.getData()
  //     this.limit=this.limit-this.count
  //     this.isEnd=true

  //   }
  //   else{
     
  //     console.log("smal");
  //     event.target.complete();
  //     this.getData()
  //   }
   
  //     if (this.isEnd) {

  //       event.target.disabled = true;

  //     }
  // }
  async getData(){
    // await this.global.showLoading()
    // this.loading=true
  await  this.global.showLoading()
    this.global.httpPost('tickets/list',
    {
      limit:this.limit,
      offset:this.offset,
    }).subscribe(
     async (res:any) => {
    await  this.global.dismisLoading()
      //  console.log(res);
      // await this.global.dismisLoading() 
      this.count=res.count
      this.dataArray.length==0&& this.dataArray==[]&& this.dataArray? this.dataArray=res.data:this.dataArray=[...this.dataArray,...res.data]  
      
      // console.log( this.dataArray);
      // console.log( this.count);
      //  this.loading=false
    
      //  this.data=res.data
     },
     async (error:any) => {
      await  this.global.dismisLoading()

      console.log(error);
      // await this.global.dismisLoading() 
      // this.loading=false
      await this.global.showError(error)

      //  console.log(error);
     }
    )

  }

  async loadData(e:any){
    console.log((this.offset+this.limit),this.count);
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

  
  async openAddSupportModal(){
   
    const modal = await this.modalController.create({
      component: AddSupportComponent,
      cssClass: 'my-custom-class',
      mode:'ios',
      presentingElement:this.routerOutlet.nativeEl,
      swipeToClose:true,
      // componentProps: {
      //   city : this.cityList
      // }
    });
    modal.onWillDismiss().then(async(res) => {
      console.log(res.data.resData);
      if (res.data && res.data.dismissed) {
        // this.getData()
        res.data.resData?  this.dataArray.unshift(res.data.resData):''

      }
});
  
    return await modal.present();
  }


}
