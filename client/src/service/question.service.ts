import { Injectable } from '@angular/core';
import { TextboxQuestion } from '../app/question-textbox';
import { TextAreaQuestion } from '../app/question-textarea';
import { Observable, of } from 'rxjs';
import { QuestionBase } from 'src/app/model/question-base';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor() {}

  getQuestions(): Observable<QuestionBase<string>[]> {
    const questions: QuestionBase<string>[] = [
      new TextAreaQuestion({
        key: 'contents',
        label: 'contents',
        value: 'FAKE CONTENTSDLFKJSDLFKSDJFSDLKF',
        required: true,
        order: 2,
      }),

      new TextboxQuestion({
        key: 'title',
        label: 'title',
        value: 'FAKE TTITLE',
        required: true,
        order: 1,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
