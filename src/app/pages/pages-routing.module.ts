import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { Route, extract } from "@app/core";

const routes: Routes = [
  {
    path: '', loadChildren: () => import('@app/pages/home/home.module').then(m => m.HomeModule)
  },
  // { path: "", redirectTo: "/home", pathMatch: "full" },
  // { path: "home", component: HomeComponent, data: { title: extract("Home") } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PagesRoutingModule {}
