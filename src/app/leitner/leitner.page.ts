import { SwiperComponent } from 'swiper/angular';
import { LeitnerSetingComponent } from './leitner-seting/leitner-seting.component';
import { LeitnerStepsReportComponent } from './leitner-steps-report/leitner-steps-report.component';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import SwiperCore, { EffectFlip, Navigation } from 'swiper';

import { Component, OnInit, ViewChild } from '@angular/core';
SwiperCore.use([EffectFlip, Navigation]);

@Component({
	selector: 'app-leitner',
	templateUrl: './leitner.page.html',
	styleUrls: ['./leitner.page.scss'],
})
export class LeitnerPage implements OnInit {
	@ViewChild('cardSlider', { static: false }) swiper?: SwiperComponent;

	boxList: Array<litenerBox> = [
		{
			active: false,
			id: 0,
			step: 1,
			wordCount: 0,
		},
		{
			active: false,
			id: 1,
			step: 2,
			wordCount: 0,
		},
		{
			id: 2,
			active: false,
			step: 3,
			wordCount: 0,
		},
		{
			active: false,
			id: 3,
			step: 4,
			wordCount: 0,
		},
		{
			active: false,
			id: 4,
			step: 5,
			wordCount: 0,
		},
	];
	showCardCount: Number = 1;
	showCardLimit: Number = 1;
	showCardOffset: Number = 0;

	frontVocab!: string;
	backVocab!: string;
	wordId!: string;
	pronunciation!: string;
	role!: string;
	colorCard!: string;
	StydyPercent = 0;
	lerningPercent = 0;
	lessonTitle!: string;

	ActivStep!:String|number
	inMyWord:boolean
	constructor(
		private global: GlobalService,

		public modalController: ModalController,
		public routerOutlet: IonRouterOutlet
	) {}

	ngOnInit() {
		this.getLeitnerReport();
	}

	async getLeitnerReport() {
		await this.global.showLoading();
		this.global.httpGet('leitner/report').subscribe(
			async (res: any) => {
				// console.log(res);
				await this.global.dismisLoading();
				this.boxList.map((box) => {
					// console.log(res['steps'].step,box.step);
					res['steps'].map((resBox) => {
						if (box.step == resBox.step) {
							box.wordCount = resBox['word_count'];
						}
					});
				});

				// Object.assign(this.boxList,res['steps'],...[{id:0,active: false,},{id:1,active: false,},{id:2,active: false,},{id:3,active: false,},{id:4,active: false,}])
				console.log(this.boxList);
				this.chekActiveBox();
			},
			async (error: any) => {
				await this.global.dismisLoading();

				this.global.showError(error);
				console.log(error);
			}
		);
	}
	// showStepDetail(step: number) {
	// 	// *
	// 	console.log(step);
	// }
	chekActiveBox() {
		// console.log(this.boxList);

		// white Object.assign cope this.boxList then reverse
		let copyBoxList: Array<litenerBox> = this.boxList.map((c) => c);
		// console.log(copyBoxList);
		let lastBoxHasWord: litenerBox = copyBoxList.reverse().find((box) => {
			return box['wordCount'] != 0;
		});
		this.boxList[
			this.boxList.findIndex((box) => {
				return box.id === lastBoxHasWord.id;
			})
		].active = true;
		// console.log(lastBoxHasWord);

		this.ActivStep=lastBoxHasWord.step
		this.showcard(this.ActivStep);
	}
	showcard(step: number) {
		this.global
			.httpPost('leitner/show', {
				step,
				offset: this.showCardOffset,
				limit: this.showCardLimit,
			})
			.subscribe(
				async (res: any) => {
					this.showCardCount = res.count;
					this.pronunciation = res.data[0]['translation_title'];
					// console.log(res.data[0]['word_title']);
					// console.log(res.data[0]['translation_title']);
					this.frontVocab = res.data[0]['word_title'];
					this.backVocab = res.data[0]['translation_title'];
					// console.log(this.frontVocab);
					this.role = res.data[0]['word_type'];
					this.wordId = res.data[0]['word_id'];
					this.inMyWord = res.data[0]['is_in_my_words_list'];
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
					// console.log(res);
				},
				async (error: any) => {
					await this.global.showError(error)
					// console.log(error);
				}
			);
	}

	submitWord(isUnderstand: number) {
		// this.boxList
		this.global.httpPost('leitner/learn-word-submit',
		{
			word_id:this.wordId,
			i_know:isUnderstand
		}).subscribe(
			async (res:any) => {
				console.log(res);
				this.boxList[
					this.boxList.findIndex((box) => {
						return box.step === this.ActivStep;
					})
				].wordCount--;
				this.chekActiveBox()
				setTimeout(() => {
					
					this.swiper.swiperRef.slideTo(0, 0);
				}, 2);
				// domyWordCount=domyWordCount-1

			},
			async (error:any) => {
				console.log(error);
			}
		)
	}

	async openLeitnerStepsReportModal(step) {
		const modal = await this.modalController.create({
			component: LeitnerStepsReportComponent,
			cssClass: 'my-custom-class',
			mode: 'ios',
			presentingElement: this.routerOutlet.nativeEl,
			swipeToClose: true,
			componentProps: {
			  step
			}
		});
		// 	modal.onWillDismiss().then(async(res) => {
		// 	  console.log(res.data.resData);
		// 	  if (res.data && res.data.dismissed) {
		// 		// this.getData()
		// 		res.data.resData?  this.dataArray.unshift(res.data.resData):''

		// 	  }
		// });

		return await modal.present();
	}

	async openLeitnerSetingModal() {
		const modal = await this.modalController.create({
			component: LeitnerSetingComponent,
			cssClass: 'my-custom-class',
			mode: 'ios',
			presentingElement: this.routerOutlet.nativeEl,
			swipeToClose: true,
			// componentProps: {
			//   city : this.cityList
			// }
		});
		// 	modal.onWillDismiss().then(async(res) => {
		// 	  console.log(res.data.resData);
		// 	  if (res.data && res.data.dismissed) {
		// 		// this.getData()
		// 		res.data.resData?  this.dataArray.unshift(res.data.resData):''

		// 	  }
		// });

		return await modal.present();
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
interface litenerBox {
	active: boolean;
	id: number;
	step: number;
	// number: number | string,
	wordCount: number ;
}
