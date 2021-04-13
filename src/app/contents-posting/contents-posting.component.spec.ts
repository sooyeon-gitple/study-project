import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsPostingComponent } from './contents-posting.component';

describe('ContentsPostingComponent', () => {
  let component: ContentsPostingComponent;
  let fixture: ComponentFixture<ContentsPostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentsPostingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
