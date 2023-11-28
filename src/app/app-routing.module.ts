import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { Route } from "@app/core";
import { LayoutComponent } from "@app/layout/layout.component";
import { AuthlayoutComponent } from "@app/authlayout/authlayout.component";
import { DashlayoutComponent } from "@app/dashlayout/dashlayout.component";

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
  // { path: 'auth', component: AuthlayoutComponent, loadChildren: () => import('@app/auth/auth.module').then(m => m.AuthModule) },
  { path: 'auth', component: LayoutComponent, loadChildren: () => import('@app/auth/auth.module').then(m => m.AuthModule) },
  { path: 'account', component: DashlayoutComponent, loadChildren: () => import('@app/pages/account/account.module').then(m => m.AccountModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})

export class AppRoutingModule {}
