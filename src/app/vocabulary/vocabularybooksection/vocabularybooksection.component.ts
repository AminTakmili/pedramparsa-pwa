import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-vocabularybooksection',
  templateUrl: './vocabularybooksection.component.html',
  styleUrls: ['./vocabularybooksection.component.scss'],
})
export class VocabularybooksectionComponent implements OnInit {

  percent:number=80
  id!:number|string
  color!:string
  data:Array<object>=[]

  limit:number=25
  offset:number=0
  count:number=0


  constructor(
   private global:GlobalService,
    private route: ActivatedRoute,
  ) { 
    this.id= this.route.snapshot.paramMap.get('id');

  }

  circleProgressHandeler(percent){

    if (percent==100) {
      return '#72AB00'
    }
    if (percent<=100&&percent>75) {
      return '#04AEE4'
    }
 
    if (percent<=75&&percent>50) {
      return '#A972B5'
    }
    if (percent<=50&&percent>25) {
      return '#FFBB00'
    }else{
      return '#FF6874'
    }
   }
  ngOnInit() {
    // this.circleProgressHandeler()
   
    // this.id= this.route.snapshot.queryParams['id']
    // this.id= this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    // this.getdata()
  }
  ionViewWillEnter():void{
    this.getdata()

  }
  getdata(){

    this.global.httpPost(
      'vocabs/lessons',
      {
        book_id:this.id,
       limit:this.limit,
       offset:this.offset
      }).subscribe(
     async (res:any) => {
      //  console.log(res);
       this.count=res.count
       this.data.length==0 ? this.data=res.data:this.data=[...this.data,...res.data]

      //  this.data=res.data

     },
     async (error:any) => {
       console.log(error);
     }
    )
  }
  
  async loadData(e:any){

    // console.log(e);
    // console.log(this.data);
    if ((this.offset+this.limit)<this.count) {

      if ((this.count-(this.offset+this.limit))<this.limit) {
        this.offset=this.offset+this.limit
        this.limit=this.count-this.offset
      }else{
        this.offset=this.offset+this.limit
      }
      await this.getdata()
      e.target.complete();
    }else{
      e.target.complete();
      e.target.disabled = true;
    }
  }


  

}
