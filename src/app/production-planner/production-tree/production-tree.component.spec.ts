import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionTreeComponent } from './production-tree.component';

describe('ProductionTreeComponent', () => {
  let component: ProductionTreeComponent;
  let fixture: ComponentFixture<ProductionTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
