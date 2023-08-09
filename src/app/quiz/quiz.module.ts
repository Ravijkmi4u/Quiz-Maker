import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { QuizService } from '../services/quiz.service';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { QuizFilterComponent } from './quiz-filter/quiz-filter.component';
import { LoaderComponent } from '../shared/loader/loader.component';


@NgModule({
  declarations: [
    QuizComponent,
    QuizListComponent,
    QuizResultComponent,
    QuizFilterComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    ReactiveFormsModule
  ],
  providers:[QuizService]
})
export class QuizModule { }
