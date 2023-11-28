import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

// components
import { DashlayoutComponent } from "./dashlayout.component";
import { DashheaderComponent } from "@app/core/shell/dashheader/dashheader.component";
import { ShellComponent } from "@app/core/shell/shell.component";

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [DashlayoutComponent, DashheaderComponent, ShellComponent],
  providers: [],
})
export class DashlayoutModule {}
