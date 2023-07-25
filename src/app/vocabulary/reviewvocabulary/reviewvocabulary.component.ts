// import { IonButton } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Pagination } from "swiper";
import { GlobalService } from 'src/app/services/global.service';

// install Swiper modules
// SwiperCore.use([Pagination]);

@Component({
  selector: 'app-Reviewvocabulary',
  templateUrl: './reviewvocabulary.component.html',
  styleUrls: ['./reviewvocabulary.component.scss'],
})
export class ReviewvocabularyComponent implements OnInit {

  // @ViewChild('swiperRef', { static: false }) swiper?: SwiperComponent;
  @ViewChild('getNewData', { static: false }) getNewDataButton?: ElementRef;


  pronunciation!:string
  vocab!:string
  role!:string
  color!:string
  id!:string|number
  backId!:string|number
  vocabsList:any=[]
  lessonTitle:String
  count:number=0
  offset:number=0
  limit:number=10
  type:string='all'
  constructor(
    private global:GlobalService,
    private route: ActivatedRoute,

  ) { 
    
  this.id= this.route.snapshot.paramMap.get('detailsid');
  this.backId= this.route.snapshot.paramMap.get('id');
  
}
ionViewWillEnter(){
  // console.log( this.route.snapshot.routeConfig.path.split('/')[this.route.snapshot.routeConfig.path.split('/').length-1]);
    if (this.route.snapshot.routeConfig.path.split('/')[this.route.snapshot.routeConfig.path.split('/').length-1]=='review' ) {
      this.type='all'
     
    }else if (this.route.snapshot.routeConfig.path.split('/')[this.route.snapshot.routeConfig.path.split('/').length-1]=='verb') {
          this.type='verb '
    
    }else{
          this.type='name '
    }

  }

  async ngOnInit() {
  // this.pronunciation="/dü^tüe/"
  // this.vocab="Frühstück"
  // this.role="صفت"
  // this.color="der-color"
 await this.global.showLoading()
  await this.getData()
await  this.global.dismisLoading()

  console.log("object");
  }
  getData(){
    this.global.httpPost(
      'vocabs/review',{
      lesson_id:this.id,
      type:this.type,
      limit:this.limit,
      offset:this.offset
    }).subscribe(
     async (res:any) => {
      //  console.log(res);
      //  console.log(res.data);
      
      //  this.vocabsList=res.data
       this.count=res.count
      //  this.vocabsList.length=this.count

       this.vocabsList.length==0|| this.vocabsList==[]? this.vocabsList=res.data:this.vocabsList=[...this.vocabsList,...res.data]
   
       this.lessonTitle=res['lesson_title']
      //  console.log(res['lesson_title']);
     },
     async (error:any) => {
      // this.global.dismisLoading()
      this.global.showError(error)
      
      //  console.log(error);
     }
    )
  }
  slideChangeHandeler(e){

    // console.log(typeof e);
    // console.log(e.wrapperEl);
    // console.log(e.wrapperEl.childElementCount);
    // console.log(e.activeIndex);
    if (this.count!==e.wrapperEl.childElementCount-1) {
      
      // console.log("===============",this.getNewDataButton.nativeElement);
      // console.log(this.vocabsList,"befor");
      if (e.activeIndex==e.wrapperEl.childElementCount-5) {
        // this.loadData()
        this.getNewDataButton.nativeElement.click()

        // console.log(this.swiper);
        // this.onClick()
        // this.swiper.s_observerUpdate
        // this.swiper.s_observerUpdate
        // this.swiper.s_observerUpdate
        // this.swiper.
        // console.log(this.vocabsList,"after");

      }
    }
  }
   
  async loadData(){
    if ((this.offset+this.limit)<this.count) {
      if ((this.count-(this.offset+this.limit))<this.limit) {
        this.offset=this.offset+this.limit
        this.limit=this.count-this.offset
      }else{
        this.offset=this.offset+this.limit
      }
        await this.getData()
        // e.target.complete();
    }else{
      // e.target.complete();
      // e.target.disabled = true;
    }
  }
  onClick(){
    // this.vocabsList=[...this.vocabsList,...this.vocabsList]
// console.log("updaaaaaaaaaaaaaaaaaaaaaaaaaaaaat");
    this.loadData()


  }


}
