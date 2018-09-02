import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MachineLearningPage } from './machine-learning.page';

const routes: Routes = [
  {
    path: '',
    component: MachineLearningPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MachineLearningPage]
})
export class MachineLearningPageModule {}
