import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CmsPageComponent } from "./cms-page.component";
import { extract } from "@app/core";

const routes: Routes = [
  {
    path: "cms",
    component: CmsPageComponent,
    data: { title: extract("Pop-up Messages") },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmsPageRoutingModule {}
