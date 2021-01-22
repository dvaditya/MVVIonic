import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulesPage } from './schedules.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulesPage
  },
  {
    path: 'schedule/:id',
    loadChildren: () => import('./schedule/schedule.module').then( m => m.SchedulePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulesPageRoutingModule {}
