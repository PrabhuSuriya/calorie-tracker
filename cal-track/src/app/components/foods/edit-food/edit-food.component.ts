import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Food } from 'src/app/models/food.models';
import { NutritionixService } from 'src/app/services/nutritionix.service';

@Component({
  selector: 'ct-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.scss'],
})
export class EditFoodComponent {
  results: any[] = [];
  food: Food | null;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private nutritionixSvc: NutritionixService
  ) {
    this.food = this.config?.data?.food;
  }

  search(event: any, form: NgForm) {
    form.controls['calories'].setValue(null);
    form.controls['imageUrl'].setValue(null);

    this.nutritionixSvc.lookupFoods(event.query).subscribe((data: any) => {
      const { branded, common } = data;
      this.results = [...branded, ...common];
    });
  }

  onFoodSelect(event: any, form: NgForm) {
    const { food_name, nf_calories } = event;
    form.controls['name'].setValue(food_name);
    form.controls['calories'].setValue(nf_calories || null);
    form.controls['imageUrl'].setValue(event?.photo?.thumb || null);
  }

  addFood(form: NgForm) {
    for (const key in form.controls) form.controls[key].markAsDirty();

    if (form.valid) {
      this.ref.close(form.value);
    }
  }

  onCancel() {
    this.ref.close(null);
  }
}
