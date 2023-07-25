import { GlobalService } from './../../services/global.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookdetailsreading',
  templateUrl: './bookdetailsreading.component.html',
  styleUrls: ['./bookdetailsreading.component.scss'],
})
export class BookdetailsreadingComponent implements OnInit {
id!:number|string
backId!:number|string
innerHtml:any
title!:string
lessonTitle!:string
audioSrc!:string
  constructor(
    private route: ActivatedRoute,
    private global: GlobalService,

  ) { 
    this.id= this.route.snapshot.paramMap.get('detail');
    this.backId= this.route.snapshot.paramMap.get('bookid');

  }

  ngOnInit() {
    this.getdata()
  }
  getdata(){
    this.global.httpPost('readings/lesson',{
      lesson_id:this.id
    }).subscribe(
     async (res:any) => {
       console.log(res);
       console.log(res.data['file_url']);
       
       this.innerHtml=res.data.body
       this.audioSrc=res.data['file_url']
       this.lessonTitle=res.data['lesson_title']
       this.title=res.data.title
     },
     async (error:any) => {
       
     }
    )
  }

}
