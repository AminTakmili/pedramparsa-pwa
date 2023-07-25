import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-grammar',
  templateUrl: './grammar.page.html',
  styleUrls: ['./grammar.page.scss'],
})
export class GrammarPage implements OnInit {
  data=[]
  limit:number=30
  offset:number=0
  count:number=0
  loading:boolean=true

  constructor(

  private  global:GlobalService

  ) { }


  ngOnInit() {
    this.data=[]
    
    

    // this.getData()

  }
 async ionViewWillEnter(){
    this.data=[]
    
    

    // await this.global.showLoading()
    // this.loading=true

    await this.getData()
    // this.loading=false

    // await this.global.dismisLoading() 

  }
  ionViewDidLeave(){
    console.log(this.data);
    this.data=[]
    this.offset=0
    this.limit=30
    
  }
  async getData(){
    // await this.global.showLoading()
    this.loading=true
    this.global.httpPost('grammars/books',
    {
      limit:this.limit,
      offset:this.offset,
    }).subscribe(
     async (res:any) => {
      //  console.log(res.data);
      // await this.global.dismisLoading() 
      this.count=res.count
      this.data.length==0&& this.data==[]&& this.data? this.data=res.data:this.data=[...this.data,...res.data]  
     
       this.loading=false
    
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



}
