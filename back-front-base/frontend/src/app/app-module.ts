import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './page/home/home.component';
import { logoutInterceptor } from './utils/logout.interceptor';
import { authInterceptor } from './utils/auth.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavUserComponent } from './components/nav-user/nav-user.component';
import { IfAuthenticatedDirective } from './utils/if-authenticated.directive';
import { FooterComponent } from './components/footer/footer.component';
import { Delivery } from './page/delivery/delivery';
import { Analytics } from './page/analytics/analytics';
import { CommonModule } from '@angular/common';
import { Customer } from './page/customer/customer';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    NavUserComponent,
    IfAuthenticatedDirective,
    FooterComponent,
    Delivery,
    Analytics,
    Customer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
    
  ],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, logoutInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}