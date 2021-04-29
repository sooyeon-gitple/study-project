import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from '../app/model/question-base';

@Injectable({
  providedIn: 'root',
})
export class QuestionControlService {
  constructor() {}

  toFormGroup(questions: QuestionBase<string>[]): FormGroup {
    const group: any = {};

    questions.forEach((q) => {
      group[q.key] = q.required
        ? new FormControl(q.value || '', Validators.required)
        : new FormControl(q.value || '');
    });

    return new FormGroup(group);
  }
}
