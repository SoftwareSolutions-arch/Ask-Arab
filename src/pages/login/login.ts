import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { User } from '../../providers';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import {HttpClient} from "@angular/common/http";
import {UtilProvider} from "../../providers/util/util";
import {FCM} from "@ionic-native/fcm";
import { GooglePlus } from '@ionic-native/google-plus';
import {Storage} from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: FormGroup;
  error_messages = {
    email: [
      { type: "required", message: "*Email is required." },
      { type: "pattern", message: "*Please enter a valid email address." }
    ],

    password: [
      { type: "required", message: "*Password is required." }
    ],
  };
  private firebaseToken: string = '';


  constructor(public navCtrl: NavController,
    public user: User,
    public formBuilder: FormBuilder,
    public util:UtilProvider,
    private fcm: FCM,
    private fb: Facebook,
    public storage:Storage,
    private googlePlus: GooglePlus,
    public httpClient: HttpClient) {
    this.setupLoginFormData();
    this.getFcmToken();
  }

  private getFcmToken() {
    this.fcm.getToken().then(token => {
      this.firebaseToken = token;
    });
  }
  // Attempt to login in through our User service
  doLogin() {
    /*let data = {
      user_email:this.loginForm.value.email,
      user_pass:this.loginForm.value.password,
      Firebase_token:this.firebaseToken
    };*/
    let formData = new FormData();
    formData.append('user_email',this.loginForm.value.email);
    formData.append('user_pass',this.loginForm.value.password);
    formData.append('Firebase_token',this.firebaseToken);
    this.util.presentLoading();
    this.user.login(formData).subscribe((resp) => {
      let response:any = resp;
      this.storage.set('userData', JSON.stringify(response.data))
      this.util.dismissLoading();
      this.navCtrl.setRoot('MenuPage')
    }, (err) => {
      this.util.dismissLoading();
      this.util.presentToast(err.error.message);
      console.error('ERROR :',err);
    });
  }
  openForgotPassord(){
    this.navCtrl.push('ForgotPasswordPage')
  }
  openSignUpPage(){
    this.navCtrl.push('SignupPage')
  }

  fbLogin() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        let authResponse = res.authResponse;
        if (authResponse.accessToken) {
          this.httpClient.get(`https://graph.facebook.com/me?fields=name,email,picture.width(400).height(400)&access_token=${authResponse.accessToken}`).subscribe(
            data=> {
              let fbResponse:any = data;
              this.callSocialRegisterApi(fbResponse.name,fbResponse.email,fbResponse.picture.data.url,2);
            },error => {
              console.log(error);
            }
          );
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  googleLogin(){
    this.googlePlus.login({})
      .then(res => {
        console.log('response ====>', res);
        let googleData : any = res;
        this.callSocialRegisterApi(googleData.givenName,googleData.email,googleData.imageUrl,3);
      })
      .catch(err => console.error(err));
  }

  callSocialRegisterApi(name: any, email:any, imageUrl: any, status:number) {
    this.util.presentLoading();
    let socialData = {
      user_login:name,
      user_email:email,
      user_profile:imageUrl,
      status:status,
      Firebase_token:this.firebaseToken
    }
    this.user.socialLoginApi(socialData).subscribe((resp) => {
      let response : any = resp;
      this.storage.set('userData', JSON.stringify(response.data));
      this.util.dismissLoading();
      this.navCtrl.setRoot('MenuPage')
    }, (err) => {
      console.error('ERROR :',err);
      this.util.dismissLoading();
    });
  }

  setupLoginFormData() {
    this.loginForm = this.formBuilder.group(
      {
        email: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
          ])
        ),
        password: new FormControl(
          "",
          Validators.compose([
            Validators.required,
          ])
        ),
      },
    );
  }
}
