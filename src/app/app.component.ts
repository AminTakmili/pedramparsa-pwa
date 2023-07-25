import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isDesktop = false;

  constructor(
    public global : GlobalService,
    private platform: Platform,
		// private splashScreen: SplashScreen,
		// private statusBar: StatusBar,
		// private screensizeService: ScreensizeService,
		// private update: SwUpdate,
		// private appRef: ApplicationRef,
    ) {


    this.global.setUserInfo();
	
	this.screnIsSmallHandeler()
		
	this.checkScrin()
	this.platform.resize.subscribe(async () => {
	// alert(this.isDesktop)
		// this.isDesktop = false;
		this.checkScrin()
	  });
  }
 
  screnIsSmallHandeler(){
		if (this.platform.testUserAgent('Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Mobile Safari/537.36')) {
			if (this.platform.width()==280) {
				this.global.showToast('برای استفاده بهتر از سایت اگر از گوشی مدل galaxy fold استفاده میکنید گوشی را باز کنید یا گوشی را بچرخانید',5000,'bottom','warning','ios')
			
			let onchengeInterval=setInterval(() => {
				
				if (this.platform.width()>280) {
			
					this.global.showToast('با تشکر از حسن توجه شما',6000,'bottom','success','ios');
				
				  clearInterval(onchengeInterval);
				}
			}, 100);
			setTimeout(() => {
				if (this.platform.width()>280) {	
						this.global.showToast('با تشکر از حسن توجه شما',6000,'bottom','success','ios');
					  clearInterval(onchengeInterval);
					}else{
						clearInterval(onchengeInterval);
					}
			}, 30000);
			}
		
		}else{
			if (this.platform.width()<363&&this.platform.height()>363) {
				this.global.showToast('برای استفاده بهتر از سایت گوشی را بچرخانید',3000,'bottom','warning','ios')
			
			let onchengeInterval=setInterval(() => {
				
				if (this.platform.width()>363) {
			
					this.global.showToast('با تشکر از حسن توجه شما',6000,'bottom','success','ios');
				
				  clearInterval(onchengeInterval);
				}
			}, 100);
			setTimeout(() => {
				if (this.platform.width()>363) {	
						this.global.showToast('با تشکر از حسن توجه شما',6000,'bottom','success','ios');
					  clearInterval(onchengeInterval);
					}else{
						clearInterval(onchengeInterval);
					}
			}, 30000);
			}
			if (this.platform.width()<363&&this.platform.height()<363) {
				this.global.showToast('برای استفاده بهتر از سایت از سیستم با صفحه نمایش بزگتر استفاده کنید ',3000,'bottom','warning','ios')
			
			let onchengeInterval=setInterval(() => {
				
				if (this.platform.width()>363) {
			
					this.global.showToast('با تشکر از حسن توجه شما',6000,'bottom','success','ios');
				
				  clearInterval(onchengeInterval);
				}
			}, 100);
			setTimeout(() => {
				if (this.platform.width()>363) {	
						this.global.showToast('با تشکر از حسن توجه شما',6000,'bottom','success','ios');
					  clearInterval(onchengeInterval);
					}else{
						clearInterval(onchengeInterval);
					}
			}, 30000);
			}
		}
	}
	checkScrin(){
		console.clear()
		// this.platform.resize.subscribe(async () => {
		// 	// global.showToast('Resize event detected');
		//   });
		// alert(this.isDesktop)
		  
		// console.log(this.platform.platforms());
		// console.log( this.platform.platforms().includes('mobile'));
		// console.log(this.platform.width());
		// console.log(this.platform.height());
		// console.log(this.platform.isLandscape());
		// console.log(navigator.userAgent);
		if (this.platform.platforms().indexOf('mobile')==-1) {
			// console.log('notmobail',this.platform.platforms());
			this.isDesktop=true
			// console.log(this.isDesktop);
			if (this.platform.width()<500) {
				this.isDesktop=false
			}

		}else{
			// console.log('mobail',this.platform.platforms());
			this.isDesktop=false

			if (this.platform.width()>500){
				this.isDesktop=true
				if (this.platform.height()<400) {
					this.isDesktop=false
				}

			}

				

			
		}
		// if (this.platform.width()>500) {
			
		// 	this.isDesktop=true
		// 	console.log('bigggg',this.isDesktop);

		// 	// if (this.platform.isLandscape()&&this.platform.platforms().indexOf('mobile')!=-1) {
		// 	// 	this.isDesktop=false
		// 	// }

		// }else{
		// 	console.log('small',this.isDesktop);
		// 	this.isDesktop=false
		// }
		// console.log(this.isDesktop);
		// this.platform.resize.subscribe(async () => {
		// 	if ( !this.platform.platforms().includes('mobile')) {
		// 		// console.log('notmobail');
		// 		this.isDesktop=true
		// 	}else{
		// 		this.isDesktop=false

		// 	}
			
		//   });
	}
}
