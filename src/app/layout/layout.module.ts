import { NgModule } from "@angular/core";


import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from "@app/core/shell/header/header.component";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "@app/core/shell/footer/footer.component";
import { ContactFormComponent } from "@app/pages/home/contact-form/contact-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, ContactFormComponent],
  providers: [],
})
export class LayoutModule {}
