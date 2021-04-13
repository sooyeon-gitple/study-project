import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsDetailComponent } from './contents-detail.component';

describe('ContentsDetailComponent', () => {
  let component: ContentsDetailComponent;
  let fixture: ComponentFixture<ContentsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
