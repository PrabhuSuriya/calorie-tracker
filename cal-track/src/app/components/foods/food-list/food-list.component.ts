import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Food, FoodSummary } from 'src/app/models/food.models';
import { AccountService } from 'src/app/services/account.service';
import { FoodService } from 'src/app/services/food.service';
import { EditFoodComponent } from '../edit-food/edit-food.component';
import { FoodSummaryComponent } from '../food-summary/food-summary.component';

@Component({
  selector: 'ct-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
  providers: [DialogService],
})
export class FoodListComponent implements OnInit {
  foods: Food[] = [];
  daySummary: FoodSummary[] = [];
  isLimitCrossed = false;
  calorieLimit: number;

  constructor(
    private foodSvc: FoodService,
    private dialogSvc: DialogService,
    private accountSvc: AccountService
  ) {
    this.calorieLimit = this.accountSvc.user.calorieLimit;
    this.foodSvc.getFoods().subscribe((data) => {
      this.foods = data;
      this.updateSummary();
    });
  }

  ngOnInit(): void {}

  updateSummary() {
    const daySummary: { [key: string]: number } = this.foods
      .map((f) => ({
        calories: f.calories,
        date: new Date(f.consumedTime).toLocaleDateString(),
      }))
      .reduce((a: any, c) => {
        if (a[c.date]) {
          a[c.date] += c.calories;
        } else {
          a[c.date] = c.calories;
        }
        return a;
      }, {});
    this.daySummary = Object.entries(daySummary).map(([date, calories]) => ({
      date,
      calories,
    }));
    this.isLimitCrossed = this.daySummary.some(
      (s) => s.calories > this.calorieLimit
    );
  }

  openSummaryDialog() {
    this.dialogSvc.open(FoodSummaryComponent, {
      header: 'Calories by Day',
      width: '25rem',
      modal: true,
      closeOnEscape: true,
      data: { summary: this.daySummary, limit: this.calorieLimit },
    });
  }

  openAddDialog() {
    this.dialogSvc
      .open(EditFoodComponent, {
        header: 'Add Food',
        width: '50%',
        modal: true,
        closeOnEscape: true,
      })
      .onClose.subscribe((data) => {
        if (data) {
          this.addFood(data);
        }
      });
  }

  addFood(food: Food) {
    this.foodSvc.addFood(food).subscribe((data) => {
      this.foods.unshift(data);
      this.updateSummary();
    });
  }

  foodTrackBy(index: number, item: Food) {
    return item.id;
  }
}
