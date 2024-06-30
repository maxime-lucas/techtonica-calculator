import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemsDialogComponent } from './items-dialog/items-dialog.component';
import { Item, ItemOutput, Machine, ProductionPlannerService, ProductionTreeNode, Recipe } from './production-planner.service';

@Component({
  selector: 'app-production-planner',
  templateUrl: './production-planner.component.html',
  styleUrl: './production-planner.component.scss'
})
export class ProductionPlannerComponent implements OnInit {

  outputs : ItemOutput[]= [];
  productionTrees: ProductionTreeNode[] = [];

  constructor(public dialog: MatDialog, private productionPlannerService : ProductionPlannerService) {
  }
  ngOnInit(): void {
    this.productionPlannerService.outputsUpdated.subscribe(outputs => {
      this.outputs = outputs;
    })

    this.productionPlannerService.productionTreesUpdated.subscribe(trees => {
      this.productionTrees = trees;
    })
  }

  onClickAddItem() {
    const dialogRef = this.dialog.open(ItemsDialogComponent, { 
      minWidth:'1200px',
    })

    dialogRef.afterClosed().subscribe( (itemSelected : Item) => {
      this.productionPlannerService.addNewOutput(itemSelected);
    })
  }

  onChangeQuantity(item:Item, newQuantityAsString:string){
    let newQuantity : number = Number(newQuantityAsString);
    this.productionPlannerService.updateOutputQuantity(item, newQuantity);
  }

  onChangeRecipe(output:ItemOutput, newRecipeID:string){
    this.productionPlannerService.updateOutputRecipe(output, newRecipeID)
  }

  onChangeMachine(output:ItemOutput, newMachineID:string){
    this.productionPlannerService.updateOutputMachine(output, newMachineID)
  }
}
