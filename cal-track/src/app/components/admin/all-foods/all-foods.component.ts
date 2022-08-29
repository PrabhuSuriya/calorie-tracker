import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/models/auth.models';
import { Food } from 'src/app/models/food.models';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'ct-all-foods',
  templateUrl: './all-foods.component.html',
  styleUrls: ['./all-foods.component.scss'],
  providers: [DialogService],
})
export class AllFoodsComponent implements OnInit {
  userFoods: { user: User; foods: Food[] }[] = [];

  constructor(private foodSvc: FoodService, private dialogSvc: DialogService) {
    this.foodSvc.getAllFoods().subscribe((data) => {
      const groupedData: { [key: number]: Food[] } = data.reduce(
        (a: any, c) => {
          if (a[c.userId]) {
            a[c.userId].push(c);
          } else {
            a[c.userId] = [c];
          }
          return a;
        },
        {}
      );
      this.userFoods = Object.entries(groupedData).map(([userId, foods]) => ({
        user: { userId, name: foods?.[0]?.user?.name } as any as User,
        foods: foods,
      }));
      console.log(this.userFoods);
    });
  }

  ngOnInit(): void {}

  foodTrackBy(index: number, item: Food) {
    return item.id;
  }

  openAddDialog() {}
}
