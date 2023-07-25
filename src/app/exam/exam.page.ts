import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.page.html',
  styleUrls: ['./exam.page.scss'],
})
export class ExamPage implements OnInit {

  id:number
  APIlist:[any];
  imgSrc:undefined|string=undefined
  data:Array<object>=[]
  limit:number=10
  offset:number=0
  count:number=0
  loading:boolean=true
  constructor(
   private global:GlobalService
  ) { }

  ngOnInit() {
    this.id=1
    // this.APIlist=res.data
    this.getData()
  }
  async getData(){
    // await this.global.showLoading()
    this.loading=true
    this.global.httpPost('exams/books',
    {
      limit:this.limit,
      offset:this.offset,
    }).subscribe(
     async (res:any) => {
      //  console.log(res);
       this.loading=false
       console.table(res.data[0].children);
      // await this.global.dismisLoading() 
       this.count=res.count
       this.data.length==0&& this.data==[]&& this.data? this.data=res.data:this.data=[...this.data,...res.data]  
      //  this.data=res.data
     },
     async (error:any) => {
      // await this.global.dismisLoading() 
      this.loading=false

      await this.global.showError(error)

      //  console.log(error);
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

  imgError(){

    this.imgSrc='../../assets/img/no-image-icon-23485.png'
  }

}
