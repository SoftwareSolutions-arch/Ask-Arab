import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QuestionAnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-answer',
  templateUrl: 'question-answer.html',
})
export class QuestionAnswerPage {
  segment = 'question';
  shownSessions: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionAnswerPage');
  }

  updateSchedule() {
    this.shownSessions>0?this.shownSessions=0:this.shownSessions=1;
  }

  openMyProfile(isOtherUser: boolean) {

  }

  gotoQuestionDetail() {
    this.navCtrl.push('QuestionAnswerDetailPage')
  }
}
