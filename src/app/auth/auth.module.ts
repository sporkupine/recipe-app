import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";

@NgModule({
  declarations: [
    AuthComponent,

  ],
  imports: [
    FormsModule,
    AuthRoutingModule,
    RouterModule,
    SharedModule,
    CommonModule,
  ]
})

export class AuthModule {}
