import { NgModule } from "@angular/core";


import { AuthlayoutComponent } from "./authlayout.component";
import { HeaderComponent } from "@app/core/shell/header/header.component";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "@app/core/shell/footer/footer.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [AuthlayoutComponent],
  providers: [],
})
export class AuthLayoutModule {}
