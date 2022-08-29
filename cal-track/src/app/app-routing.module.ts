import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AuthGuard } from './auth.guard';
import { AllFoodsComponent } from './components/admin/all-foods/all-foods.component';
import { ReportComponent } from './components/admin/report/report.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { FoodListComponent } from './components/foods/food-list/food-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },

  { path: 'foods', component: FoodListComponent, canActivate: [AuthGuard] },

  {
    path: 'admin',
    children: [
      {
        path: 'foods',
        component: AllFoodsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'reports',
        component: ReportComponent,
        canActivate: [AdminGuard],
      },
      { path: '', redirectTo: 'foods', pathMatch: 'full' },
    ],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
