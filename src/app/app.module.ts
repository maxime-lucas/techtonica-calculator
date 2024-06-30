import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { ProductionPlannerComponent } from "./production-planner/production-planner.component";
import { MatDialogModule } from "@angular/material/dialog";
import { ItemsDialogComponent } from "./production-planner/items-dialog/items-dialog.component";
import { FormsModule } from "@angular/forms";
import { ProductionTreeComponent } from "./production-planner/production-tree/production-tree.component";

@NgModule({
    declarations: [
      AppComponent,
      ProductionPlannerComponent,
      ProductionTreeComponent,
      ItemsDialogComponent
    ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatIconModule,
      MatDialogModule,
      FormsModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }