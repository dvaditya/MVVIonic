import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule ),
    canActivate: [AuthGuard]
  },
  {
    path: 'clients',
    loadChildren: () => import('./pages/clients/clients.module').then( m => m.ClientsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'discussions',
    loadChildren: () => import('./pages/discussions/discussions.module').then( m => m.DiscussionsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'schedules',
    loadChildren: () => import('./pages/schedules/schedules.module').then( m => m.SchedulesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
