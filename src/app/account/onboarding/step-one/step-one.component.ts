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
  formPhoneGroup: FormGroup;

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
  
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  ngOnit() {}
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
    this.formPhoneGroup = this.fb.group({
      mobile: [
        '',
        Validators.compose([Validators.required, Validators.min(10)]),
      ],
    });
  }
}
