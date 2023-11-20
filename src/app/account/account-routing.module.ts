import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'onboarding', loadChildren: () => import('@app/account/onboarding/onboarding.module').then(m => m.OnboardingModule)
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
