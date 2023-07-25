import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AboutusComponent } from './aboutus/aboutus.component';
import { GlobalService } from './../services/global.service';
import { RuleComponent } from './rule/rule.component';
import { StorageService } from './../services/storage.service';
import { User } from './../models/user.model';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {
  mobilePattern: string = '09+[0-9].{0,}';

	phoneNumberForm: FormGroup;
  mobile!:string

  constructor(
 private fb:FormBuilder,
 private global:GlobalService,
 public alertController: AlertController,
 private storage: StorageService,
 public modalController: ModalController,
//  private storage: StorageService,
 public navCtrl: NavController,




  ) { 
    this.phoneNumberForm = this.fb.group({
			'new_mobile': [
				'',
				Validators.compose([
					Validators.required,
					Validators.pattern(this.mobilePattern),
					Validators.maxLength(11),
					Validators.minLength(11),
				]),
			],
		});
  }

  ngOnInit() {
  }

  submitPhoneNumberForm(){
    console.log(this.phoneNumberForm.valid);
    this.phoneNumberForm.markAllAsTouched()
    this.phoneNumberForm.controls.new_mobile.markAsDirty()
    if (this.phoneNumberForm.valid) {
      
      this.mobile=this.phoneNumberForm.value['new_mobile']
      this.global.httpPost('user/change-phone-number',
     { new_mobile:this.mobile}
      ).subscribe(
       async (res:any) => {
        this.presentAlertPrompt()
        this.phoneNumberForm.reset()
        console.log(res);
       },
       async (error:any) => {
        this.phoneNumberForm.reset()
        console.log(error);
       }
      )
    }else{
      this.global.showToast('لطفا شماره موبایل به شکل صحیح وارد کنید',700,'bottom','warning','ios')
    }

  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
   
   
      // header: '',
      message:`کد تایید ارسال شده به شماره ${  this.mobile} وارد کنید`,
      inputs: [
        
        {
          // cssClass:'form-input',
          name: 'token',
          type: 'text',
          id: 'token-id',
          attributes: {
            maxlength:5,
            minlength:5,
            autoFocus:true,
            required:true
          }
          // placeholder: 'Placeholder 2'
          
        },
        
        // multiline input.
        
      ],
      buttons: [
        {
          text: 'انصراف',
          role: 'cancel',
          cssClass: 'secondary',
         
        }, {
          text: 'ثبت',
          handler: async(alertData) => {
            // const pattern =/[0-9]/g;
            // let inputChar = String.fromCharCode(alertData.token.charCode);
        
            // console.log( parseInt( alertData.token).toString());
            if (alertData.token&&alertData.token.trim()!='') {
                // this.data=[]
                await this.global.showLoading()
                this.global.httpPost('user/check-token-change-number',{token:alertData.token,new_mobile:this.mobile}).subscribe(
                 async (res:any) => {
                
                 const userInfo = new User().deserialize({
                    token:  res['user_info'].token,
                    fullname: res['user_info']['full_name'],
                    mobile: res['user_info']['mobile'],
                  });
                  // console.log(object);
    
                  this.global.user = userInfo;
                  this.storage.set('user', this.global.user);
                  await this.global.dismisLoading()

                  // this.getData()
                 },
                 async (error:any) => {
                  await this.global.dismisLoading()
    
                  this.global.showError(error)
                 },
                )
                
            
              
            }else{
              this.global.showToast('لطفا کد ارسال شده وارد کنید',3000,'bottom','danger','ios')
            }
          }
        }
      ]
    });

    await alert.present();
  }
  async shareWithFriends() {
    await this.global.showLoading()
    let text
    this.global.httpGet(
      'support/introduce-to-friends',
     
    ).subscribe(
     async (res:any) => {
       await this.global.dismisLoading()
       console.log(res.data['share_text']);
       text=res.data['share_text']
      navigator.share({
        title: 'معرفی به دوستان',
        'text':text,
        }).then(function () {
          this.global.showToast('باتشکر از اشتراک گذاری شما')
        }).catch(function (error) {
            this.global.showError(error)
        });
     },
     async (error:any) => {
       await this.global.dismisLoading()
       await  this.global.showError(error)
       console.log(error);
       


     }
    )
        
   
}
	
async openAboutusModal(){
   
  const modal = await this.modalController.create({
    component: AboutusComponent,
    cssClass: 'my-custom-class',
    mode:'ios',
    // presentingElement:this.routerOutlet.nativeEl,
    swipeToClose:true,
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
async openRuleModal(){
   
  const modal = await this.modalController.create({
    component: RuleComponent,
    cssClass: 'my-custom-class',
    mode:'ios',
    // presentingElement:this.routerOutlet.nativeEl,
    swipeToClose:true,
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
  async presentAlertLogout() {
		const alert = await this.alertController.create({
			message: "آیا برای خروج اطمینان دارید ؟",
			cssClass: "alertCustomCss",
			buttons: [
				{
					text: "خیر",
					role: "cancel",
					cssClass: "secondary",
				},
				{
					text: "بلی",
					handler: () => {
						this.logOut();
					},
				},
			],
		});
		await alert.present();
	}

  async logOut() {
    await	this.global.showLoading()
     // this.global.showLoading().then(() => {
       this.global
         .httpPost(
           "user/logout",
           {
            
           },
         
         )
         .subscribe(
           
         async	(res) => {
           await this.global.dismisLoading()
             this.global.changeLogin(false);
             localStorage.clear();
             this.storage.clearAll()
             this.global.showToast("خروج با موفقیت انجام شد",500,'bottom','success','ios');
         
             this.navCtrl.navigateRoot("/login");
          
           },
           async	(error) => {
           await this.global.dismisLoading()
             this.global.showError(error);
           }
         );
     // });
   }
 

  // sendToken(){
  //   this.global.httpPost()
  // }

}
