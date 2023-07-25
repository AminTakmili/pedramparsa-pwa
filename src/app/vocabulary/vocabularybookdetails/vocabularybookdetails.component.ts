import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-vocabularybookdetails',
  templateUrl: './vocabularybookdetails.component.html',
  styleUrls: ['./vocabularybookdetails.component.scss'],
})
export class VocabularybookdetailsComponent implements OnInit {

  headerTitel!:string;
  wordCount!:Number|string;
  wordStudyCount!:Number|string;
  id!:Number|string;
  backId!:Number|string;
  constructor(
   private global:GlobalService,
   private route: ActivatedRoute,

  ) { 

  this.id= this.route.snapshot.paramMap.get('detailsid');
  this.backId= this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    // this.headerTitel="کلمات درس اول"
    // this.wordCount=50
    // this.wordStudyCount=25
    // this.getdata()
    // this.id=1
  }
  ionViewWillEnter(){

    this.getdata()

  }
  async getdata(){
   await this.global.showLoading()
    this.global.httpPost('vocabs/lesson',{
      lesson_id:this.id
    }).subscribe(
     async (res:any) => {
        //  console.log(res);
    await    this.global.dismisLoading()
        this.wordCount=res.data['vocabs_count']
        this.wordStudyCount=res.data['user_vocab_count']
        this.headerTitel=res.data['title']


     },
     async (error:any) => {
    await  this.global.dismisLoading()
      this.global.showError(error)

      //  console.log(error);
     },
    )

  }

}
