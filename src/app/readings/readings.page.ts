import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-readings',
  templateUrl: './readings.page.html',
  styleUrls: ['./readings.page.scss'],
})
export class ReadingsPage implements OnInit {
  // id:number
  data:Array<object>=[]
  limit:number=10
  offset:number=0
  count:number=0
  loading:boolean=true



  constructor(
   private global:GlobalService
  ) { }

  ngOnInit() {
    // this.id=3
    this.getData()
  }
  getData(){
    this.loading=true

    // this.global.showLoading()
    this.global.httpPost('readings/books',{

      limit:this.limit,
      offset: this.offset

    }).subscribe(
     async (res:any) => {
       console.log(res);
       this.loading=false

      // this.global.dismisLoading()
      //  this.data=res.data
      this.count=res.count
      this.data.length==0&& this.data==[]&& this.data? this.data=res.data:this.data=[...this.data,...res.data]
  
     },
     async (error:any) => {
      this.loading=false

      // this.global.dismisLoading()
      this.global.showError(error)
      //  console.log(error);
     },
    )
  }
  
  async loadData(e:any){
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


}
