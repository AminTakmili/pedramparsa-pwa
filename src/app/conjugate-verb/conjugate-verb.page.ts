import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-conjugate-verb',
	templateUrl: './conjugate-verb.page.html',
	styleUrls: ['./conjugate-verb.page.scss'],
})
export class ConjugateVerbPage implements OnInit {

	id: string;
	title: string;
	// 
	pastI_du!: string;
	pastI_ese!: string;
	pastI_ich!: string;
	pastI_ihr!: string;
	pastI_sie!: string;
	pastI_wir!: string;
	pastK_du!: string;
	pastK_ese!: string;
	pastK_ich!: string;
	pastK_ihr!: string;
	pastK_sie!: string;
	pastK_wir!: string;
	// 
	presentI_du!: string;
	presentI_ese!: string;
	presentI_ich!: string;
	presentI_ihr!: string;
	presentI_sie!: string;
	presentI_wir!: string;
	presentK_du!: string;
	presentK_ese!: string;
	presentK_ich!: string;
	presentK_ihr!: string;
	presentK_sie!: string;
	presentK_wir!: string;
	// 
	future1I_value!: string;
	future1Infinitiv_futur!: string;
	future1Infinitiv_futur_help!: string;
	future1K2_value!: string;
	future1K_value!: string;
	// 
	future2I_value!: string;
	future2I_value_corrected!: string;
	future2Infinitiv_futur!: string;
	future2Infinitiv_futur_help!: string;
	future2Infinitiv_futur_corrected!: string;
	future2K2_value!: string;
	future2K2_value_corrected!: string;
	future2K_value!: string;
	future2K_value_corrected!: string;
	// 
	imprativPlural!: string;
	imprativSingular_1!: string;
	imprativSingular_2!: string;
	// 
	perfectI_value!: string;
	perfectInfinitiv_perfekt!: string;
	perfectInfinitiv_perfekt_help!: string;
	perfectK_value!: string;
	// 
	plusperfectI_value!: string;
	plusperfectK_value!: string;
	// 

	constructor(
		private rout: ActivatedRoute,
		private global: GlobalService,
	) {
		this.id = this.rout.snapshot.paramMap.get('word_id');
	}

	ngOnInit() {
	}

	ionViewWillEnter() {
		this.getData();
	}

	getData() {
		this.global.httpPost(
			'dictionary/conjugate-verb',
			{ word_id: this.id }
		).subscribe(
			async (res: any) => {
				this.title = res.title;
				res.data.past.map(item => {
					this.pastI_du = item.i_du;
					this.pastI_ese = item.i_ese;
					this.pastI_ich = item.i_ich;
					this.pastI_ihr = item.i_ihr;
					this.pastI_sie = item.i_sie;
					this.pastI_wir = item.i_wir;
					this.pastK_du = item.k_du;
					this.pastK_ese = item.k_ese;
					this.pastK_ich = item.k_ich;
					this.pastK_ihr = item.k_ihr;
					this.pastK_sie = item.k_sie;
					this.pastK_wir = item.k_wir;
				});
				res.data.present.map((item) => {
					this.presentI_du = item.i_du;
					this.presentI_ese = item.i_ese;
					this.presentI_ich = item.i_ich;
					this.presentI_ihr = item.i_ihr;
					this.presentI_sie = item.i_sie;
					this.presentI_wir = item.i_wir;
					this.presentK_du = item.k_du;
					this.presentK_ese = item.k_ese;
					this.presentK_ich = item.k_ich;
					this.presentK_ihr = item.k_ihr;
					this.presentK_sie = item.k_sie;
					this.presentK_wir = item.k_wir;
				});
				// 
				this.future1I_value = res.data.future1.i_value;
				this.future1Infinitiv_futur = res.data.future1.infinitiv_futur;
				this.future1Infinitiv_futur_help = res.data.future1.infinitiv_futur_help;
				this.future1K2_value = res.data.future1.k2_value;
				this.future1K_value = res.data.future1.k_value;
				// 
				this.future2I_value = res.data.future2.i_value;
				this.future2Infinitiv_futur = res.data.future2.infinitiv_futur;
				this.future2Infinitiv_futur_help = res.data.future2.infinitiv_futur_help;
				this.future2K2_value = res.data.future2.k2_value;
				this.future2K_value = res.data.future2.k_value;
				this.future2I_value_corrected = res.data.future2.i_value_corrected
				this.future2Infinitiv_futur_corrected = res.data.future2.infinitiv_futur_corrected
				this.future2K2_value_corrected = res.data.future2.k2_value_corrected
				this.future2K_value_corrected = res.data.future2.k_value_corrected
				// 
				this.imprativPlural = res.data.imprativ.plural;
				this.imprativSingular_1 = res.data.imprativ.singular_1;
				this.imprativSingular_2 = res.data.imprativ.singular_2;
				// 
				this.perfectI_value = res.data.perfect.i_value;
				this.perfectInfinitiv_perfekt = res.data.perfect.infinitiv_perfekt;
				this.perfectInfinitiv_perfekt_help = res.data.perfect.infinitiv_perfekt_help;
				this.perfectK_value = res.data.perfect.k_value;
				// 
				this.plusperfectI_value = res.data.plusperfect.i_value;
				this.plusperfectK_value = res.data.plusperfect.k_value;
			},
			async (error: any) => {
				console.log(error);
			},
		)
	}

}
