import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { constants } from 'src/app/constants/constant';
import { TriviaCategorie } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-filter',
  templateUrl: './quiz-filter.component.html',
  styleUrls: ['./quiz-filter.component.scss']
})
export class QuizFilterComponent {
  categories$!: Observable<TriviaCategorie[]>;
  difficultyLevels: string[] = ['easy', 'medium', 'hard'];
  refreshParams = false;
  form = this.formBuilder.group({
    category:['', Validators.required],
    difficulty:['', Validators.required]
  });

  subscription!: Subscription;
  constructor(private readonly quizService: QuizService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categories$ = this.quizService.getQuizCategoriesList().pipe(map(data => data.trivia_categories));
    this.subscription = this.route.queryParams.subscribe(paramMap => {
      this.form.patchValue(paramMap);
      }
    );
  }

  createQuiz(): void {
    if(this.form.valid) {
      this.router.navigate([constants.QUIZ_LIST_ROUTE_PATH], { relativeTo: this.route, queryParams: { 
        category: this.form.value.category, 
        difficulty: this.form.value.difficulty,
        reload: this.refreshParams }});
        this.refreshParams = !this.refreshParams;
    }
  }
}
