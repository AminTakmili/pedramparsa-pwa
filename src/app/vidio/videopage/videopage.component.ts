import { GlobalService } from './../../services/global.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videopage',
  templateUrl: './videopage.component.html',
  styleUrls: ['./videopage.component.scss'],
})
export class VideopageComponent implements OnInit {
  videosrc!:string
  poster!:string
  title!:string
  description!:string
  videoId!:string|number
  lessonId!:string|number
  bookId:string

  constructor(
    private global:GlobalService,
    private route :ActivatedRoute
  ) {
    this.videoId= this.route.snapshot.paramMap.get('videoId')
    this.lessonId= this.route.snapshot.paramMap.get('videoListId')
   }

  ngOnInit() {
    this.videosrc='assets/video/language-school.mp4'
    this.getData()
  }
  async getData(){
    await this.global.showLoading()

    this.global.httpPost(
      'podcasts/show-podcast-or-video',
      {
        lesson_id:this.lessonId,
        video_id:this.videoId,
        type :'videos'

      }
      ).subscribe(
       async (res:any) => {
        await this.global.dismisLoading()

        res.data['file_url']?  this.videosrc= res.data['file_url']: this.videosrc='assets/video/language-school.mp4'
        res.data['file_url']?  this.poster= res.data['file_url']:''
        this.title=res.data['title']
        this.description=res.data['description']
        res.data&&res.data.length!=0? this.bookId=res.data['book_id']:''

        //  console.log(res);
       },
      async (error:any) => {
        await this.global.dismisLoading()
       await this.global.showError(error)
      }
      )
  }

}
