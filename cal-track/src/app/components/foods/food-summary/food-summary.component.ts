import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FoodSummary } from 'src/app/models/food.models';

@Component({
  selector: 'ct-food-summary',
  templateUrl: './food-summary.component.html',
  styleUrls: ['./food-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodSummaryComponent {
  summaryData: FoodSummary[] = [];
  limit: number;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    const { summary, limit } = this.config.data;
    this.summaryData = [...summary].reverse();
    this.limit = limit;
  }
}
