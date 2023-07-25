import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-textbook-detail',
  templateUrl: './textbook-detail.component.html',
  styleUrls: ['./textbook-detail.component.scss'],
})
export class TextbookDetailComponent implements OnInit {
  id!:string|number
  backId!:string|number
  title!:string
  lessonTitle!:string
  textHtml!:any
  constructor(
  private  global:GlobalService,
  private route: ActivatedRoute,
 
  ) { 
    this.id= this.route.snapshot.paramMap.get('detailsid');
    this.backId= this.route.snapshot.paramMap.get('bookid');

  }

  ngOnInit() {
    this.getData()
  }

  async getData(){
    // await this.global.showLoading()
    this.global.httpPost('grammars/lesson',
    {
    
      lesson_id:this.id
    }).subscribe(
     async (res:any) => {
       console.log(res);
      // await this.global.dismisLoading() 
    
       this.title=res.data.title
       this.lessonTitle=res.data['lesson_title']
       this.textHtml=res.data.body
      
     },
     async (error:any) => {
      // await this.global.dismisLoading() 
      await this.global.showError(error)

       console.log(error);
     }
    )

  }

}

