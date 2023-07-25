import { ActivatedRoute } from '@angular/router';
import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';
import * as persianTools from '@persian-tools/persian-tools';


@Component({
  selector: 'app-examtype',
  templateUrl: './examtype.component.html',
  styleUrls: ['./examtype.component.scss'],
})
export class ExamtypeComponent implements OnInit {
  lessonId!:String|number
  bookId!:String|number
  lessonTitle!:String
  hasListening:boolean=false
  hasSpeaking:boolean=false
  hasWriting:boolean=false
  hasUnderstanding:boolean=false
 

  constructor(
    private global:GlobalService,
    private rout:ActivatedRoute,
  ) { 
    this.lessonId=this.rout.snapshot.paramMap.get('leasonId')
  }

  ngOnInit() {
    
    // console.log(persianTools.numberToWords("1372", { ordinal: true }) );
    // console.log(persianTools.numberToWords("72", { ordinal: true }) );
    // console.log(persianTools.SortText(['a','d','c','b']));
    this.getData()
    // returns "صد و بیست و سه هزار و دویست"
  }
  getData(){

    this.global.httpPost('exams/lesson',{
      lesson_id:this.lessonId
    }).subscribe(
     async (res:any) => {
      // console.log(res);
      // console.log(res.data.exams);
      this.lessonTitle=res.data['lesson_title']
      this.bookId=res.data['book_id']
      res.data.exams.map((exam)=>{
        // console.log(exam.type);
        switch (exam.type) {
          case 'listening':
            this.hasListening=true         
            break;
          case 'speaking':
            this.hasSpeaking=true         
            break;
          case 'writing':
            this.hasWriting=true         
            break;
          case 'understanding':
            this.hasUnderstanding=true         
            break;
        
          default:
            break;
        }
      }
      )
     },
     async (error:any) => {
       await this.global.showError(error)
      // console.log(error);
     }
    )
  }

}
