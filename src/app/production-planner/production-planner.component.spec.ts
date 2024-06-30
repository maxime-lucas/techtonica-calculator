import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionPlannerComponent } from './production-planner.component';

describe('ProductionPlannerComponent', () => {
  let component: ProductionPlannerComponent;
  let fixture: ComponentFixture<ProductionPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionPlannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
