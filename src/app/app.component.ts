import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Platform } from 'ionic-angular';

import { Settings } from '../providers';
import {Storage} from "@ionic/storage";

@Component({
  template: `<ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = '';

  constructor(private translate: TranslateService,
              public storage:Storage,
              platform: Platform,
              settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // storage.set('userData','{"ID":"2793","user_login":"mukesh","user_profile":"","user_pass":"","user_nicename":"","user_email":"","first_name":"","last_name":"","user_address":"","user_gender":"","mobile_no":"","user_dob":"0000-00-00","my_bio":"","select_country":"","select_state":"","user_url":"","user_registered":"0000-00-00 00:00:00","user_activation_key":"","user_status":"0","display_name":"","Firebase_token":"cInoK2yJXY0:APA91bFoP_bZ8XudA2DZDSkzhztsC3psXDSQ4Z7kdbN0uOvKIAqPZJc0emciuWwSyOr0CbOf0trGnY1gyCNPVN00j8RQ9Vc-Dzw1V_wSHpru-yhxCk8CbZt6f9AZkL6RKsLNaLS7n7CJ","status":"2"}')
      storage.get('userData').then(data=>{
        if(data){
          this.rootPage = 'MenuPage';
        }else {
          this.rootPage = 'LoginPage'
        }
      })
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    // this.translate.setDefaultLang('ar');
    /*const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }*/

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

}
