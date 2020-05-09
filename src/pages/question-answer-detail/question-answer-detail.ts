import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the QuestionAnswerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-answer-detail',
  templateUrl: 'question-answer-detail.html',
})
export class QuestionAnswerDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionAnswerDetailPage');
  }

  openMyProfile(isOtherUser: boolean) {
    this.navCtrl.push('MyProfilePage');
  }

  done() {
    this.viewCtrl.dismiss();
  }
}
