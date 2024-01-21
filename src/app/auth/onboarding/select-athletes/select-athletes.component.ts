import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  Validators,
  FormGroup,
} from "@angular/forms";
import { Router } from "@angular/router";
import { SharedService } from "@app/shared/shared.service";
import { DomSanitizer } from "@angular/platform-browser";

import { OnboardingService } from "./../onboarding.service";

@Component({
  selector: "app-select-athletes",
  templateUrl: "./select-athletes.component.html",
  styleUrls: ["./select-athletes.component.scss"],
})
export class SelectAthletesComponent implements OnInit {
  athleteForm: FormGroup;
  athleteCoachForm: FormGroup;
  searchText: string = "";
  selectedAthlete: string | null = null;

  nextButtonClicked = false;

  athleteList: any;
  roles: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    public _DomSanitizationService: DomSanitizer,
    private onboardingService: OnboardingService,
    public sharedService: SharedService
  ) {
    this.athleteForm = this.fb.group({
      athlete: this.fb.array([], [this.atLeastOneAthleteValidator()]),
    });
  }

  ngOnInit() {
    this.initForm();
    let clubPayload = {
      club: "6501cfe8a783f64b951ea60c", //localStorage.getItem("clubId"),
      type:'Athlete'
    };
    this.onboardingService.getClubAthletes(clubPayload).subscribe(
      (response) => {
        this.athleteList = response.data;
      },
      (error) => {
        this.sharedService.showMessage(error.error.message);
      }
    );
  }

  initForm(): void {
    this.athleteCoachForm = this.fb.group({
      athlete: this.fb.array([], [Validators.required]), // Add validators as needed
    });

    // this.athleteCoachForm = this.fb.group({
    //   athlete: this.fb.array([]),
    // });
  }

  atLeastOneAthleteValidator() {
    return (formArray: FormArray) => {
      return formArray.length > 0 ? null : { atLeastOneAthlete: true };
    };
  }

  getAthleteControl(athleteId: string): AbstractControl {
    return (this.athleteCoachForm.get("athlete") as FormArray).controls.find(
      (control) => control.value === athleteId
    );
  }
  get athleteFormArray() {
    return this.athleteForm.get("athlete") as FormArray;
  }

  get filteredAthleteList() {
    return this.athleteList.filter(
      (athlete: any) =>
        athlete.profile_fields[0].value
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        athlete.profile_fields[1].value
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
    );
  }

  onRadioChange(athleteId: string) {
    this.selectedAthlete = athleteId;
  }

  addSelectedAthlete() {
    if (
      this.selectedAthlete &&
      !this.athleteFormArray.value.includes(this.selectedAthlete)
    ) {
      this.athleteFormArray.push(this.fb.control(this.selectedAthlete));
    }
  }

  removeAthlete(athleteId: string) {
    const index = this.athleteFormArray.value.indexOf(athleteId);
    if (index !== -1) {
      this.athleteFormArray.removeAt(index);
    }
  }

  getAthleteNameById(athleteId: string): string {
    const athlete = this.athleteList.find((a) => a._id === athleteId);
    return athlete
      ? `${athlete.profile_fields[0].value} ${athlete.profile_fields[1].value}`
      : "";
  }

  onCheckboxChange(event: any, athleteId: string): void {
    const athleteControl = this.getAthleteControl(athleteId);
    if (event.checked && !athleteControl) {
      const newControl = this.fb.control(athleteId);
      (this.athleteCoachForm.get("athlete") as FormArray).push(newControl);
    } else if (!event.checked && athleteControl) {
      const index = (
        this.athleteCoachForm.get("athlete") as FormArray
      ).controls.indexOf(athleteControl);
      (this.athleteCoachForm.get("athlete") as FormArray).removeAt(index);
    }
  }

  onSubmit() {
    if (this.athleteCoachForm.valid) {
      const athFormData = this.athleteCoachForm.value;
      let payloadData = {
        profile_id: localStorage.getItem("userId"),
        child: [athFormData.athlete],
      };
      //console.log("payloadData", payloadData);      return;
      this.onboardingService.saveParentAthletes(payloadData).subscribe(
        (response) => {
          //console.log("Role data saved successfully:", response.data);
          this.sharedService.showMessage(response.message);
          // Navigate to the next step
          this.router.navigate(["/auth/onboarding/request-sent"]);
        },
        (error) => {
          //console.error("Error saving role data:", error);
          this.sharedService.showMessage(error.error.message);
          this.router.navigate(["/auth/onboarding/select-athletes"]);
        }
      );
      // this.router.navigate([
      //   "auth/onboarding/do-payment/" + athFormData.plan,
      // ]);
    } else {
      this.sharedService.showMessage("Please select at-least one athlete");
    }
  }
}
