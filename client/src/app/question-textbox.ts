import { QuestionBase } from './model/question-base';

export class TextboxQuestion extends QuestionBase<string> {
  controlType = 'textbox';
}
