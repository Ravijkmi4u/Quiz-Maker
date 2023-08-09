import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { constants } from '../constants/constant';

const routes: Routes = [
  {
    path: '', component: QuizComponent,
    children: [
      { path: 'list', component: QuizListComponent },
      { path: 'result', component: QuizResultComponent },
      {path: '**', redirectTo: constants.QUIZ_LIST_ROUTE_PATH }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
