import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { PayloadRequest, Questions, QuizList, TriviaCategories } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  submitQuiz$ = new BehaviorSubject<Questions[]>([]);
  constructor(private readonly http: HttpClient) { }

  getQuizCategoriesList(): Observable<TriviaCategories> {
    return this.http.get<TriviaCategories>('https://opentdb.com/api_category.php');
  }

  getQuizList(payload: PayloadRequest): Observable<Questions[]> {
    return this.http.get<QuizList>(`https://opentdb.com/api.php?amount=${payload.amount}&category=${payload.category}&difficulty=${payload.difficulty}&type=${payload.type}`).pipe(
      map(data => data.results));
  }
}
