import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  isViewAll:boolean = true;
  isReplyView:boolean = false;
  isReplyDone:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  reply(){
    this.isViewAll = false;
    this.isReplyView = true;
  }

  sendReply() {
    this.isReplyView = false;
    this.isViewAll = false;
    this.isReplyDone = true;
  }

  openMyProfile(isOtherUser) {
    this.navCtrl.push('MyProfilePage',{isOtherUserProfile : isOtherUser})
  }

}
