import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChartsPage } from './charts.page';
import { SvgplayComponent } from './practice/svgplay/svgplay.component';


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
    SvgplayComponent
  ]
})
export class ChartsPageModule {}
