import { Component, OnInit } from '@angular/core';
import { OnboardingProcessService } from '../onboarding.process.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],
})
export class Step3Component {
  nextButtonClicked = false;

  roles = [
    { value: 'ATH', label: 'Athlete' },
    { value: 'PAR', label: 'Parent Of Athlete' },
    { value: 'FFF', label: 'Family, Friends & Fan' },
    { value: 'COA', label: 'Coach' },
    { value: 'CAD', label: 'Club Admin' },
    { value: 'REC', label: 'Recruiter' },
  ];
  
  step3Form = this.onboardingProcessService.step3Form;

  constructor(private router: Router, private onboardingProcessService: OnboardingProcessService) {}

  onSubmit(): void {
    this.nextButtonClicked = true;
    // Perform form validation
    if (this.onboardingProcessService.step3Form.valid) {
      // If the form is valid, navigate to the next step
      this.router.navigate(["/account/onboarding/step4"]);
    } else {
      // If the form is invalid, show an error or handle it accordingly
      console.log("Please fill in all required fields in Step 3.");
    }
  }

}
