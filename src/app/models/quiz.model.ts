import { FormArray } from "@angular/forms";

export interface TriviaCategories {
  trivia_categories: TriviaCategorie[];
}

export interface TriviaCategorie {
  id: number;
  name: string;
}

export interface QuizList{
  results: Questions[];
}

export interface Questions {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  listOfOptions: string[];
  selectedAnswer:string;
  correctAnswer: string;
}

export interface QuizForm {
  question: string;
  correctAnswer: string;
  listOfOptions: string;
  selectedAnswer: string;
}

export interface PayloadRequest {
  amount: number;
  category: number;
  difficulty: string;
  type: string;
}
