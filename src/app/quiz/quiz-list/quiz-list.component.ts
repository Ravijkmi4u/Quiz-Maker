import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map, switchMap } from 'rxjs';
import { constants } from 'src/app/constants/constant';
import { Questions } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit, OnDestroy {
  @Input() quizData!: Questions[] | null;
  @Input() quizeFinished = false;
  quizForm!: FormGroup;
  private subscription!: Subscription;
  loading = false;
  constructor(private readonly quizService: QuizService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder) { 
    }


  ngOnInit(): void {
    this.quizForm = new FormGroup({
      questions: new FormArray([])
    });
    
    if(!this.quizeFinished) {
      this.subscription = this.route.queryParams.pipe(switchMap(paramMap => {
        this.loading = true;
        (this.quizForm.get("questions") as FormArray).clear();
        const payload = {
          amount: 5,
          category: paramMap['category'],
          difficulty: paramMap['difficulty'],
          type: 'multiple'
        }
        return this.quizService.getQuizList(payload).pipe(map(data => data.map(question => {
          const options = [...question.incorrect_answers, question.correct_answer]
          return {
            ...question,
            correctAnswer: question.correct_answer,
            listOfOptions: this.randomizeQuizOptions(options)
          }
        })))
      })).subscribe(data => {
        this.fetchQuizList(data);
      });
    } else {
      if(this.quizData) {
        this.createForm(this.quizData);
      }
    }
  }

  fetchQuizList(data: Questions[]): void {
    this.createForm(data);
    this.loading = false;
  }

  get questionFormArrayContols(): FormArray {
    return this.quizForm.get("questions") as FormArray;
  }

  createForm(data: Questions[]): void {
    const questions = this.quizForm.get('questions') as FormArray;
      data.forEach(question => {
        questions.push(this.createQuizQuestion(question))
      });
  }

  createQuizQuestion(question: Questions): FormGroup {
    return this.formBuilder.group({
      question: [question.question],
      correctAnswer: [question.correctAnswer],
      listOfOptions: [question.listOfOptions],
      selectedAnswer: [question.selectedAnswer ?? null, Validators.required]
    });
  }

  selecteQuizOption(selectedOption: string, index: number): void {
    const questions = this.quizForm.get('questions') as FormArray;
    questions.controls[index].get('selectedAnswer')?.setValue(selectedOption);
  }

  finisheQuiz(): void {
    if (this.quizForm.valid) {
      this.quizService.submitQuiz$.next(this.quizForm.value.questions);
      this.router.navigate([`${constants.QUIZ_ROUTE_PATH}/${constants.QUIZ_RESULT_ROUTE_PATH}`]);
    }
  }

  private randomizeQuizOptions(options: string[]): string[] {
    let index = options.length;
    let randomIndex = 0;
    while (index != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * index);
      index--;
      // And swap it with the current element.
      [options[index], options[randomIndex]] = [options[randomIndex], options[index]];
    }
    return options;
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
