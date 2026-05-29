import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { HomeComponent } from './page/home/home.component';
import { authGuard } from './utils/auth.guard';
import { loginRedirectGuard } from './utils/loginRedirectGuard';
import { Delivery } from './page/delivery/delivery';
import { Analytics } from './page/analytics/analytics';
import { Customer } from './page/customer/customer';


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
  },
  {
    path: 'delivery',
    component: Delivery,
    canActivate: [authGuard]
  },

  {
    path: 'customer',
    component: Customer,
    canActivate: [authGuard]
  },
  {
    path: 'analytics',
    component: Analytics,
    canActivate: [authGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}