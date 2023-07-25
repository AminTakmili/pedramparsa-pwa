import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-podcastslist',
  templateUrl: './podcastslist.component.html',
  styleUrls: ['./podcastslist.component.scss'],
})
export class PodcastslistComponent implements OnInit {
  videoListId:string
  bookId:string
  limit:number=10
  offset:number=0
  count:number=0
  title!:string
  serchLoading:boolean
  data:Array<object> =[]
  constructor(
   private global:GlobalService,
   private rout:ActivatedRoute
  ) { 

    this.videoListId=this.rout.snapshot.paramMap.get('videoListId')
  }

  async ngOnInit() {
    await this.global.showLoading()
    this.getData()
    await this.global.dismisLoading() 
  }
  async getData(){
    // await this.global.showLoading()
    this.global.httpPost(
      'podcasts/lesson',
      {

        lesson_id: this.videoListId,
        limit:this.limit,
        offset:this.offset,
        type :'podcasts'

      }
    ).subscribe(
     async (res:any) => {
       console.log(res);
      // await this.global.dismisLoading() 
       this.count=res.count
       res.data&&res.data.length!=0? this.title=res.data[0]['lesson_title']:''
       res.data&&res.data.length!=0? this.bookId=res.data[0]['book_id']:''
       this.data.length==0&& this.data==[]&& this.data? this.data=res.data:this.data=[...this.data,...res.data]  
      //  this.data=res.data
      // console.log(this.data);
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
  serchHandeler(e:any){

    // console.log(e.detail.value);
    if (!e.detail.value||e.detail.value.trim()==''||!e.detail.value.trim()) {
      if (e.detail.value.trim()==''&&e.detail.value!="") {
        this.global.showToast('لطفا عنوان ویدیو را بنویسید',500,'bottom','warning','ios')
        
      }else{
        
        this.serchInputIsClean()
      }
    }else{
      this.serchLoading=true
      this.global.httpPost(
        'podcasts/search',
        {
          lesson_id:this.videoListId,
          search:e.detail.value,
          type :'podcasts'

        }
      ).subscribe(
       async (res:any) => {
        this.serchLoading=false

         if (res.data.length!==0) {
           console.log(res);
           this.limit=10
           this.offset=0
           this.data=res.data
           
         }else{
          this.global.showToast('متاسفانه ویدیو مورد نظر یافت نشد ',1000,'middle','danger','ios').then(
            ()=>{
              this.serchInputIsClean()

            }
          )

         }
       },
       async (error:any) => {
        //  console.log(error);
        this.serchLoading=false
         await this.global.showError(error)
       }
      )

    }
  }
  serchInputIsClean(){
    this.limit=10
    this.offset=0
    this.data=[]
    this.getData()
    // console.log("ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc");
  }

}
