import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-Booksectionreading',
  templateUrl: './Booksectionreading.component.html',
  styleUrls: ['./Booksectionreading.component.scss'],
})
export class BooksectionreadingComponent implements OnInit {
  id:number|string
  
  data:Array<object>=[]
  limit:number=10
  offset:number=0
  count:number=0
  title!:string
  loading:boolean=true
  constructor(
    private route: ActivatedRoute,
    private global: GlobalService,

  ) {
    this.id= this.route.snapshot.paramMap.get('bookid');


  }

  ngOnInit() {
    // this.id=1
    this.getData()
  }
  async getData(){
    // await this.global.showLoading()
    this.loading=true


    this.global.httpPost('readings/lessons',
    {
      limit:this.limit,
      offset:this.offset,
      book_id:this.id
    }).subscribe(
     async (res:any) => {
      //  console.log(res.data);
      this.loading=false

      await this.global.dismisLoading() 
       this.count=res.count
       res.data&&res.data[0]? this.title=res.data[0]['book_title']:''
       this.data.length==0&& this.data==[]&& this.data? this.data=res.data:this.data=[...this.data,...res.data]  
      //  this.data=res.data
      // console.log(this.data);
     },
     async (error:any) => {
      this.loading=false

      await this.global.dismisLoading() 
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


}
