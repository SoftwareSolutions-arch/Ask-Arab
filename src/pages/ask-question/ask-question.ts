import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AskQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ask-question',
  templateUrl: 'ask-question.html',
})
export class AskQuestionPage {

  isPoll:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AskQuestionPage');
  }
  openPollBox(){
    console.log('openPollBox >>', this.isPoll);
    this.isPoll?this.isPoll=false:this.isPoll=true;
  }

}
