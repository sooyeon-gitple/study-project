import { QuestionBase } from '../app/model/question-base';

export class TextAreaQuestion extends QuestionBase<string> {
  controlType = 'textarea';
}
