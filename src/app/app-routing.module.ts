import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'quiz', loadChildren: './quiz/quiz.module#QuizPageModule' },
  { path: 'charts', loadChildren: './charts/charts.module#ChartsPageModule' },
  { path: 'machine-learning', loadChildren: './machine-learning/machine-learning.module#MachineLearningPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
