import { Component, ViewChild } from '@angular/core';
import {IonicPage, MenuController, Nav, NavController} from 'ionic-angular';
import {Storage} from "@ionic/storage";

interface PageItem {
  title:string,
  pageName:string,
  index:any
}
type PageList = PageItem[]

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';
  pages: PageList;
  // userImage: any = 'https://lh3.googleusercontent.com/a-/AOh14GgnBngLvYHn8av0L2N_LQTTe5ptOErUEg46_MyjXg';
  userImage: any = 'assets/img/profile-default.jpeg';
  fullName: any = 'User Full Name';

  constructor(public navCtrl: NavController,
              public storage : Storage,
              public menuCtrl : MenuController) {
  }

  ionViewDidLoad() {
    this.storage.get('userData').then(data=>{
      let userData = JSON.parse(data)
      if(userData && userData.user_profile !== ''){
        console.log('user profile is ---',userData.user_profile);
        this.userImage=userData.user_profile;
      }
      if(userData && userData.user_login){
        this.fullName = userData.user_login;
      }
    })
    //Open Default Home Page
    this.openPage({ title: 'Home', pageName: 'TabsPage', index: 0 }, false)
  }

  editProfile(){
    this.navCtrl.push('EditProfilePage');
  }

  openMyProfile(isOtherUser) {
    this.navCtrl.push('MyProfilePage',{isOtherUserProfile : isOtherUser})
  }

  openPage(page, isToggle) {
    let params = {};
    if (isToggle){
      this.menuCtrl.toggle();
    }
    if (page.index) {
      params = { tabIndex: page.index };
    }
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      this.nav.setRoot(page.pageName, params);
    }
  }

  logout() {
    this.storage.set('userData',null);
    this.navCtrl.setRoot('LoginPage');
  }
}
