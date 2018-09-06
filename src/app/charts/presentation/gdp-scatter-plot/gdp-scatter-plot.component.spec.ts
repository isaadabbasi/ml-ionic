import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GdpScatterPlotComponent } from './gdp-scatter-plot.component';

describe('GdpScatterPlotComponent', () => {
  let component: GdpScatterPlotComponent;
  let fixture: ComponentFixture<GdpScatterPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GdpScatterPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GdpScatterPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
