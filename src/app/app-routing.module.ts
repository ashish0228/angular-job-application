import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobapplicationformComponent } from './jobapplicationform/jobapplicationform.component';
import { AuthGuardService } from './guard/auth.guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],

  },
  {
    path: 'jobapplication',
    component: JobapplicationformComponent,
  },
  {
    path: 'jobapplicationEdit/:id',
    component: JobapplicationformComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
