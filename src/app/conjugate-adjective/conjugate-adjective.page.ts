import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-conjugate-adjective',
	templateUrl: './conjugate-adjective.page.html',
	styleUrls: ['./conjugate-adjective.page.scss'],
})
export class ConjugateAdjectivePage implements OnInit {

	segmentValue = 'positiv';
	id: string;
	title: string;
	// 
	positive_acc_feminin: string;
	positive_acc_masculin: string;
	positive_acc_neuter: string;
	positive_acc_plural: string;
	positive_dat_feminin: string;
	positive_dat_masculin: string;
	positive_dat_neuter: string;
	positive_dat_plural: string;
	positive_gen_feminin: string;
	positive_gen_masculin: string;
	positive_gen_neuter: string;
	positive_gen_plural: string;
	positive_indef_acc_feminin: string;
	positive_indef_acc_masculin: string;
	positive_indef_acc_neuter: string;
	positive_indef_acc_plural: string;
	positive_indef_dat_feminin: string;
	positive_indef_dat_masculin: string;
	positive_indef_dat_neuter: string;
	positive_indef_dat_plural: string;
	positive_indef_gen_feminin: string;
	positive_indef_gen_masculin: string;
	positive_indef_gen_neuter: string;
	positive_indef_gen_plural: string;
	positive_indef_nom_feminin: string;
	positive_indef_nom_masculin: string;
	positive_indef_nom_neuter: string;
	positive_indef_nom_plural: string;
	positive_nom_feminin: string;
	positive_nom_masculin: string;
	positive_nom_neuter: string;
	positive_nom_plural: string;
	positive_pre_feminin: string;
	positive_pre_masculin: string;
	positive_pre_neuter: string;
	positive_pre_plural: string;
	positive_wo_acc_feminin: string;
	positive_wo_acc_masculin: string;
	positive_wo_acc_neuter: string;
	positive_wo_acc_plural: string;
	positive_wo_dat_feminin: string;
	positive_wo_dat_masculin: string;
	positive_wo_dat_neuter: string;
	positive_wo_dat_plural: string;
	positive_wo_gen_feminin: string;
	positive_wo_gen_masculin: string;
	positive_wo_gen_neuter: string;
	positive_wo_gen_plural: string;
	positive_wo_nom_feminin: string;
	positive_wo_nom_masculin: string;
	positive_wo_nom_neuter: string;
	positive_wo_nom_plural: string;
	// 
	comparative_acc_feminin: string;
	comparative_acc_masculin: string;
	comparative_acc_neuter: string;
	comparative_acc_plural: string;
	comparative_dat_feminin: string;
	comparative_dat_masculin: string;
	comparative_dat_neuter: string;
	comparative_dat_plural: string;
	comparative_gen_feminin: string;
	comparative_gen_masculin: string;
	comparative_gen_neuter: string;
	comparative_gen_plural: string;
	comparative_indef_acc_feminin: string;
	comparative_indef_acc_masculin: string;
	comparative_indef_acc_neuter: string;
	comparative_indef_acc_plural: string;
	comparative_indef_dat_feminin: string;
	comparative_indef_dat_masculin: string;
	comparative_indef_dat_neuter: string;
	comparative_indef_dat_plural: string;
	comparative_indef_gen_feminin: string;
	comparative_indef_gen_masculin: string;
	comparative_indef_gen_neuter: string;
	comparative_indef_gen_plural: string;
	comparative_indef_nom_feminin: string;
	comparative_indef_nom_masculin: string;
	comparative_indef_nom_neuter: string;
	comparative_indef_nom_plural: string;
	comparative_nom_feminin: string;
	comparative_nom_masculin: string;
	comparative_nom_neuter: string;
	comparative_nom_plural: string;
	comparative_pre_feminin: string;
	comparative_pre_masculin: string;
	comparative_pre_neuter: string;
	comparative_pre_plural: string;
	comparative_wo_acc_feminin: string;
	comparative_wo_acc_masculin: string;
	comparative_wo_acc_neuter: string;
	comparative_wo_acc_plural: string;
	comparative_wo_dat_feminin: string;
	comparative_wo_dat_masculin: string;
	comparative_wo_dat_neuter: string;
	comparative_wo_dat_plural: string;
	comparative_wo_gen_feminin: string;
	comparative_wo_gen_masculin: string;
	comparative_wo_gen_neuter: string;
	comparative_wo_gen_plural: string;
	comparative_wo_nom_feminin: string;
	comparative_wo_nom_masculin: string;
	comparative_wo_nom_neuter: string;
	comparative_wo_nom_plural: string;
	// 
	superlative_acc_feminin: string;
	superlative_acc_masculin: string;
	superlative_acc_neuter: string;
	superlative_acc_plural: string;
	superlative_dat_feminin: string;
	superlative_dat_masculin: string;
	superlative_dat_neuter: string;
	superlative_dat_plural: string;
	superlative_gen_feminin: string;
	superlative_gen_masculin: string;
	superlative_gen_neuter: string;
	superlative_gen_plural: string;
	superlative_indef_acc_feminin: string;
	superlative_indef_acc_masculin: string;
	superlative_indef_acc_neuter: string;
	superlative_indef_acc_plural: string;
	superlative_indef_dat_feminin: string;
	superlative_indef_dat_masculin: string;
	superlative_indef_dat_neuter: string;
	superlative_indef_dat_plural: string;
	superlative_indef_gen_feminin: string;
	superlative_indef_gen_masculin: string;
	superlative_indef_gen_neuter: string;
	superlative_indef_gen_plural: string;
	superlative_indef_nom_feminin: string;
	superlative_indef_nom_masculin: string;
	superlative_indef_nom_neuter: string;
	superlative_indef_nom_plural: string;
	superlative_nom_feminin: string;
	superlative_nom_masculin: string;
	superlative_nom_neuter: string;
	superlative_nom_plural: string;
	superlative_pre_feminin: string;
	superlative_pre_masculin: string;
	superlative_pre_neuter: string;
	superlative_pre_plural: string;
	superlative_wo_acc_feminin: string;
	superlative_wo_acc_masculin: string;
	superlative_wo_acc_neuter: string;
	superlative_wo_acc_plural: string;
	superlative_wo_dat_feminin: string;
	superlative_wo_dat_masculin: string;
	superlative_wo_dat_neuter: string;
	superlative_wo_dat_plural: string;
	superlative_wo_gen_feminin: string;
	superlative_wo_gen_masculin: string;
	superlative_wo_gen_neuter: string;
	superlative_wo_gen_plural: string;
	superlative_wo_nom_feminin: string;
	superlative_wo_nom_masculin: string;
	superlative_wo_nom_neuter: string;
	superlative_wo_nom_plural: string;

