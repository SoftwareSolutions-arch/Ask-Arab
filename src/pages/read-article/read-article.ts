import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReadArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-read-article',
  templateUrl: 'read-article.html',
})
export class ReadArticlePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadArticlePage');
  }

  openMyProfile() {
    this.navCtrl.push('MyProfilePage');
  }

  reply() {

  }

  gotoOtherProfile() {
    this.navCtrl.push('MyProfilePage')
  }
}
