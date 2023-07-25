import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { SwiperComponent } from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, { EffectFlip, Navigation } from 'swiper';
import { GlobalService } from 'src/app/services/global.service';

// install Swiper modules
SwiperCore.use([EffectFlip, Navigation]);

// import { Component, ViewEncapsulation, ViewChild,OnInit } from "@angular/core";
// import { SwiperComponent } from "swiper/angular";

// // import Swiper core and required modules
// import SwiperCore, { EffectFlip, Pagination, Navigation } from "swiper";

// // install Swiper modules
// SwiperCore.use([EffectFlip, Pagination, Navigation]);

@Component({
	selector: 'app-vocabularycard',
	templateUrl: './vocabularycard.component.html',
	styleUrls: ['./vocabularycard.component.scss'],
})
export class VocabularycardComponent implements OnInit {
	pronunciation!: string;
	frontVocab!: string;
	backVocab!: string;
	role!: string;
	colorCard!: string;
	lessonTitle!: string;
	lessonId!: string;
	wordId!: string;
	backId!: string;
	offset: string | number = 0;
	limit: string | number = 1;
	readWordsCount: number = 0;
	learnedWordscount: number = 0;
	totalWordsCount: number = 0;
	isReverse: string | number = 0;
	type: string = 'unread ';
	lerningPercent: number = 0;
	StydyPercent: number = 0;
	isLeitner:boolean

	inMyWord:boolean

	constructor(
		private global: GlobalService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.lessonId = this.route.snapshot.paramMap.get('detailsid');
		this.backId = this.route.snapshot.paramMap.get('id');

		if (this.route.snapshot.paramMap.get('re') == 're') {
			this.isReverse = 1;
		} else if (this.route.snapshot.paramMap.get('re') == 'dir') {
			this.isReverse = 0;
		} else {
			this.router.navigate([
				`home/vocabulary`,
				this.backId,
				this.lessonId,
			]);
		}
	}
	circleProgressHandeler(percent) {
		if (percent == 100) {
			return '#72AB00';
		}
		if (percent <= 100 && percent > 75) {
			return '#04AEE4';
		}

		if (percent <= 75 && percent > 50) {
			return '#A972B5';
		}
		if (percent <= 50 && percent > 25) {
			return '#FFBB00';
		} else {
			return '#FF6874';
		}
		//  console.log(this.color)
	}

	async ngOnInit() {
		await this.global.showLoading();
		await this.getData();
		//  .then(()=>{
		//    if ( this.readWordsCount!=0) {
		//     console.log(this.totalWordsCount, this.readWordsCount);
		//     this.type = 'unread';
		//     this.getData()
		//   }

		//  });
		await this.global.dismisLoading();
	}
	async getData() {
		this.frontVocab = undefined;
		this.backVocab = undefined;
		this.wordId = undefined;
		this.pronunciation = undefined;
		this.role = undefined;
		this.colorCard = undefined;
		this.StydyPercent = 0;
		this.lerningPercent = 0;
		this.lessonTitle = undefined;
		this.global
			.httpPost('vocabs/flash-cart', {
				lesson_id: this.lessonId,
				type: this.type,
				limit: this.limit,
				offset: this.offset,
				is_reverse: this.isReverse,
			})
			.subscribe(
				async (res: any) => {
					// console.table(res['data'][0][0]);
					// console.log(res);
					this.totalWordsCount = parseInt(res['count']);
					this.readWordsCount = parseInt(res['read_words_count']);
					this.learnedWordscount = parseInt(
						res['learned_words_count']
					);
					this.lessonTitle = res['lesson_title'];
					if (res['data'] && res['data'].length != 0) {
						this.wordId = res['data'][0][0]['word_id'];
						this.pronunciation = res['data'][0][0][
							'word_pronunciation'
						]
							? `/${res['data'][0][0]['word_pronunciation']}/`
							: '';
						this.role = res['data'][0][0]['word_type'];
						this.inMyWord= res['data'][0][0]['is_in_my_words_list']
						this.isLeitner=res['data'][0][0]['is_in_leitner']
						// this.colorCard = `${res['data'][0][0]['word_type']}-color`;
						this.StydyPercent = res['read_words_percent'];
						this.lerningPercent = res['learned_words_percent'];
						if (this.isReverse == 0) {
							this.frontVocab = res['data'][0][0]['word_title'];
							this.backVocab =
								res['data'][0][0].translations[
									'translation_title'
								];
						} else {
							this.backVocab = res['data'][0][0]['word_title'];
							this.frontVocab =
								res['data'][0][0].translations[
									'translation_title'
								];
						}
						if (
							this.role == 'der' ||
							this.role == 'die' ||
							this.role == 'das' ||
							this.role == 'adjective' ||
							this.role == 'verb'
						) {
							this.colorCard = this.role+'-color';
						} else {
							this.colorCard = 'default';
						}
					} else {
						if (this.learnedWordscount != this.totalWordsCount) {
							this.global.showToast(
								`تبریک شما تمام کلمات درس ${
									this.lessonTitle
								} را مرور کردید اما ${
									this.totalWordsCount - this.learnedWordscount
								} کلمه را هنوز یاد نگرفتید که در ادامه برا شما دوباره به نمایش گذاشته شده`,
								5000,
								'middle',
								'secondary'
							);
							this.type = 'wrong';
						} else {
							this.type = 'all';
						}
						this.getData();
					}
				},
				async (error: any) => {
					await this.global.showError(error);
				}
			);
	}
	async submitWord(Iknow: number | string) {
		await this.global.showLoading();
		this.global
			.httpPost('vocabs/learn-word-submit', {
				lesson_id: this.lessonId,
				word_id: this.wordId,
				i_know: Iknow,
				is_reverse: this.isReverse,
			})
			.subscribe(
				async (res: any) => {
					if (this.totalWordsCount <= this.readWordsCount) {
						// console.log(this.totalWordsCount, this.readWordsCount);
						this.type = 'wrong';
					}
					await this.getData();
					this.global.dismisLoading();
				},
				async (error: any) => {
					await this.global.dismisLoading();
					this.global
						.showToast(
							'مشکلی پیش امده لطفا به صفحه قبل برگردید و دوباره تلاش کنید',
							3000,
							'middle',
							'danger',
							'ios'
						)
						.then(async () => {
							await this.global.showError(error);
						});
				}
			);
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

}
