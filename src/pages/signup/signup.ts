import { Component } from '@angular/core';
import {IonicPage, NavController, ViewController} from 'ionic-angular';

import { User } from '../../providers';
import {UtilProvider} from "../../providers/util/util";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { FCM } from '@ionic-native/fcm';
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import {HttpClient} from "@angular/common/http";
import { GooglePlus } from '@ionic-native/google-plus';
import {Storage} from "@ionic/storage";


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  signupForm: FormGroup;
  error_messages = {
    username: [
      { type: "required", message: "Username is required." }
    ],
    email: [
      { type: "required", message: "Email is required." },
      { type: "pattern", message: "Please enter a valid email address." }
    ],

    password: [
      { type: "required", message: "Password is required." },
      { type: "minlength", message: "Minimum password length should be 8." },
      { type: "maxlength", message: "Maximum password length should be 12." }
    ]
  };
  private firebaseToken: string = '';

  constructor(public navCtrl: NavController,
    public user: User,
    public util:UtilProvider,
    private fcm: FCM,
    private fb: Facebook,
    public storage:Storage,
    private googlePlus: GooglePlus,
    public httpClient: HttpClient,
    public formBuilder: FormBuilder,
    public viewCtrl : ViewController) {

    this.setupFormData()
    this.getFcmToken()
  }

  back(){
    this.viewCtrl.dismiss();
  }

  create() {
    let account = {
      user_login: this.signupForm.value.username,
      user_email: this.signupForm.value.email,
      user_pass: this.signupForm.value.password,
      Firebase_token: this.firebaseToken
    };

    this.util.presentLoading();
    this.user.signup(account).subscribe((resp) => {
      let response :any = resp;
      this.util.dismissLoading();
      if(response.status){
        this.util.presentToast('Your Account Created Successfully, Please Login.');
        this.viewCtrl.dismiss();
      }else {
        this.util.presentToast(response.message);
      }
    }, (err) => {
      this.util.dismissLoading();
    });
  }

  private setupFormData() {
    this.signupForm = this.formBuilder.group(
      {
        username: new FormControl(
          "",
          Validators.compose([
            Validators.required
          ])
        ),
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
            Validators.minLength(8),
            Validators.maxLength(12)
          ])
        )
      }
    );
  }

  private getFcmToken() {
    this.fcm.getToken().then(token => {
      this.firebaseToken = token;
    });
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
}
