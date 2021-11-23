import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';
import { PageLoaderComponent } from './demo/pages/page-loader/page-loader.component';

const routes: Routes = [
  {
    path: 'error',
    loadChildren: () => import('./demo/pages/maintenance/mainten-error/mainten-error.module').then(module => module.MaintenErrorModule)
  },
  {
    path: 'maintenance',
    loadChildren: () => import('./demo/pages/maintenance/mainten-coming-soon/mainten-coming-soon.module').then(module => module.MaintenComingSoonModule)
  },
  {
    path :'',
    component : PageLoaderComponent,
    pathMatch : "full"
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard/manager',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./demo/dashboard/dashboard.module').then(module => module.DashboardModule)
      },
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then(module => module.AuthenticationModule)
      },
      {
        path: 'maintenance',
        loadChildren: () => import('./demo/pages/maintenance/maintenance.module').then(module => module.MaintenanceModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
