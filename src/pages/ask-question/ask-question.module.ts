import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AskQuestionPage } from './ask-question';

@NgModule({
  declarations: [
    AskQuestionPage,
  ],
  imports: [
    IonicPageModule.forChild(AskQuestionPage),
  ],
})
export class AskQuestionPageModule {}
