import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food.modesl';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'ct-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit {
  foods: Food[] = [];
  constructor(private foodSvc: FoodService) {
    this.updateFoods();
  }

  ngOnInit(): void {}

  updateFoods(food?: Food) {
    if (food) {
      this.foods.push(food);
    } else {
      this.foodSvc.getFoods().subscribe((data) => {
        this.foods = data;
      });
    }
  }

  foodTrackBy(index: number, item: Food) {
    return item.name;
  }
}
