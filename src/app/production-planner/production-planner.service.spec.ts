import { TestBed } from '@angular/core/testing';

import { ProductionPlannerService } from './production-planner.service';

describe('ProductionPlannerService', () => {
  let service: ProductionPlannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionPlannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
