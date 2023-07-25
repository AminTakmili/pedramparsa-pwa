import { GlobalService } from './../services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.page.html',
  styleUrls: ['./shops.page.scss'],
})
export class ShopsPage implements OnInit {
  // id:number|string
  
  data:Array<object>=[]
  limit:number=10
  offset:number=0
  count:number=0
  title!:string


  constructor(
    private global:GlobalService,
    // private route: ActivatedRoute,
  ) { 
    // this.id= this.route.snapshot.paramMap.get('bookid');
  }

  ngOnInit() {
    this.getData()
  }
  async getData(){
    // console.log("object");
    // await this.global.showLoading()
    this.global.httpPost('packages/packages-list',
    {
      limit:this.limit,
      offset:this.offset,
      // book_id:this.id
    }).subscribe(
     async (res:any) => {
       console.log(res);
      // await this.global.dismisLoading() 
       this.count=res.count
      //  this.title=res.data[0]['book_title']
       this.data.length==0&& this.data==[]&& this.data? this.data=res.data:this.data=[...this.data,...res.data]  
      //  this.data=res.data
      console.log(this.data);
     },
     async (error:any) => {
      // await this.global.dismisLoading() 
      await this.global.showError(error)

       console.log(error);
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
