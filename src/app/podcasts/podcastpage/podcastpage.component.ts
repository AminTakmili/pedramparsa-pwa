import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-podcastpage',
  templateUrl: './podcastpage.component.html',
  styleUrls: ['./podcastpage.component.scss'],
})
export class PodcastpageComponent implements OnInit {
  audioSrc!:string
  html:any
  title!:string
  lessonId!:string
  videoId!:string
  bookId!:string

  constructor(
    private global:GlobalService,
    private route :ActivatedRoute

  ) { 
    this.videoId= this.route.snapshot.paramMap.get('podcastId')
    this.lessonId= this.route.snapshot.paramMap.get('videoListId')
  }

  ngOnInit() {this.getData()}
  async getData(){
    await this.global.showLoading()

    this.global.httpPost(
      'podcasts/show-podcast-or-video',
      {
        lesson_id:this.lessonId,
        video_id:this.videoId,
        type :'podcasts'

      }
      ).subscribe(
       async (res:any) => {
        await this.global.dismisLoading()

        res.data['file_url']?  this.audioSrc= res.data['file_url']: ''
        // res.data['file_url']?  this.poster= res.data['file_url']:''
        this.title=res.data['title']
        this.html=res.data['description']
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
