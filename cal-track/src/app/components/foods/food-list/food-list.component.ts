import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'ct-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit {
  constructor(private foodSvc: FoodService) {}

  ngOnInit(): void {
    this.foodSvc.getFoods().subscribe((foods) => {
      console.log(foods);
    });
  }
}
