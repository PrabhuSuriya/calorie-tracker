import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { TokenInterceptor } from './token.interceptor';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { AllFoodsComponent } from './components/admin/all-foods/all-foods.component';
import { ReportComponent } from './components/admin/report/report.component';
import { EditFoodComponent } from './components/foods/edit-food/edit-food.component';
import { FoodListComponent } from './components/foods/food-list/food-list.component';
import { FoodSummaryComponent } from './components/foods/food-summary/food-summary.component';
import { FoodComponent } from './components/foods/food/food.component';
import { InviteFriendComponent } from './components/invite-friend/invite-friend.component';
import { RelativeTimePipe } from './pipes/relative-time.pipe';

const PRIME_NG_MODULES = [
  ButtonModule,
  InputTextModule,
  TooltipModule,
  CalendarModule,
  DynamicDialogModule,
  AutoCompleteModule,
  ConfirmDialogModule,
  TabViewModule,
  ToastModule,
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
    InviteFriendComponent,
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
  entryComponents: [
    EditFoodComponent,
    FoodSummaryComponent,
    InviteFriendComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
