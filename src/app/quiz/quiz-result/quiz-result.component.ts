import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { constants } from 'src/app/constants/constant';
import { Questions } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {
  scoreBoard!: number;
  totalQuestion!: Questions[];
  quizList$!: Observable<Questions[]>;
  constructor(private readonly quizService: QuizService,
    private readonly router: Router) { 
    }
ngOnInit(): void {
  this.quizList$ = this.quizService.submitQuiz$.pipe(tap(data => {
    this.scoreBoard = data.filter(x => x.correctAnswer === x.selectedAnswer).length;
    this.totalQuestion = data;
    if(!this.totalQuestion.length) {
      this.router.navigate([`/${constants.QUIZ_ROUTE_PATH}`]);
    }
  }));
}

}
