import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../model/question-base';
import { QuestionControlService } from '../../service/question-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [QuestionControlService],
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] = [];
  @Input() state: 'post' | 'edit';
  form: FormGroup;
  payLoad = '';
  constructor(private qcs: QuestionControlService) {}

  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit(): void {
    const confirm = window.confirm(
      `글을 ${this.state === 'post' ? '등록' : '수정'} 하시겠습니까?`
    );
    this.payLoad = JSON.stringify(this.form.getRawValue());
    console.log(this.payLoad);
  }



}
