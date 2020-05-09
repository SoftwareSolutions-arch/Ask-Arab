import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
import {Camera} from "@ionic-native/camera";
import { HTTP } from '@ionic-native/http';


@Injectable()
export class User {
  _user: any;
  base64Image: any;
  loginUrl:string = 'login/';
  register: string = 'User_registration/';
  forgotPassword: string = 'ForgotPassword/';
  socialLogin: string = 'socialLogin';
  editProfile: string = 'editProfile/';
  deleteAccount: string = 'deleteAccount/';
  changeOldPassword: string = 'changeOldPassword/';
  getArticals: string = 'getArticals/';
  countries: string = 'getCountry/';
  states: string = 'getStates/';

  constructor(private camera: Camera,public api: Api,private http: HTTP) { }

  login(accountInfo: any) {
    let seq = this.api.post(this.loginUrl, accountInfo).share();
    seq.subscribe((res: any) => {
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  signup(accountInfo: any) {
    let seq = this.api.post(this.register, accountInfo).share();

    seq.subscribe((res: any) => {
      console.log('signup response ----', res);
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }


  socialLoginApi(data: any) {
    let seq = this.api.post(this.socialLogin, data).share();
    return seq;
  }
  changePassword(data: any) {
    let seq = this.api.post(this.changeOldPassword, data).share();
    return seq;
  }
  deleteUserAccount(data: any) {
    let seq = this.api.post(this.deleteAccount, data).share();
    return seq;
  }
  forgotPasswordApi(data: any) {
    let seq = this.api.post(this.forgotPassword, data).share();
    return seq;
  }

  logout() {
    this._user = null;
  }

  _loggedIn(resp) {
    this._user = resp.user;
  }

  takePicture() {
    this.camera.getPicture({
      targetWidth: 512,
      targetHeight: 512,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  aceesGallery() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  saveProfile(data:any) {
    let res = this.api.post(this.editProfile, data).share();
    return res;
  }

  getArticalsList() {
    let seq = this.api.get(this.getArticals,{},{}).share();
    return seq;
  }

  getCountryList() {
    let seq = this.api.get(this.countries,{},{}).share();
    return seq;
  }
  getStateList() {
    let seq = this.api.get(this.states,{},{}).share();
    return seq;
  }
}
