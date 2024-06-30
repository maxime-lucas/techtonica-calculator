import { Component, Input } from '@angular/core';
import { ProductionTreeNode } from '../production-planner.service';

@Component({
  selector: 'app-production-tree',
  templateUrl: './production-tree.component.html',
  styleUrl: './production-tree.component.scss'
})
export class ProductionTreeComponent {
  @Input() node!: ProductionTreeNode;
}
