import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent {
  
  isLinear = true;
  formStep1Group: FormGroup;
  formSportGroup: FormGroup;
  formRoleGroup: FormGroup;
  formClubGroup: FormGroup;
  formPhoneGroup: FormGroup;
  
  isClubSelected: boolean[] = [];

  sports = [
    { value: 'football', label: 'Football' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'soccer', label: 'Soccer' },
    { value: 'tennis', label: 'Tennis' },
    { value: 'volleyball', label: 'Volleyball' },
  ];

  roles = [
    { value: 'ATH', label: 'Athlete' },
    { value: 'PAR', label: 'Parent Of Athlete' },
    { value: 'FFF', label: 'Family, Friends & Fan' },
    { value: 'COA', label: 'Coach' },
    { value: 'CAD', label: 'Club Admin' },
    { value: 'REC', label: 'Recruiter' },
  ];

  clubs = [
    { value: 'MUT', label: 'Manchester Utd' },
    { value: 'MUW', label: 'Manchester Utd' },
    { value: 'MUA', label: 'Manchester Utd' },
    { value: 'MUV', label: 'Manchester Utd' },
    { value: 'MUG', label: 'Manchester Utd' },
  ];

  categories = [
    { value: 'U18', label: 'U18' },
    { value: 'U17', label: 'U17' },
    { value: 'U16', label: 'U16' },
    { value: 'U15', label: 'U15' },
    { value: 'U14', label: 'U14' },
    { value: 'U13', label: 'U13' },
    { value: 'U12', label: 'U12' },
    { value: 'U11', label: 'U11' },
  ];
  
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  ngOnit() {
    this.isClubSelected = Array(this.clubs.length).fill(false);
  }
  createForm() {
    this.formStep1Group = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // email: ['', Validators.required, Validators.email],
      email: ['', Validators.required],
      password: ['', Validators.required],
      cPassword: ['', Validators.required],
    });

    this.formSportGroup = this.fb.group({
      sport: new FormControl(''),
    });
    this.formRoleGroup = this.fb.group({
      role: [
        '',
        Validators.compose([Validators.required]),
      ],
    });
    this.formClubGroup = this.fb.group({
      club: [
        '',
        Validators.compose([Validators.required]),
      ],
    });
    this.formPhoneGroup = this.fb.group({
      mobile: [
        '',
        Validators.compose([Validators.required, Validators.min(10)]),
      ],
    });
  }
  onRadioClick(event: Event) {
    // Prevent the click event from propagating to the card
    event.stopPropagation();
    
    // Toggle the isSelected state
    // this.isClubSelected = !this.isClubSelected;
  }
  onCardClick(index: number) {
    this.isClubSelected[index] = !this.isClubSelected[index];
  }

}
