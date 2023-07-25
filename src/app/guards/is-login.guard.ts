import { StorageService } from './../services/storage.service';
import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {
  constructor(
		// private router: Router,
		private global: GlobalService,
		private navCtrl: NavController,
    private storage: StorageService,

	) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.global.isLogin());
      if (!this.global._login.value) {
        return true;
      } else {
        // this.global.showToast('لطفا وارد حساب کاربری شوید !', 2000, 'top');
        this.navCtrl.navigateRoot('');
      }
    return true;
  }
  
}
