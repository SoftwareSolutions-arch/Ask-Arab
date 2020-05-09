import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionAnswerDetailPage } from './question-answer-detail';

@NgModule({
  declarations: [
    QuestionAnswerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionAnswerDetailPage),
  ],
})
export class QuestionAnswerDetailPageModule {}
