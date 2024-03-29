import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { Route, extract } from "@app/core";
import { HomeComponent } from "@app/pages/home/home.component";


const routes: Routes = [
  // { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent, data: { title: extract("SportGrit App - Home") } },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  // { path: "", component: HomeComponent, data: { title: extract("Home") } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class HomeRoutingModule {}
