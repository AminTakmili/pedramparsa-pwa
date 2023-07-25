import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.page.html',
  styleUrls: ['./vocabulary.page.scss'],
})
export class VocabularyPage implements OnInit {

  data:Array<object>=[]
  limit:number=10
  offset:number=0
  count:number=0
  loading:boolean=true

  constructor(
   private global:GlobalService
  ) { }

  ngOnInit() {
    this.data=[]

    // this.getData()

  }
  ionViewWillEnter(){
    this.data=[]

    this.getData()

  }
  ionViewDidLeave(){
    console.log(this.data);
    this.data=[]
  }
  async getData(){
    this.loading=true
    //  await this.global.showLoading()
     this.global.httpPost(
      'vocabs/books',{
        limit:this.limit,
        offset:this.offset
      }).subscribe(
     async (res:any) => {
      this.loading=false

      //  console.log(res);
      //  console.log(...this.data);
      // console.log(  this.data.length==0);
       this.count=res.count

       this.data.length==0&& this.data==[]&& this.data? this.data=res.data:this.data=[...this.data,...res.data]
   
      // await this.global.dismisLoading()
      
     },
     async (error:any) => {
      //  console.log(error);
      //  await  this.global.dismisLoading()
      this.loading=false
       await  this.global.showError(error)
       
     }
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
