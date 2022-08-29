import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './token.interceptor';
import { LoginComponent } from './components/auth/login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { FoodListComponent } from './components/foods/food-list/food-list.component';
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { EditFoodComponent } from './components/foods/edit-food/edit-food.component';
import { FoodSummaryComponent } from './components/foods/food-summary/food-summary.component';
import { FoodComponent } from './components/foods/food/food.component';
import { AllFoodsComponent } from './components/admin/all-foods/all-foods.component';
import { ReportComponent } from './components/admin/report/report.component';

const PRIME_NG_MODULES = [
  ButtonModule,
  InputTextModule,
  TooltipModule,
  CalendarModule,
  DynamicDialogModule,
  AutoCompleteModule,
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FoodListComponent,
    RelativeTimePipe,
    EditFoodComponent,
    FoodSummaryComponent,
    FoodComponent,
    AllFoodsComponent,
    ReportComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
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
  entryComponents: [EditFoodComponent, FoodSummaryComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
