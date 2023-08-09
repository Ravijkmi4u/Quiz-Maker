import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { constants } from './constants/constant';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: constants.QUIZ_ROUTE_PATH },
  { path: constants.QUIZ_ROUTE_PATH, loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
