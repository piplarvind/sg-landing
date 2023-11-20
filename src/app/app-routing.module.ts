import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { Route } from "@app/core";
import { LayoutComponent } from "./layout/layout.component";
import { AuthlayoutComponent } from "./authlayout/authlayout.component";

/* const routes: Routes = [
  Route.withShell([
    // {
    //   path: 'account',
    //   loadChildren: () => import('app/account/account.module').then(m => m.AccountModule)
    // },
    {
      path: "about",
      loadChildren: () =>
        import("app/about/about.module").then((m) => m.AboutModule),
    },
  ]),
  // Fallback when no prior route is matched
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
  providers: [],
}) */
const routes: Routes = [
  // { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard]  },
  { path: '', component: LayoutComponent, loadChildren: () => import('@app/pages/pages.module').then(m => m.PagesModule)  },
  // { path: 'account', component: AuthlayoutComponent, loadChildren: () => import('@app/account/account.module').then(m => m.AccountModule) },
  { path: 'account', component: LayoutComponent, loadChildren: () => import('@app/account/account.module').then(m => m.AccountModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})

export class AppRoutingModule {}
