import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnboardingProcessService } from './onboarding.process.service';

@Injectable({
  providedIn: 'root',
})
export class OnboardingGuard implements CanActivate {
  constructor(
    private onboardingProcessService: OnboardingProcessService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentStep = route.routeConfig?.path || '';
    const isCurrentFormValid = this.validateFormForStep(currentStep);

    if (!isCurrentFormValid) {
      // Form is invalid
      this.showInvalidFormMessage(`Please fill in all required fields in ${currentStep}.`);
    }

    return isCurrentFormValid;
  }

  private validateFormForStep(step: string): boolean {
    switch (step) {
      case 'step1':
        return this.onboardingProcessService.userForm.valid;

      case 'step2':
        return this.onboardingProcessService.step2Form.valid;

      // Add additional cases for other steps as needed

      default:
        // Default to true for unknown steps
        return true;
    }
  }

  private showInvalidFormMessage(message: string): void {
    // Implement logic to show an error message to the user
    console.log(message);
  }
}
