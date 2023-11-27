import { Component, OnInit } from '@angular/core';
import { OnboardingProcessService } from '../onboarding.process.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss'],
})
export class Step4Component {
  nextButtonClicked = false;

  clubs = [
    { value: 'MUT', label: 'Manchester Utd' },
    { value: 'MUW', label: 'Manchester Utd' },
    { value: 'MUA', label: 'Manchester Utd' },
    { value: 'MUV', label: 'Manchester Utd' },
    { value: 'MUG', label: 'Manchester Utd' },
  ];
  
  step4Form = this.onboardingProcessService.step4Form;

  constructor(private router: Router, private onboardingProcessService: OnboardingProcessService) {}

  
  onSubmit(): void {
    this.nextButtonClicked = true;
    // Perform form validation
    if (this.onboardingProcessService.step4Form.valid) {
      // If the form is valid, navigate to the next step
      this.router.navigate(["/account/onboarding/step5"]);
    } else {
      // If the form is invalid, show an error or handle it accordingly
      console.log("Please fill in all required fields in Step 4.");
    }
  }

  selectClub(club: any) {
    this.step4Form.controls['club'].setValue(club.value); // Update 'club' with your actual form control name
  }

}
