import { Component, OnInit } from '@angular/core';
import { SearchbarChangeEventDetail, SegmentCustomEvent } from '@ionic/angular';
import { GlobalService } from '../services/global.service';

@Component({
	selector: 'app-dictionary',
	templateUrl: './dictionary.page.html',
	styleUrls: ['./dictionary.page.scss'],
})
export class DictionaryPage implements OnInit {

	inputVal!: string;
	suggestionList: object[] = [];
	suggestionListLoading: boolean = false;
	wordIsClick: boolean = false;
	notFond: boolean = false;
	wordObject: object[];
	notFondText: string;
	segmentValue = 'words';

	constructor(private global: GlobalService) {}

	ngOnInit() {}
	getval(e: any) {
		// console.log(e.target.value);
		const detail: SearchbarChangeEventDetail = e.detail;
		const value: string = detail.value;
		// console.log(value);
		
		
		if (value) {
			if (value.length>=3) {
				
				this.getData(value);
			}
		
			// console.log("clean");
		} else {
			this.suggestionList = [];
			this.notFond=false
		}
		// this.suggestionList=["a","ab","abc",this.inputVal]
	}
	searchbarIsFocus(){
		if (this.wordIsClick) {
			this.wordIsClick=false
		}
	}
	async suggestionListClickHandeler(val: object) {
		// console.log(e.target.value);
		this.wordIsClick=!this.wordIsClick
		await this.global.showLoading();
		// console.log(val);
		this.global
			.httpPost('dictionary/show', {
				word_id: val['word_id'],
			})
			.subscribe(
				async (res: any) => {
					// console.log(res);
					this.inputVal=val['title']
					this.wordObject=res.data
					this.suggestionList=[]
					// this.suggestionListLoading=[]
					this.global.dismisLoading();
					// this.suggestionList = res.data;
				},
				async (error: any) => {
					await this.global.dismisLoading();
					await this.global.showError(error);
					// console.log(error);
				}
			);
	}
	// suggestionListHoverHandeler(val: object) {
	// 	// console.log(e.target.value);
	// 	console.log(val);
	// 	console.log(val);

	// 	// this.inputVal=val
	// }
	getData(val: string): void {
		if (!this.wordIsClick) {
			
			this.suggestionListLoading = true;
			this.global
				.httpPost('dictionary/search', {
					search: val,
				})
				.subscribe(
					async (res: any) => {
						//  console.log(res);
						this.notFond=false
						this.suggestionListLoading = false;
	
						this.suggestionList = res.data;
					},
					async (error: any) => {
						this.suggestionListLoading = false;
						this.notFond=true
						this.suggestionList=[]
						// console.log(error.error.err.error);
						this.notFondText=error.error.err.error
						// setTimeout(() => {
							// this.inputVal = '';
						// }, 10000);
						
					
					}
				);
				
		}
	}

	segmentChanged(ev) {
		this.segmentValue = ev.detail.value;
	}
}
