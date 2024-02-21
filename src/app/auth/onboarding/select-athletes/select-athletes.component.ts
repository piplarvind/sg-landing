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
      club: localStorage.getItem("clubId"),
      type:'Athlete'
    };
    this.onboardingService.getClubAthletes(clubPayload).subscribe(
      (response) => {
        //this.athleteList = response.data;

        const newres = response.data.map((prop) => {
          let fname = "",
            lname = "",
            user_name = "",
            age="",
            position="",
            email = "",
            phone_code = "",
            moblino: "",
            teams:any = [],
            types: any = [];
            

          for (let i = 0; i < prop?.profile_fields.length; i++) {
            if (prop.profile_fields[i].field) {
              if (prop.profile_fields[i].field.name === "first_name") {
                fname = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === "last_name") {
                lname = prop.profile_fields[i].value;
              }

              if (prop.profile_fields[i].field.name === "user_name") {
                user_name = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === "email") {
                email = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === "phone_code") {
                phone_code = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === "mobile_phone") {
                moblino = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === "age") {
                age = prop.profile_fields[i].value;
              }
              if (prop.profile_fields[i].field.name === "position") {
                position = prop.profile_fields[i].value;
              }
            }
          }

          for (let i = 0; i < prop.types.length; i++) {
            const ty = prop.types[i].name;
            types = types.concat(ty);
          }

          return {
            ...prop,
            first_name: fname,
            last_name: lname,
            age:age,
            position:position,
            type: types,
            user_name: user_name,
            phone_code: phone_code,
            phone: moblino,
            email: email,
            created_on: prop.created_on,
            teams:prop.teams
          };
        });

        this.athleteList = newres;
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
      ? `${athlete.first_name} ${athlete.last_name}`
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
          //this.sharedService.showMessage(response.message);
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
      //this.sharedService.showMessage("Please select at-least one athlete");
    }
  }

  get filteredAthleteList() {
    return this.athleteList.filter(
      (athlete: any) =>
        athlete.first_name
          .toLowerCase()
          .includes(this.searchText.toLowerCase().trim()) ||
        athlete.last_name
          .toLowerCase()
          .includes(this.searchText.toLowerCase().trim())
    );
  }
  
  get athleteFormArray() {
    return this.athleteForm.get("athlete") as FormArray;
  }
}
