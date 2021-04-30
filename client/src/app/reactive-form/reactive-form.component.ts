import { Component, OnInit, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import { ContentsService } from '../../service/contents.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalState } from 'src/service/global-state.service';
import { User } from '../model/user';
import { Content } from '../model/content';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  @Input() state: 'post' | 'edit';
  @Input() id: string;
  @Input() postingModel: Content = {
    userId: '',
    title: '',
    text: '',
    date: new Date(),
  };
  // profileForm = new FormGroup({

  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),

  //   address: new FormGroup({
  //     street: new FormControl(''),
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     zip: new FormControl(''),
  //   }),
  // });

  contentForm = this.formBuilder.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
    // address: this.formBuilder.group({
    //   street: [''],
    //   city: [''],
    //   state: [''],
    //   zip: [''],
    // }),
    // tags: this.formBuilder.array([this.formBuilder.control('#123')]),
  });
  userData: User;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private contentService: ContentsService,
    private router: Router,
    private _state: GlobalState
  ) {}

  ngOnInit(): void {
    this._state.subscribeBehavior('login', (userData) => {
      this.userData = userData;
    });
    // if(this.state==="edit"){
    //   this.contentForm.patchValue()
    // }
    this.detectChange();
  }

  detectChange(): void {
    // this.contentForm.valueChanges.subscribe((value) => console.log(value));
    // const a = this.contentForm.get('title');
    // a.valueChanges.subscribe( v => console.log(v))
    this.contentForm.statusChanges.subscribe( a => console.log(a))
  }

  onSubmit(): void {
    console.warn(this.contentForm.value);
    const formValue = {
      ...this.contentForm.value,
      userId: this.userData.userId,
    };

    const confirm = window.confirm(
      `글을 ${this.state === 'post' ? '등록' : '수정'} 하시겠습니까?`
    );

    if (confirm && this.state === 'post') {
      // check data
      if (!formValue.title || !formValue.text) {
        return window.alert('제목과 내용을 입력해야합니다.');
      }
      this.postContent(formValue);
    } else if (confirm && this.state === 'edit') {
      this.editContent(formValue);
    }
  }

  postContent(formValue): void {
    this.contentService
      .postNewContent(this.userData.token, formValue)
      .subscribe((result) => {
        if (result?._id) {
          window.alert('정상 등록되었습니다.');
          this.router.navigate(['/contents-list']); // redirect
        } else {
          window.alert('글이 등록되지 않았습니다. 다시 시도해주세요.');
        }
      });
  }

  editContent(formValue): void {
    this.contentService
      .editContent(this.userData.token, formValue)
      .subscribe((result) => {
        if (result?._id) {
          window.alert('수정되었습니다.');
          this.router.navigate(['/contents-list']); // redirect
        } else {
          window.alert('수정 실패. 다시 시도해주세요.');
        }
      });
  }

  deleteContent(): void {
    if (window.confirm('삭제하시겠습니까?')) {
      this.contentService
        .deleteContent(this.userData.token, this.id)
        .subscribe((res) => {
          window.alert('삭제되었습니다.');
          this.router.navigate(['/contents-list']); // redirect
        });
    }
  }
  // updateProfile() {
  //   this.profileForm.patchValue({
  //     firstName: 'Nancy',
  //     address: {
  //       street: '123 Drew Street',
  //     },
  //   });
  // }

  // get tags() {
  //   return this.profileForm.get('tags') as FormArray;
  // }

  // addTag() {
  //   this.tags.push(this.formBuilder.control('1'));
  // }

  goBack(): void {
    this.location.back();
  }
}
