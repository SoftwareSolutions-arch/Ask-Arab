import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";

/**
 * Generated class for the ArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {

  constructor(public navCtrl: NavController,
              public user: User,
              public util:UtilProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlePage');
  }

  ngOnInit(){
    this.getAllArticles()
  }
  gotoWriteArticle() {
    this.navCtrl.push('WriteArticlePage');
  }

  openReadArticle() {
    this.navCtrl.push('ReadArticlePage')
  }

  openMyProfile(b) {
    this.navCtrl.push('MyProfilePage',{isOtherUserProfile : b})
  }

  private getAllArticles() {
    this.util.presentLoading();
    this.user.getArticalsList().subscribe((resp) => {
      console.log('response all articles >>>',resp)
      let response :any= resp
      this.util.dismissLoading();
      this.util.presentToast(response.message);
    }, (err) => {
      console.error('ERROR :', err);
      this.util.dismissLoading();
      this.util.presentToast(err.error.message);
    });
  }
}
