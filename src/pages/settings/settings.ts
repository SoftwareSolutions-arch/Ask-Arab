import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UtilProvider} from "../../providers/util/util";
import {User} from "../../providers";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  options: any;
  laguage: string = 'default';
  userData:any = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public util: UtilProvider,
    public user: User,
    public storage:Storage,
    public translate: TranslateService) {
    this.storage.get('userData').then(data=>{
      this.userData = JSON.parse(data);
    })
  }


  gotoEditProfile() {
    this.navCtrl.push('EditProfilePage');
  }

  selectLanguage() {
    console.log('select language called !!', this.laguage);
    /*if (this.laguage == 'default'){
      this.translate.setDefaultLang('en');
    }else {
      this.translate.setDefaultLang('ar');
    }*/
  }

  openMyProfile(b: boolean) {
    this.navCtrl.push('MyProfilePage',{isOtherUserProfile : b})
  }

  gotoChangePassword() {
    this.navCtrl.push('ChangePasswordPage');
  }

  deleteAccount() {
    this.util.presentConfirm('Confirm Delete','Are you sure you want to Delete your Account?').then(()=>{
      this.util.presentLoading();
      let formData = new FormData();
      formData.append('ID',this.userData.ID);

      this.user.deleteUserAccount(formData).subscribe((resp) => {
        let response :any= resp;
        this.util.dismissLoading();
        this.util.presentToast(response.message);
        if(response.status){
          this.navCtrl.setRoot('LoginPage');
        }
      }, (err) => {
        console.error('ERROR :', err);
        this.util.dismissLoading();
        this.util.presentToast(err.error.message);
      });
    })
  }
}
