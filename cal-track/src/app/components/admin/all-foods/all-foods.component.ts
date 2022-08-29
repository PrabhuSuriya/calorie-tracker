import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/models/auth.models';
import { Food } from 'src/app/models/food.models';
import { FoodService } from 'src/app/services/food.service';
import { EditFoodComponent } from '../../foods/edit-food/edit-food.component';

@Component({
  selector: 'ct-all-foods',
  templateUrl: './all-foods.component.html',
  styleUrls: ['./all-foods.component.scss'],
  providers: [DialogService, ConfirmationService],
})
export class AllFoodsComponent implements OnInit {
  userFoods: { user: User; foods: Food[] }[] = [];

  constructor(
    private foodSvc: FoodService,
    private dialogSvc: DialogService,
    private confirmationService: ConfirmationService
  ) {
    this.loadFoods();
  }

  ngOnInit(): void {}

  foodTrackBy(index: number, item: Food) {
    return item.id;
  }

  onEditFood(food: Food) {
    this.dialogSvc
      .open(EditFoodComponent, {
        header: 'Edit Food',
        width: '50%',
        modal: true,
        closeOnEscape: true,
        data: { food },
      })
      .onClose.subscribe((data) => {
        if (data) {
          const toUpdate = { ...food, ...data };
          this.foodSvc.editFood(toUpdate).subscribe(() => this.loadFoods());
        }
      });
  }

  onDeleteFood(food: Food) {
    console.log('USERLOG.food', food);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this entry?',
      accept: () => {
        this.foodSvc.deleteFood(food).subscribe(() => this.loadFoods());
      },
    });
  }

  loadFoods() {
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
      this.userFoods = Object.entries(groupedData).map(([id, foods]) => ({
        user: { id, name: foods?.[0]?.user?.name } as any as User,
        foods: foods,
      }));
    });
  }

  openAddDialog(user: User) {
    this.dialogSvc
      .open(EditFoodComponent, {
        header: `Add Food for ${user?.name}`,
        width: '50%',
        modal: true,
        closeOnEscape: true,
      })
      .onClose.subscribe((data) => {
        if (data) {
          this.foodSvc
            .addFoodByAdmin(user.id, data)
            .subscribe(() => this.loadFoods());
        }
      });
  }
}
