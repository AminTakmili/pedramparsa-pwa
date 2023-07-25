import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd, ActivatedRoute  } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-examtext',
  templateUrl: './examtext.component.html',
  styleUrls: ['./examtext.component.scss'],
})
export class ExamtextComponent implements OnInit {
  id!:string;
  book_id!:string;
  type!:string;
  examName!:string;
  pdfSrc!:string;
  zoomNumber:number;
  zoomInDisabled:boolean=false
  zoomOutDisabled:boolean=false
  wantAudio:boolean=false
  audioSrc!:string
  title!:string
  html!:any

  // APIArray:[object]


  // constructor(private router: Router) { 
  //   console.log(router);
  
  // }
  constructor(
    private route: ActivatedRoute,
    private navCtrl : NavController,
    private router : Router,
    private global : GlobalService
    ) {
    // const id: string = route.snapshot.params.id;
    // const url: string = route.snapshot.url.join('');
    // const user = route.snapshot.data.user;
    // const path =route.snapshot.paramMap.get('businessId');
  
    // console.log(id,url,user,path);
    // console.log(url);

    this.id=this.route.snapshot.paramMap.get('leasonId');

    const typeRout=this.route.snapshot.paramMap.get('examText')
    // console.log(typeRout);
    switch (typeRout) {
      case 'Hören':
        // console.log(res['exam_listening']);
        this.type='listening'

        
        break;
      case 'Sprechen':
        this.type='speaking'
        
        break;
      case 'Schreiben':
        this.type='writing'

        
        break;
    
      case 'Lesen':
        this.type='understanding'

        
        break;
    
      default:
        this.navCtrl.back()
        break;

    }
    

    
      
 
  }
  zoomOut(){
    // console.log("object");
    if (Math.floor( this.zoomNumber * 10)!==0) {
      
      this.zoomNumber= this.zoomNumber-0.3
      this.zoomInDisabled=false
      if (Math.floor( this.zoomNumber * 100)===9) {
         
      this.zoomOutDisabled=true
        
      }
     
    }
    else{
      
      this.zoomOutDisabled=true
    }
   
  }
  zoomIn(){
    if (Math.floor( this.zoomNumber )!==3) {

      this.zoomNumber= this.zoomNumber+0.3
      this.zoomOutDisabled=false
      if (Math.floor( this.zoomNumber * 10)==30) {
        this.zoomInDisabled=true
        
      }
    }else{
      
      this.zoomInDisabled=true
      
    }
  }

   ngOnInit() {
    //  console.log( this.route.pathFromRoot);
    // this.route.pathFromRoot[1]?.url.subscribe(val => console.log(val[0].path));

    // this.pdfSrc='../../../assets/pdf/sample.pdf';
    this.zoomNumber=1
    // this.wantAudio=true;
    this.getData()
    



   
  }
  getData(){
    this.global.httpPost('exams/take-exam',{
      exam_type:this.type,
      lesson_id:this.id
    }).subscribe(
     async (res:any) => {
      console.log(res);
      this.title=res.data?.title
      this.book_id=res.data?.book_id
      res.data.files.map((item)=>{
        item.file_type=='document'?this.pdfSrc=item.file_url:''
        item.file_type=='audio'?this.audioSrc=item.file_url:''
      })
      this.html=res.body
     },
    async (error:any) => {
      console.log(error);
    }
    )
  }

}
