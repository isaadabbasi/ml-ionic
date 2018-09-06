import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartBarchartComponent } from './start-barchart.component';

describe('StartBarchartComponent', () => {
  let component: StartBarchartComponent;
  let fixture: ComponentFixture<StartBarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartBarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
