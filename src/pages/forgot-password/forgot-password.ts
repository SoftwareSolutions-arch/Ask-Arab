import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  email: string = '';

  constructor(public navCtrl: NavController,
              public user: User,
              public util:UtilProvider,
              public navParams: NavParams,
              public viewCtrl : ViewController) {
  }

  ionViewDidLoad() {
  }

  back(){
    this.viewCtrl.dismiss();
  }

  private forgotPassWord() {
    if (this.email.trim() === '') {
      this.util.presentToast('Please Enter Email')
      return
    }
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(this.email.trim())) {
      this.util.presentLoading();
      let formData = new FormData();
      formData.append('user_email',this.email);

      this.user.forgotPasswordApi(formData).subscribe((resp) => {
        let response :any= resp
        this.util.dismissLoading();
        this.util.presentToast(response.message);
        this.viewCtrl.dismiss();
      }, (err) => {
        console.error('ERROR :', err);
        this.util.dismissLoading();
        this.util.presentToast(err.error.message);
      });
    }else {
      this.util.presentToast('Please enter valid mail id');
    }
  }

}
