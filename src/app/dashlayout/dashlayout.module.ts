import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

// components
import { DashlayoutComponent } from "./dashlayout.component";
import { DashheaderComponent } from "@app/core/shell/dashheader/dashheader.component";
import { ShellComponent } from "@app/core/shell/shell.component";
import { MaterialModule } from "@app/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
// import { CoreModule } from "@app/core";

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
    // CoreModule
  ],
  declarations: [DashlayoutComponent, DashheaderComponent, DashheaderComponent, ShellComponent],
  providers: [],
})
export class DashlayoutModule {}
