import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { NoLoginGuard } from './guards/no-login.guard';
import { RegisterComponent } from './components/register/register.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoLoginGuard]
  },
  {
    path: 'home',
    canActivate: [LoginGuard],
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoLoginGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
