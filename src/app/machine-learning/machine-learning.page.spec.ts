import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineLearningPage } from './machine-learning.page';

describe('MachineLearningPage', () => {
  let component: MachineLearningPage;
  let fixture: ComponentFixture<MachineLearningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineLearningPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineLearningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
