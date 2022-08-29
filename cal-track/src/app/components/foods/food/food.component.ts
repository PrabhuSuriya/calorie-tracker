import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Food } from 'src/app/models/food.models';

@Component({
  selector: 'ct-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodComponent {
  @Input() food!: Food;
  @Input() enableCRUD = false;

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
}
