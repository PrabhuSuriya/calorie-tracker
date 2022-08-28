import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'ct-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.scss'],
})
export class EditFoodComponent implements OnInit {
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {}

  addFood(form: NgForm) {
    for (const key in form.controls) form.controls[key].markAsDirty();

    if (form.valid) {
      this.ref.close(form.value);
    }
    console.log(form.value);
  }

  onCancel() {
    this.ref.close(null);
  }
}