	constructor(
		private global: GlobalService,
		private rout: ActivatedRoute,
	) {
		this.id = this.rout.snapshot.paramMap.get('word_id');
	}

	ngOnInit() {
		this.getData();
	}

	getData() {
		this.global.httpPost(
			'dictionary/conjugate-adjective',
			{ word_id: this.id }
		).subscribe(
			async (res: any) => {
				res.map(items => {
					console.log(items);
					// 
					this.positive_acc_feminin = items.positive.acc_feminin;
					this.positive_acc_masculin = items.positive.acc_masculin;
					this.positive_acc_neuter = items.positive.acc_neuter;
					this.positive_acc_plural = items.positive.acc_plural;
					this.positive_dat_feminin = items.positive.dat_feminin;
					this.positive_dat_masculin = items.positive.dat_masculin;
					this.positive_dat_neuter = items.positive.dat_neuter;
					this.positive_dat_plural = items.positive.dat_plural;
					this.positive_gen_feminin = items.positive.gen_feminin;
					this.positive_gen_masculin = items.positive.gen_masculin;
					this.positive_gen_neuter = items.positive.gen_neuter;
					this.positive_gen_plural = items.positive.gen_plural;
					this.positive_indef_acc_feminin = items.positive.indef_acc_feminin;
					this.positive_indef_acc_masculin = items.positive.indef_acc_masculin;
					this.positive_indef_acc_neuter = items.positive.indef_acc_neuter;
					this.positive_indef_acc_plural = items.positive.indef_acc_plural;
					this.positive_indef_dat_feminin = items.positive.indef_dat_feminin;
					this.positive_indef_dat_masculin = items.positive.indef_dat_masculin;
					this.positive_indef_dat_neuter = items.positive.indef_dat_neuter;
					this.positive_indef_dat_plural = items.positive.indef_dat_plural;
					this.positive_indef_gen_feminin = items.positive.indef_gen_feminin;
					this.positive_indef_gen_masculin = items.positive.indef_gen_masculin;
					this.positive_indef_gen_neuter = items.positive.indef_gen_neuter;
					this.positive_indef_gen_plural = items.positive.indef_gen_plural;
					this.positive_indef_nom_feminin = items.positive.indef_nom_feminin;
					this.positive_indef_nom_masculin = items.positive.indef_nom_masculin;
					this.positive_indef_nom_neuter = items.positive.indef_nom_neuter;
					this.positive_indef_nom_plural = items.positive.indef_nom_plural;
					this.positive_nom_feminin = items.positive.nom_feminin;
					this.positive_nom_masculin = items.positive.nom_masculin;
					this.positive_nom_neuter = items.positive.nom_neuter;
					this.positive_nom_plural = items.positive.nom_plural;
					this.positive_pre_feminin = items.positive.pre_feminin;
					this.positive_pre_masculin = items.positive.pre_masculin;
					this.positive_pre_neuter = items.positive.pre_neuter;
					this.positive_pre_plural = items.positive.pre_plural;
					this.positive_wo_acc_feminin = items.positive.wo_acc_feminin;
					this.positive_wo_acc_masculin = items.positive.wo_acc_masculin;
					this.positive_wo_acc_neuter = items.positive.wo_acc_neuter;
					this.positive_wo_acc_plural = items.positive.wo_acc_plural;
					this.positive_wo_dat_feminin = items.positive.wo_dat_feminin;
					this.positive_wo_dat_masculin = items.positive.wo_dat_masculin;
					this.positive_wo_dat_neuter = items.positive.wo_dat_neuter;
					this.positive_wo_dat_plural = items.positive.wo_dat_plural;
					this.positive_wo_gen_feminin = items.positive.wo_gen_feminin;
					this.positive_wo_gen_masculin = items.positive.wo_gen_masculin;
					this.positive_wo_gen_neuter = items.positive.wo_gen_neuter;
					this.positive_wo_gen_plural = items.positive.wo_gen_plural;
					this.positive_wo_nom_feminin = items.positive.wo_nom_feminin;
					this.positive_wo_nom_masculin = items.positive.wo_nom_masculin;
					this.positive_wo_nom_neuter = items.positive.wo_nom_neuter;
					this.positive_wo_nom_plural = items.positive.wo_nom_plural;
					// 
					this.comparative_acc_feminin = items.comparative.acc_feminin;
					this.comparative_acc_masculin = items.comparative.acc_masculin;
					this.comparative_acc_neuter = items.comparative.acc_neuter;
					this.comparative_acc_plural = items.comparative.acc_plural;
					this.comparative_dat_feminin = items.comparative.dat_feminin;
					this.comparative_dat_masculin = items.comparative.dat_masculin;
					this.comparative_dat_neuter = items.comparative.dat_neuter;
					this.comparative_dat_plural = items.comparative.dat_plural;
					this.comparative_gen_feminin = items.comparative.gen_feminin;
					this.comparative_gen_masculin = items.comparative.gen_masculin;
					this.comparative_gen_neuter = items.comparative.gen_neuter;
					this.comparative_gen_plural = items.comparative.gen_plural;
					this.comparative_indef_acc_feminin = items.comparative.indef_acc_feminin;
					this.comparative_indef_acc_masculin = items.comparative.indef_acc_masculin;
					this.comparative_indef_acc_neuter = items.comparative.indef_acc_neuter;
					this.comparative_indef_acc_plural = items.comparative.indef_acc_plural;
					this.comparative_indef_dat_feminin = items.comparative.indef_dat_feminin;
					this.comparative_indef_dat_masculin = items.comparative.indef_dat_masculin;
					this.comparative_indef_dat_neuter = items.comparative.indef_dat_neuter;
					this.comparative_indef_dat_plural = items.comparative.indef_dat_plural;
					this.comparative_indef_gen_feminin = items.comparative.indef_gen_feminin;
					this.comparative_indef_gen_masculin = items.comparative.indef_gen_masculin;
					this.comparative_indef_gen_neuter = items.comparative.indef_gen_neuter;
					this.comparative_indef_gen_plural = items.comparative.indef_gen_plural;
					this.comparative_indef_nom_feminin = items.comparative.indef_nom_feminin;
					this.comparative_indef_nom_masculin = items.comparative.indef_nom_masculin;
					this.comparative_indef_nom_neuter = items.comparative.indef_nom_neuter;
					this.comparative_indef_nom_plural = items.comparative.indef_nom_plural;
					this.comparative_nom_feminin = items.comparative.nom_feminin;
					this.comparative_nom_masculin = items.comparative.nom_masculin;
					this.comparative_nom_neuter = items.comparative.nom_neuter;
					this.comparative_nom_plural = items.comparative.nom_plural;
					this.comparative_pre_feminin = items.comparative.pre_feminin;
					this.comparative_pre_masculin = items.comparative.pre_masculin;
					this.comparative_pre_neuter = items.comparative.pre_neuter;
					this.comparative_pre_plural = items.comparative.pre_plural;
					this.comparative_wo_acc_feminin = items.comparative.wo_acc_feminin;
					this.comparative_wo_acc_masculin = items.comparative.wo_acc_masculin;
					this.comparative_wo_acc_neuter = items.comparative.wo_acc_neuter;
					this.comparative_wo_acc_plural = items.comparative.wo_acc_plural;
					this.comparative_wo_dat_feminin = items.comparative.wo_dat_feminin;
					this.comparative_wo_dat_masculin = items.comparative.wo_dat_masculin;
					this.comparative_wo_dat_neuter = items.comparative.wo_dat_neuter;
					this.comparative_wo_dat_plural = items.comparative.wo_dat_plural;
					this.comparative_wo_gen_feminin = items.comparative.wo_gen_feminin;
					this.comparative_wo_gen_masculin = items.comparative.wo_gen_masculin;
					this.comparative_wo_gen_neuter = items.comparative.wo_gen_neuter;
					this.comparative_wo_gen_plural = items.comparative.wo_gen_plural;
					this.comparative_wo_nom_feminin = items.comparative.wo_nom_feminin;
					this.comparative_wo_nom_masculin = items.comparative.wo_nom_masculin;
					this.comparative_wo_nom_neuter = items.comparative.wo_nom_neuter;
					this.comparative_wo_nom_plural = items.comparative.wo_nom_plural;
					// 
					this.superlative_acc_feminin = items.superlative.acc_feminin;
					this.superlative_acc_masculin = items.superlative.acc_masculin;
					this.superlative_acc_neuter = items.superlative.acc_neuter;
					this.superlative_acc_plural = items.superlative.acc_plural;
					this.superlative_dat_feminin = items.superlative.dat_feminin;
					this.superlative_dat_masculin = items.superlative.dat_masculin;
					this.superlative_dat_neuter = items.superlative.dat_neuter;
					this.superlative_dat_plural = items.superlative.dat_plural;
					this.superlative_gen_feminin = items.superlative.gen_feminin;
					this.superlative_gen_masculin = items.superlative.gen_masculin;
					this.superlative_gen_neuter = items.superlative.gen_neuter;
					this.superlative_gen_plural = items.superlative.gen_plural;
					this.superlative_indef_acc_feminin = items.superlative.indef_acc_feminin;
					this.superlative_indef_acc_masculin = items.superlative.indef_acc_masculin;
					this.superlative_indef_acc_neuter = items.superlative.indef_acc_neuter;
					this.superlative_indef_acc_plural = items.superlative.indef_acc_plural;
					this.superlative_indef_dat_feminin = items.superlative.indef_dat_feminin;
					this.superlative_indef_dat_masculin = items.superlative.indef_dat_masculin;
					this.superlative_indef_dat_neuter = items.superlative.indef_dat_neuter;
					this.superlative_indef_dat_plural = items.superlative.indef_dat_plural;
					this.superlative_indef_gen_feminin = items.superlative.indef_gen_feminin;
					this.superlative_indef_gen_masculin = items.superlative.indef_gen_masculin;
					this.superlative_indef_gen_neuter = items.superlative.indef_gen_neuter;
					this.superlative_indef_gen_plural = items.superlative.indef_gen_plural;
					this.superlative_indef_nom_feminin = items.superlative.indef_nom_feminin;
					this.superlative_indef_nom_masculin = items.superlative.indef_nom_masculin;
					this.superlative_indef_nom_neuter = items.superlative.indef_nom_neuter;
					this.superlative_indef_nom_plural = items.superlative.indef_nom_plural;
					this.superlative_nom_feminin = items.superlative.nom_feminin;
					this.superlative_nom_masculin = items.superlative.nom_masculin;
					this.superlative_nom_neuter = items.superlative.nom_neuter;
					this.superlative_nom_plural = items.superlative.nom_plural;
					this.superlative_pre_feminin = items.superlative.pre_feminin;
					this.superlative_pre_masculin = items.superlative.pre_masculin;
					this.superlative_pre_neuter = items.superlative.pre_neuter;
					this.superlative_pre_plural = items.superlative.pre_plural;
					this.superlative_wo_acc_feminin = items.superlative.wo_acc_feminin;
					this.superlative_wo_acc_masculin = items.superlative.wo_acc_masculin;
					this.superlative_wo_acc_neuter = items.superlative.wo_acc_neuter;
					this.superlative_wo_acc_plural = items.superlative.wo_acc_plural;
					this.superlative_wo_dat_feminin = items.superlative.wo_dat_feminin;
					this.superlative_wo_dat_masculin = items.superlative.wo_dat_masculin;
					this.superlative_wo_dat_neuter = items.superlative.wo_dat_neuter;
					this.superlative_wo_dat_plural = items.superlative.wo_dat_plural;
					this.superlative_wo_gen_feminin = items.superlative.wo_gen_feminin;
					this.superlative_wo_gen_masculin = items.superlative.wo_gen_masculin;
					this.superlative_wo_gen_neuter = items.superlative.wo_gen_neuter;
					this.superlative_wo_gen_plural = items.superlative.wo_gen_plural;
					this.superlative_wo_nom_feminin = items.superlative.wo_nom_feminin;
					this.superlative_wo_nom_masculin = items.superlative.wo_nom_masculin;
					this.superlative_wo_nom_neuter = items.superlative.wo_nom_neuter;
					this.superlative_wo_nom_plural = items.superlative.wo_nom_plural;
				});
			},
			async (error: any) => {
				console.log(error);
			},
		)
	}

	segmentChanged(ev) {
		this.segmentValue = ev.detail.value;
	}

}
