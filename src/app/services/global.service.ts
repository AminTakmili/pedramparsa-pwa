import { AlertButton, AlertController, LoadingController, NavController, ToastController } from "@ionic/angular";
import { BehaviorSubject, Observable, forkJoin } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";

import { StorageService } from "./storage.service";
import { User } from "../models/user.model";
import { environment } from 'src/environments/environment'

@Injectable({
	providedIn: 'root'
})
export class GlobalService {

	public loading: any;
	public login: boolean = false;
	public _login = new BehaviorSubject<boolean>(this.login);
	public user: User;
	public sitename: string = environment.sitename;

	constructor(
		private http: HttpClient,
		private storage: StorageService,
		private loadingController: LoadingController,
		private alertController: AlertController,
		private zone: NgZone,
		public navCtrl: NavController,
		private toastController: ToastController,
	) {
		
	}


	 httpPost(url: string, params: object,userToken:string= environment.token): Observable<any> {
	

		const token = (this.login ? this.user.access_token :userToken)
		let httpOptions;

		httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'device' : environment.device,
				Authorization: `Bearer ${token}`,
				// 'atriashop-user-id': this.getUserInfo().id.toString()
			})
		};
		return this.http.post<any>(this.getAppUrl(url), JSON.stringify(params), httpOptions);
	}

	httpGet(url: string,userToken:string = environment.token): Observable<any> {

		const token = (this.login ? this.user.access_token :userToken)
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'device' : environment.device,
				Authorization: 'Bearer ' + `${token}`,

			})
		};
		return this.http.get<any>(this.getAppUrl(url), httpOptions);

	}

	httpDelete(url: string, params: object): Observable<any> {

		const token = (this.login ? this.user.access_token : environment.token)

		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'device' : environment.device,
				Authorization: `Bearer ${token}`,
			}),
			body: params
		};

		return this.http.delete<any>(this.getAppUrl(url), httpOptions);
	}
	httpPatch(url: string, params: object): Observable<any> {
		const token = (this.login ? this.user.access_token : environment.token)

		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'device' : environment.device,
				Authorization: `Bearer ${token}`,
				// 'atriashop-user-id': this.getUserInfo().id.toString()
			})
		};

		return this.http.patch<any>(this.getAppUrl(url), params, httpOptions);
	}

	getAppUrl(method?: string) {
		if (method === undefined) {
			return environment.apiurl;
		} else {
			return environment.apiurl + method;
		}
	}

	async showLoading(text: string = 'لطفا منتظر بمانید...') {
		this.loading = await this.loadingController.create({
			message: text
		});
		await this.loading.present();

	}

	async dismisLoading() {
		// console.log(this.loading);
		await this.loading?.dismiss();
	}

	 justNumber(event: any) {
		const pattern = /[0-9.,]/;
		let inputChar = String.fromCharCode(event.charCode);

		// const number=[0,1,2,3,4,5,6,7,8,'0','1','2','3','4','5','6','7','7','8','9','۰','۱','۲','۳','۴','۵','۶','۷','۸','۹']

		if (!pattern.test(inputChar)) {
			// invalid character, prevent input
			event.preventDefault();
		}
	}

	async showError(err: HttpErrorResponse) {
		if (err.status === 403) {
			const alert = await this.alertController.create({
				header: 'عدم دسترسی',
				message: 'تلاش مجدد؟',
				buttons: [
					{
						text: 'خیر',
						role: 'cancel'
					}, {
						text: 'بلی',
						handler: () => {
							this.zone.runOutsideAngular(() => {

								this.changeLogin(false);
								this.storage.clearAll();
								// this.myCart.emptyCart();
								this.navCtrl.navigateRoot('/login')
							});
						}
					}
				]
			});
			await alert.present();
		} else if (err.status === 500 || err.status === 400) {
			const alert = await this.alertController.create({
				header: 'خطا',
				message: err.error.err.message,
				buttons: [
					{
						text: 'بستن',
						role: 'cancel'
					}
				]
			});

			await alert.present();
		}
		 else if (err.status === 401 ) {
			const alert = await this.alertController.create({
				header: 'خطا',
				message:'لطفا ابتدا وارد شوید',
				buttons: [
					{
						text: 'بستن',
						role: 'cancel',
						handler: () => {
							this.zone.runOutsideAngular(() => {

								this.changeLogin(false);
								this.storage.clearAll();
								// this.myCart.emptyCart();
								this.navCtrl.navigateRoot('/login')
							});
						}
					}
				]
			});

			await alert.present();
		}
	}

	async showToast(message: string, duration: number = 6000, position: 'top' | 'bottom' | 'middle' = 'top',color?:string,mode?:'ios'|'md', button? : any) {

		const toast = await this.toastController.create({
			message: message,
			color:color,
			mode:mode,
			duration: duration,
			position: position,
			buttons: button,
			animated: true
		});
		toast.present();
	}

	changeLogin(status: boolean) {
		this._login.next(status);
		this.login = status;
	}
	isLogin(){
		return this._login.getValue()
	}

	setUserInfo() {
		this.storage.get('user').then((val) => {
			if (val) {
				this.changeLogin(true);
				this.user = new User().deserialize(val);
			}
		});
	}

	showAlert(
		header: string,
		message: string,
		buttons: AlertButton[]
	): Promise<any> {
		return this.alertController.create({
			header: header,
			message: message,
			buttons: buttons,
		});
	}

	parallelRequest(requests: any[]) {
		return forkJoin(requests);
	}


}
