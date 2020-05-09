import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostAnswerPage } from './post-answer';

@NgModule({
  declarations: [
    PostAnswerPage,
  ],
  imports: [
    IonicPageModule.forChild(PostAnswerPage),
  ],
})
export class PostAnswerPageModule {}
