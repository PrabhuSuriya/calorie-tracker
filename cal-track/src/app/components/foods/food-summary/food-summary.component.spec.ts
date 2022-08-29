import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodSummaryComponent } from './food-summary.component';

describe('FoodSummaryComponent', () => {
  let component: FoodSummaryComponent;
  let fixture: ComponentFixture<FoodSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
