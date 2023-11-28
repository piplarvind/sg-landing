import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { LoginComponent } from './login/login.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
// import { Step1Component } from './onboarding/step1/step1.component';
// import { Step2Component } from './onboarding/step2/step2.component';
// import { Step3Component } from './onboarding/step3/step3.component';

const routes: Routes = [
  {
    path: 'onboarding', component: OnboardingComponent, loadChildren: () => import('@app/auth/onboarding/onboarding.module').then(m => m.OnboardingModule)
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
export class AuthRoutingModule { }
