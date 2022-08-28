import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './token.interceptor';
import { LoginComponent } from './components/auth/login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { FoodListComponent } from './components/foods/food-list/food-list.component';
import { RelativeTimePipe } from './pipes/relative-time.pipe';

const PRIME_NG_MODULES = [ButtonModule, InputTextModule, TooltipModule];
@NgModule({
  declarations: [AppComponent, LoginComponent, FoodListComponent, RelativeTimePipe],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ...PRIME_NG_MODULES,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
