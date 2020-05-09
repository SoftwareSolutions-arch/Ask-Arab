import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReadArticlePage } from './read-article';

@NgModule({
  declarations: [
    ReadArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(ReadArticlePage),
  ],
})
export class ReadArticlePageModule {}
