import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-booksection',
  templateUrl: './booksection.component.html',
  styleUrls: ['./booksection.component.scss'],
})
export class BooksectionComponent implements OnInit {
  id:number|string
  
  data:Array<object>=[]
  limit:number=10
  offset:number=0
  count:number=0
  title!:string
  loading:boolean=true


  constructor(
    private global:GlobalService,
    private route: ActivatedRoute,
  ) { 
    this.id= this.route.snapshot.paramMap.get('bookid');
  }

  ngOnInit() {
    this.getData()
  }
  async getData(){
    // await this.global.showLoading()
    this.loading=true
    this.global.httpPost('grammars/lessons',
    {
      limit:this.limit,
      offset:this.offset,
      book_id:this.id
    }).subscribe(
     async (res:any) => {
      //  console.log(res.data);
      // await this.global.dismisLoading() 
      this.loading=false

       this.count=res.count
       this.title=res.data[0]['book_title']
       this.data.length==0&& this.data==[]&& this.data? this.data=res.data:this.data=[...this.data,...res.data]  
      //  this.data=res.data
      // console.log(this.data);
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
