import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChartsPage } from './charts.page';
import { SvgplayComponent } from './practice/svgplay/svgplay.component';
import { StartBarchartComponent } from './presentation/start-barchart/start-barchart.component';
import { GdpScatterPlotComponent } from './presentation/gdp-scatter-plot/gdp-scatter-plot.component';


const routes: Routes = [
  {
    path: '',
    component: ChartsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ChartsPage,
    SvgplayComponent,
    StartBarchartComponent,
    GdpScatterPlotComponent,
  ]
})
export class ChartsPageModule {}
