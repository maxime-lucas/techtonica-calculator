import { Component } from '@angular/core';
import { Category, ProductionPlannerService } from '../production-planner.service';

@Component({
  selector: 'app-items-dialog',
  templateUrl: './items-dialog.component.html',
  styleUrl: './items-dialog.component.scss'
})
export class ItemsDialogComponent {
  categories: Category[] = [];
  constructor(private productionPlannerService : ProductionPlannerService){
    this.categories = productionPlannerService.getItemsByCategory();
  }
}
