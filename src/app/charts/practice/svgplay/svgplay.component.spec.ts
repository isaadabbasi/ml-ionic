import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgplayComponent } from './svgplay.component';

describe('SvgplayComponent', () => {
  let component: SvgplayComponent;
  let fixture: ComponentFixture<SvgplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
