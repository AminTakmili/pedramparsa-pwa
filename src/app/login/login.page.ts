import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GlobalService } from './../services/global.service';
import { NavController } from '@ionic/angular';
import { StorageService } from './../services/storage.service';
import { User } from './../models/user.model';

type tupleHeaderPage = [number, string, string, boolean];
@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	// phoneNumber:Number=09179340127;
	ischeck: boolean;
	mobile: string;
	wasRegister: boolean = false;
	public token: string;
	// mobilePattern : string="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}";
	mobilePattern: string = '09+[0-9].{0,}';
	// mobilePattern : string="09+[0-9]";
	checkIdTupelHeder: number = 0;
	// timer: number | string = `${1}:${35}`;
	time!: string
	ReSend: boolean = this.time == '0:0'

	loginForm: FormGroup;
	sendCode: FormGroup;
	registerForme: FormGroup;
	userInfo!: User;
	ruleInnerHtml: any;
	headerTuple: tupleHeaderPage[] = [
		[0, '', '', true],
		[1, 'بازگشت و تغییر شماره', 'arrow-back-outline', false],
		[2, 'اطلاعات اولیه', 'arrow-back-outline', false],
		[3, 'قوانین و ضوابط', 'close-outline', false],
	];

	constructor(
		private navCtrl: NavController,
		public global: GlobalService,
		private storage: StorageService,
		private fb: FormBuilder
	) {
		this.loginForm = this.fb.group({
			mobile: [
				'',
				Validators.compose([
					Validators.required,
					Validators.pattern(this.mobilePattern),
					Validators.maxLength(11),
					Validators.minLength(11),
				]),
			],
		});
		this.sendCode = this.fb.group({
			code: [
				'',
				Validators.compose([
					Validators.required,
					Validators.maxLength(5),
					Validators.minLength(5),
				]),
			],
		});
		this.registerForme = this.fb.group({
			full_name: ['', Validators.compose([Validators.required])],
			introducer_mobile: [
				'',
				Validators.compose([
					Validators.pattern(this.mobilePattern),
					Validators.maxLength(11),
					Validators.minLength(11),
				]),
			],
		});
	}

	ngOnInit() {
	}
	backButtonHandeler() {
		if (this.checkIdTupelHeder < 3 && this.checkIdTupelHeder > 0) {
			this.checkIdTupelHeder--;
		} else {
			this.checkIdTupelHeder = 0;
		}
	}
	handelLoginNavButton() {
		if (this.checkIdTupelHeder < 3) {
			this.checkIdTupelHeder++;
		} else {
			this.checkIdTupelHeder = 0;
			this.navCtrl.navigateRoot('/home');
		}
	}

	async SubmitLoginForm(resen = false) {
		this.loginForm.markAllAsTouched();
		this.loginForm.controls['mobile'].markAsDirty();
		// this.loginForm.markAsDirty()
		if (this.loginForm.valid) {
			await this.global.showLoading()
			this.mobile = this.loginForm.controls['mobile'].value;
			this.global
				.httpPost('user/send-token', {
					mobile: this.mobile,
				})
				.subscribe(
					async (res) => {
						await this.global.dismisLoading()
						if (!resen) {
							this.wasRegister = res.data['was_previously_register'];
							this.handelLoginNavButton();

						}
						// console.log(res.data['was_previously_register']);
						this.timer(1, 59)
						this.time = (`02:00`)

						// console.log(this.wasRegister);
						// this.navCtrl.navigateRoot('/home');

					},
					async (error) => {
						await this.global.dismisLoading()

						await this.global.dismisLoading();
						this.global.showError(error);
					}
				);
		}
		// else{
		// 	// console.log(this.loginForm);
		// 	// console.log(this.loginForm.status);
		// 	// console.log(this.loginForm.parent);
		// 	// console.log(this.loginForm.controls);
		// 	console.log(this.loginForm.controls['mobile']);
		// 	// console.log(this.loginForm.controls['mobile'].errors,"gghg");
		// 	console.log(this.loginForm.controls['mobile'].dirty,"dirty");
		// 	console.log(this.loginForm.controls['mobile'].touched,"touched");
		// 	// this
		// }
	}
	async sendsendCodeForm() {
		this.sendCode.markAllAsTouched();
		this.sendCode.controls['code'].markAsDirty();

		// this.sendCode.markAsDirty()
		if (this.sendCode.valid) {
			// this.mobile = this.sendCode.controls['mobile'].value;
			await this.global.showLoading('لطفا منتظر بمانید...');
			this.global
				.httpPost('user/check-token', {
					mobile: this.mobile,
					token: this.sendCode.controls['code'].value,
				})
				.subscribe(
					async (res) => {
						// console.log(res);
						// this.global.user = new User().deserialize(
						// 	{
						// 		token:res.token
						// 	}
						// 	);
						// this.global.token =res.token;
						this.token = res.token;
						// this.storage.set('user',this.global.user);
						// this.global.changeLogin(true);
						await this.global.dismisLoading();
						// console.log(this.global.user, 'this.global.user ');
						// console.log(this.global.login, 'this.global.login ');
						if (this.wasRegister) {
							this.userInfo = new User().deserialize({
								token: this.token,
								fullname: res['user_info']['full_name'],
								mobile: res['user_info']['mobile'],
							});
							// console.log(object);

							this.global.user = this.userInfo;
							this.storage.set('user', this.global.user);
							this.global.changeLogin(true);
							this.navCtrl.navigateRoot('/home');
						} else {
							this.handelLoginNavButton();
						}
					},
					async (error) => {
						// await this.global.showLoading('لطفا منتظر بمانید...');
						await this.global.dismisLoading();
						this.global.showError(error);
					}
				);
		}
		// else{
		// 	// console.log(this.sendCode);
		// 	// console.log(this.loginForm.status);
		// 	// console.log(this.loginForm.parent);
		// 	// console.log(this.loginForm.controls);
		// 	console.log(this.loginForm.controls['mobile']);
		// 	// console.log(this.loginForm.controls['mobile'].errors,"gghg");
		// 	console.log(this.loginForm.controls['mobile'].dirty,"dirty");
		// 	console.log(this.loginForm.controls['mobile'].touched,"touched");
		// 	// this
		// }
	}
	registerButtonHandeler() {
		this.registerForme.markAllAsTouched();
		this.registerForme.controls['full_name'].markAsDirty();

		// this.registerForme.markAsDirty()
		if (this.registerForme.valid) {
			// this.mobile = this.registerForme.controls['mobile'].value;
			this.global
				.httpPost(
					'user/fill-user-info',
					this.registerForme.value,
					this.token
				)
				.subscribe(
					async (res) => {
						// console.log(res);
						await this.global.showLoading('لطفا منتظر بمانید...');
						this.userInfo = new User().deserialize({
							token: this.token,
							fullname: this.registerForme.value['full_name'],
							mobile: this.mobile,
						});

						await this.global.dismisLoading();
						this.getRule();
						// console.log(this.global.user ,"this.global.user ");
						// console.log(this.global.login ,"this.global.login ");
						this.handelLoginNavButton();
					},
					async (error) => {
						await this.global.showLoading('لطفا منتظر بمانید...');
						await this.global.dismisLoading();
						this.global.showError(error);
					}
				);
		}
		// else{
		// 	// console.log(this.registerForme);
		// 	// console.log(this.loginForm.status);
		// 	// console.log(this.loginForm.parent);
		// 	// console.log(this.loginForm.controls);
		// 	console.log(this.loginForm.controls['mobile']);
		// 	// console.log(this.loginForm.controls['mobile'].errors,"gghg");
		// 	console.log(this.loginForm.controls['mobile'].dirty,"dirty");
		// 	console.log(this.loginForm.controls['mobile'].touched,"touched");
		// 	// this
		// }
	}
	acceptRule() {
		this.global.user = this.userInfo;
		this.storage.set('user', this.global.user);
		this.global.changeLogin(true);

		this.handelLoginNavButton();
	}
	getRule() {
		this.global.httpGet('support/terms', this.token).subscribe(
			async (res: any) => {
				// console.log(res.data[0].description);
				this.ruleInnerHtml = res.data[0].description;
			},
			async (error: any) => {
				this.global.showError(error);
				// console.log(error);
			}
		);
	}

	timer(Minutes: number = 0, seconds: number = 0, lang: string = 'en-US'): void {
		let timeSeconds: number = (Minutes * 60) + seconds;
		let timeInterval = setInterval(
			() => {
				let min = Math.floor(timeSeconds / 60).toLocaleString(lang, {
					minimumIntegerDigits: 2,
					useGrouping: false
				})
				let secend = (timeSeconds % 60).toLocaleString(lang, {
					minimumIntegerDigits: 2,
					useGrouping: false
				})
				this.time = `${min}:${secend}`;
				timeSeconds--;
				if (timeSeconds < 0) {
					clearInterval(timeInterval)
				}
			}
			, 1000)
	}
	changeCodeInput(e) {
		if (this.sendCode.controls['code'].value.length == 5) {
			this.sendsendCodeForm();
		}
	}
}