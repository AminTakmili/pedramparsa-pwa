import {
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';

import { GlobalService } from 'src/app/services/global.service';
import { Meta } from '@angular/platform-browser';
import { TtsService } from './../../services/tts.service';

@Component({
	selector: 'app-word-card',
	templateUrl: './word-card.component.html',
	styleUrls: ['./word-card.component.scss'],
})
export class WordCardComponent implements OnInit, OnChanges {
	@Input('wordArray') wordArray;
	@Input('myword') myword?:boolean;
// aalen,Sadomasochismus,DFG کلمات برای چک کردن
	pronunciation!: string;
	vocab!: string;
	role!: string;
	color!: string;
	id!: string | number;
	wordId!: string | number;
	backId!: string | number;
	vocabsList: any;
	translations: object[][]=[];
	otherSituation: object[][]=[];
	examples: Array<object>[]=[];
	isLeitner:boolean
	inMyWord:boolean
	audioSrc:string=''
	usage:string[]=[]
	phrases:{
		fa:string,
		de:string,
		voice_eid:string,
	}[][]=[]

	constructor(
		private global:GlobalService,
		private tts:TtsService,
		private metaService: Meta,
	) {}

	ngOnInit() {
		// console.log(this.wordArray);
		
		this.metaService.updateTag({ name: 'referrer', content: 'no-referrer'});
		
		// console.log(this.tts.getAudioUrl('hello'));
		this.audioSrc="https://translate.google.com/translate_tts?ie=UTF-8&amp;q=spazieren%20gehen&amp;tl=de&amp;total=1&amp;idx=0&amp;textlen=10&amp;client=tw-ob&amp;prev=input&amp;ttsspeed=1"
	
		

	}
	ngOnChanges(changes: SimpleChanges): void {
		// console.log(changes);
		// console.log(changes.wordArray.currentValue[0]['word_id']);
		this.wordId=changes.wordArray.currentValue[0]['word_id']
		// console.log(changes.wordArray.currentValue[0]['is_in_leitner']);
		this.isLeitner=changes.wordArray.currentValue[0]['is_in_leitner']
		this.examples=[]
		this.translations=[];
		this.otherSituation=[];
		this.phrases=[]
		this.usage=[]
		this.pronunciation=undefined
		this.vocab=undefined
		this.role=undefined
		this.color=undefined
		this.wordArray?.map((word)=>{
			// console.log(word);
			word['word_pronunciation']&&!this.pronunciation? this.pronunciation= word['word_pronunciation']:'';
			word['word_title']&&!this.vocab? this.vocab= word['word_title']:'';
			word['word_type']&&!this.role? this.role=word['word_type']:'';
			// this.role.push(word['word_type']);
			this.translations.push(word['translations']);
			this.examples.push(word['examples']);
			this.phrases.push(word['phrases']);
			this.usage.push(word['usage']);
			if (this.role=='der'||this.role=='die'||this.role=='das'||this.role=='Adjektiv'||this.role=='adjective'||this.role=='verb') {
				this.color=`${word['word_type']}-color`
			}else{
				this.color='default'
			}

			// this.getData()
			// console.log("object")
			if (typeof word['other_situation'] == 'object') {
				this.otherSituation.push([word['other_situation']]);
			} else {
				this.otherSituation.push(word['other_situation']);
			}
			
		})
		// console.log(this.vocab);
		// this.tts.getAudioBase64(this.vocab)
		// this.tts.getAllAudioBase64(this.vocab)
		// !
		// this.audioSrc=this.tts.getAudioUrl(this.vocab)

	
		
		this.myword?this.inMyWord=true:this.inMyWord=changes.wordArray.currentValue[0]['is_in_my_words_list']


	}
	addLitner(){
		if (!this.isLeitner) {
			
			this.global.httpPost(
				'leitner/add-by-word',
				{
					word_id:this.wordId
					
				}
				).subscribe(
					async (res:any) => {
							this.isLeitner=!this.isLeitner
							// console.log(res);
							this.global.showToast(res.msg,500,'bottom','success','ios')


						},
						async (error:any) => {
							this.isLeitner=false

						this.global.showError(error)
						},
					)
			
		}else{
			this.global.httpDelete(
				'leitner/remove-by-word',
				{
					word_id:this.wordId
	
				}
			).subscribe(
				async (res:any) => {
				// console.log(res);
				this.isLeitner=!this.isLeitner
				this.global.showToast(res.msg,500,'bottom','success','ios')

				},
				async (error:any) => {
					this.isLeitner=true

					console.log(error);
				},
			)
		}
	}
	addMyWord(){
		if (!this.inMyWord) {
			
			this.global.httpPost(
				'my-words/add-to-my-words',
				{
					word_id:this.wordId
					
				}
				).subscribe(
					async (res:any) => {
							this.inMyWord=!this.inMyWord
							// console.log(res);
							this.global.showToast(res.msg,500,'bottom','success','ios')


						},
						async (error:any) => {
							this.inMyWord=false

						this.global.showError(error)
						},
					)
			
		}else{
			this.global.httpDelete(
				'leitner/remove-by-word',
				{
					word_id:this.wordId
	
				}
			).subscribe(
				async (res:any) => {
				// console.log(res);
				this.inMyWord=!this.inMyWord
				this.global.showToast(res.msg,500,'bottom','success','ios')

				},
				async (error:any) => {
					this.inMyWord=true

					// console.log(error);
				},
			)
		}
	}

	playAudio(word){
		// console.log(this.audioSrc);
		
		// this.tts.getAudioUrl(word)
		// console.log(word);
		// console.log(this.tts.getAudioUrl(word));
		let url =this.tts.getAudioUrl(word)
	
	  
	  let audioDiv=document.getElementById('audioDiv')
	  console.log(audioDiv.children.length);
	  if (audioDiv.children.length!=0) {
		audioDiv.innerHTML=''
	  }	
	  
	  let audio= document.createElement('audio')
	  audio.setAttribute('name','media')
	  console.log(audio);
	  let source= document.createElement('source')
	  source.setAttribute('type','audio/mpeg')
	  source.setAttribute('src',url)
	  console.log(source);
	  audio.append(source)
	  audioDiv.append(audio)
	  console.log(audioDiv);
		audio.load();
		audio.play();
	// audio.autoplay = true
	//   audio.onended = function() {
	// 	alert("The video has ended");
	// 	audio.pause()
		
	// };
	  
	//   audio.play()
		
		// let audio = new Audio('https://translate.google.com/translate_tts?ie=UTF-8&amp;q=spazieren%20gehen&amp;tl=de&amp;total=1&amp;idx=0&amp;textlen=10&amp;client=tw-ob&amp;prev=input&amp;ttsspeed=1');
		// // audio.src =;
	
		// console.log(audio);
		// audio.load();
		// audio.play();
	}

}
