import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { ChartsPageModule } from '../charts/charts.module';
import { MachineLearningPageModule } from '../machine-learning/machine-learning.module';
import { QuizPageModule } from '../quiz/quiz.module';
import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TabsPageRoutingModule,
    FormsModule,
    ChartsPageModule,
    MachineLearningPageModule,
    QuizPageModule,
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
