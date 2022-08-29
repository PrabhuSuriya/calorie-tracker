import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Food } from 'src/app/models/food.modesl';
import { FoodService } from 'src/app/services/food.service';
import { EditFoodComponent } from '../edit-food/edit-food.component';

@Component({
  selector: 'ct-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
  providers: [DialogService],
})
export class FoodListComponent implements OnInit {
  foods: Food[] = [];
  constructor(private foodSvc: FoodService, private dialogSvc: DialogService) {
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
    this.foodSvc.addFood(food).subscribe((data) => this.updateFoods(data));
  }

  foodTrackBy(index: number, item: Food) {
    return item.name;
  }
}
