import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingRoutingModule } from "./shopping-routing.module";
import { ShoppingComponent } from "./shopping.component";

@NgModule({
  declarations: [
    ShoppingComponent,
    ShoppingEditComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ShoppingRoutingModule
  ]
})

export class ShoppingModule {}
