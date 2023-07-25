import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { BackButtonEvent, IonButton } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import uniqid from 'uniqid';

// interface userButten {
// 	textArray: Array < string[] > ,
// 		disabel: boolean[],

// }

@Component({
	selector: 'app-dictationvocabulary',
	templateUrl: './dictationvocabulary.component.html',
	styleUrls: ['./dictationvocabulary.component.scss'],
})
export class DictationvocabularyComponent implements OnInit {
	// @ViewChild('span') child!: HTMLElement;
	@ViewChildren('wordButton') wordButtonList: QueryList<IonButton>;
	@ViewChildren('userWordSpan') userWordSpanList: QueryList<HTMLElement>;

	meaning!: string;

	// colorCard!: string
	lerningPercent: number = 0;
	StydyPercent: number = 0;
	readWordsCount: number = 0;
	totalWords: number = 0;
	// StydyPercentColor!: string
	// lerningPercentColor!: string
	word!: string;
	lessonTitle!: String;
	// wordArray: userButten = {
	// 	textArray: [],
	// 	disabel: [],
	// }
	textArray: Array<string[]> = [];
	disabled: object = {};

	wordUserArray: Array<string[]> = [];
	noChoseFirstIndex: number = 0;
	ChoselastIndex: number = 0;
	lastDisabledIndex: number = 0;

	limit: number = 1;
	offset: number = 0;
	lessonId: number | string;
	wordId: number | string;
	type: string = 'unread';
	// indexfull: number[] = [];
	// noUse: string[] = [];
	randomindex1!: number;
	randomindex2!: number;
	randomindex3!: number;
	randomindex4!: number;
	backId!: Number | string;

	isWrong: boolean = false;
	isCheckDictation: boolean = false;
	constructor(private global: GlobalService, private route: ActivatedRoute) {
		this.lessonId = this.route.snapshot.paramMap.get('detailsid');
		this.backId = this.route.snapshot.paramMap.get('id');
	

		// console.log(this.textArray);
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
	}

	isertWordButtonHandeler(item: string[], e, i: number) {
		console.log(this.textArray);
		if (this.wordUserArray[this.noChoseFirstIndex][0] == '_') {
			this.wordUserArray[this.noChoseFirstIndex] = [...item];
			// this.wordArray.disabel[this.noChoseFirstIndex] = true
			this.noChoseFirstIndex++;
			this.ChoselastIndex++;
		}
		if (!e.target.disabled) {
			e.target.disabled = true;
			this.disabled[i] = e.target.disabled;
		}
	}
	deletWordButtonHandeler() {
		let hasType = this.wordUserArray.find((item) => {
			return item[0] != '_';
		});
		// console.log(this.wordUserArray, this.wordUserArray.length, hasType);
		if (hasType) {
			if (
				this.wordUserArray[this.ChoselastIndex - 1][0] !== '_ ' &&
				this.noChoseFirstIndex !== 0
			) {
				this.wordButtonList.map(async (item) => {
					if (
						this.wordUserArray[this.noChoseFirstIndex - 1][1] ==
						item['el'].id
					) {
						console.log(item['el']);
						item['el']['disabled'] = false;
					}
				});
				this.wordUserArray[this.noChoseFirstIndex - 1][0] = '_';
				// this.wordArray.disabel[this.noChoseFirstIndex] = false
				this.noChoseFirstIndex--;
				this.ChoselastIndex--;
			}
		} else {
			this.global.showToast(
				'لطفا ابتدا حرفی از کلمه را وارد کنید',
				2000,
				'bottom',
				'warning',
				'ios'
			);
		}
	}

	async ngOnInit() {
		this.textArray = [[]];
		// console.log(this.textArray);
		await this.getData();
		// console.log(this.textArray);
	}

	async getData() {
		await this.global.showLoading();
		this.global
			.httpPost('vocabs/dictation', {
				lesson_id: this.lessonId,
				limit: this.limit,
				offset: this.offset,
				type: this.type,
			})
			.subscribe(
				async (res: any) => {
					await this.global.dismisLoading();
					console.table(res);
					// console.table(res.data);
					console.log(res.data[0]);
					this.word = res.data[0]['word_title'];
					this.lessonTitle = res['lesson_title'];
					this.totalWords = res['total_words'];
					this.readWordsCount = res['read_words_count'];
					this.wordId = res.data[0]['word_id'];
					// console.log(this.totalWords,this.readWordsCount);

					this.lerningPercent = parseInt(
						res['learned_words_percent']
					);
					this.StydyPercent = parseInt(res['read_words_percent']);
					this.meaning = res.data[0]['translation_title'];
					// this.meaning = res.data[0]['translation_title'];
					// this.lerningPercent =
					// 	(parseInt(res['read_words']) /
					// 		parseInt(res['total_words'])) *
					// 	100;
					// this.lerningPercent =
					// 	(parseInt(res['read_words']) /
					// 		parseInt(res['total_words'])) *
					// 	100;
					this.textArray && this.textArray.length != 0
						? this.textArray.shift()
						: '';

						
					for (const iterator of this.word.split('')) {
						// console.log(iterator);
						if (iterator) {
							this.textArray.push([
								iterator,
								uniqid(
									`${iterator}--`,
									`//${this.word.split('').indexOf(iterator)}`
								),
							]);
						}
					}

					this.randomindex1 = Math.floor(
						Math.random() * this.word.split('').length
					);
					if (this.word.split('').length <= 3) {
						this.randomindex2 = Math.floor(
							Math.random() * (this.word.split('').length - 1)
						);
					}
					if (this.word.split('').length > 3) {
						this.randomindex2 = Math.floor(
							Math.random() * (this.word.split('').length - 1)
						);
					}
					if (this.word.split('').length > 6) {
						this.randomindex2 = Math.floor(
							Math.random() * (this.word.split('').length - 2)
						);
						this.randomindex3 = Math.floor(
							Math.random() * (this.word.split('').length - 3)
						);
						this.randomindex4 = Math.floor(
							Math.random() * (this.word.split('').length - 4)
						);
					}
					if (this.word.split('').length > 10) {
						this.randomindex2 = Math.floor(
							Math.random() * (this.word.split('').length - 5)
						);
						this.randomindex3 = Math.floor(
							Math.random() * (this.word.split('').length - 3)
						);
						this.randomindex4 = Math.floor(
							Math.random() * (this.word.split('').length - 4)
						);
					}
					var random1: string[] = this.textArray[this.randomindex1];
					var random2: string[] = this.textArray[this.randomindex3];
					this.textArray[this.randomindex1] =
						this.textArray[this.randomindex2];
					this.textArray[this.randomindex2] = random1;
					
					if (this.word.split('').length > 6) {
						this.textArray[this.randomindex3] =
							this.textArray[this.randomindex4];

						this.textArray[this.randomindex4] = random2;
					}
					// for (let i = 0; i < this.word.split('').length; i++) {
					// 	// this.wordArray.disabel.push(false)
					// }

					// this.colorCard = "der-color"
					// this.StydyPercentColor = this.circleProgressHandeler(this.StydyPercent)
					// this.lerningPercentColor = this.circleProgressHandeler(this.lerningPercent)
					for (const i of this.textArray) {
						this.wordUserArray.push(['_', i[1]]);
					}
				},
				async (error: any) => {
					await this.global.dismisLoading();
					await this.global.showError(error);
					// console.log(error);
				}
			);
	}
	checkDictationButtonHandeler() {
		// console.log(wordUserArray);
		let isWriten = this.wordUserArray.find((item) => {
			return item[0] == '_';
		});

		// console.log(isWriten);
		if (!isWriten) {
			this.isCheckDictation = true;
			let words: any = [];
			let word: string;
			this.wordUserArray.map((item) => {
				words.push(item[0]);
				// console.log(object);
			});
			word = words.join('');
			// console.log(word, this.word);
			if (word === this.word) {
				this.global.showToast(
					'صحیح است',
					2000,
					'bottom',
					'success',
					'ios'
				);
				this.dictationSubmit('0')
			} else {
				this.userWordSpanList.forEach(
					(span: HTMLLegendElement, index: number) => {
						if (
							this.word.split('')[index] !==
							span['nativeElement'].outerText
						) {
							span['nativeElement'].style.color = 'red';
							this.isWrong = true;
							setTimeout(() => {
								this.isWrong = false;
							}, 500);
						}
					}
				);
				this.global.showToast(
					` املاء صحیح ${this.word} می باشد`,
					2000,
					'bottom',
					'danger',
					'ios'
				);
				this.dictationSubmit('1')
			}
		} else {
			this.global.showToast(
				'لطفا تمام حروف کلمه را وارد کنید',
				2000,
				'bottom',
				'warning',
				'ios'
			);
		}
	}
	async dictationSubmit(isWrong) {
		this.global
			.httpPost('vocabs/dictation-submit', {
				lesson_id: this.lessonId,
				word_id: this.wordId,
				is_wrong: isWrong,
			})
			.subscribe(
				async (res: any) => {
					// console.log(res);
					// this.offset++;

					if (this.totalWords <= this.readWordsCount) {
						this.type = 'wrong';
					}
					this.textArray=[]
					this.wordUserArray=[]
					this.noChoseFirstIndex=0
					this.ChoselastIndex=0
					this.lastDisabledIndex=0
					
					await this.getData().then(() => {
						this.isCheckDictation = false;
					});
					this.userWordSpanList.forEach(
						(span: HTMLLegendElement, index: number) => {
							span['nativeElement'].style.color = '#92949c';
						}
					);
				},
				async (error: any) => {
					this.global.showToast(
						'مشکلی پیش امده لطفا به صفحه قبل برگردید و دوباره تلاش کنید',
						3000,
						'middle',
						'danger',
						'ios'
					).then(async()=>{
						await this.global.showError(error)
					});
					// this.dictationSubmit(isWrong)
				}
			);
	}
}
