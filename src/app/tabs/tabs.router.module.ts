import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

import { ChartsPage } from '../charts/charts.page';
import { MachineLearningPage } from '../machine-learning/machine-learning.page';
import { QuizPage } from '../quiz/quiz.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'quiz',
        outlet: 'quiz',
        component: QuizPage
      },
      {
        path: 'charts',
        outlet: 'charts',
        component: ChartsPage
      },
      {
        path: 'ml',
        outlet: 'ml',
        component: MachineLearningPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/(quiz:quiz)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
