import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { GlobalService } from 'src/app/core/services/global.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  supportlist:Array<object>
  statusNumber:string|number=0
  id!:string|number;
  title:string=''
  sendReplyForme:FormGroup
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private global:GlobalService
  ) { 
    this.sendReplyForme=fb.group({
      content:['',Validators.compose([Validators.required])]
    })
  }

  ngOnInit() {
    // console.log(this.route.snapshot.paramMap.get('detailId') );
   
    // console.log(this.route.snapshot.queryParams['status']);

    this.id=this.route.snapshot.paramMap.get('detailId')




  }
  
  ionViewWillEnter(){
    this.id=this.route.snapshot.paramMap.get('detailId')

    this.global.httpPost(
      'tickets/detail',
      {
        ticket_id:this.id
      }
    ).subscribe(
     async (res:any) => {
      //  console.log(res);
       this.supportlist=res.data.answers
       this.title=res.data.title
       this.statusNumber=res.data.status
     },
     async (error:any) => {
       console.log(error);
     }
    )

    // this.statusNumber=this.route.snapshot.queryParams['status']
  }
  sendReply(){
    // console.log(this.sendReplyForme.value.content);
    if (this.sendReplyForme.valid) {
      
      this.global.httpPost(
        'tickets/send-reply-to-ticket',
        {
          ticket_id:this.id,
          reply_body:this.sendReplyForme.value.content
        }
      ).subscribe(

       async (res:any) => {
        //  console.log(res.data.answers[res.data.answers.length-1]);
         this.supportlist.push(res.data.answers[res.data.answers.length-1])
         this.sendReplyForme.reset()
       },
       async (error:any) => {
         console.log(error);
       }
      
      )
    }

  }

}
