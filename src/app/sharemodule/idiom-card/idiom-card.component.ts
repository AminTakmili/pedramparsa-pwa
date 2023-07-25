import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Definitions, Examples, Idioms } from 'src/app/models/idioms.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-idiom-card',
	templateUrl: './idiom-card.component.html',
	styleUrls: ['./idiom-card.component.scss'],
})
export class IdiomCardComponent implements OnInit, OnChanges {

	wordId!: string | number;
	idioms: Idioms[] = [];
	@Input() wordArray: any;

	constructor(
		private global: GlobalService
	) { }

	ngOnInit() { }

	ngOnChanges(changes: SimpleChanges): void {
		this.wordId = changes.wordArray.currentValue[0]['word_id'];
		if (this.wordId) {
			this.global.httpPost(
				'dictionary/idioms',
				{
					word_id: this.wordId
				}
			).subscribe(
				async (res: any) => {
					this.idioms = res.map((itemss: Idioms) => {
						itemss.definitions = itemss.definitions.map((items: Definitions) => {
							items.examples = items.examples.map((item: Examples) => new Examples().deserialize(item));
							return new Definitions().deserialize(items);
						});
						return new Idioms().deserialize(itemss);
					});
				},
				async (error: any) => {
					this.global.showError(error);
				},
			);
		}
	}

}
