import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {

  isOtherUserProfile:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.isOtherUserProfile = this.navParams.data.isOtherUserProfile;
  }

  ionViewDidLoad() {
  }

  openAskQuestion() {
    this.navCtrl.push('AskQuestionPage');
  }
}
