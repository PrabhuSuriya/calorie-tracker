import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Food } from 'src/app/models/food.models';

@Component({
  selector: 'ct-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodComponent {
  @Input() food!: Food;
}
