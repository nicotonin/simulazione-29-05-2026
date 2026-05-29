import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { HomeComponent } from './page/home/home.component';
import { authGuard } from './utils/auth.guard';
import { loginRedirectGuard } from './utils/loginRedirectGuard';


const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginRedirectGuard]
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}