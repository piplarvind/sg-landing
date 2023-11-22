import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss'],
})
export class StepOneComponent {
  isLinear = true;
  formNameGroup: FormGroup;
  formSportGroup: FormGroup;
  formEmailGroup: FormGroup;
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
    this.formNameGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      cPassword: ['', Validators.required],
    });

    this.formSportGroup = this.fb.group({
      sportSelection: new FormControl(''),
    });
    this.formEmailGroup = this.fb.group({
      emailID: [
        '',
        Validators.compose([Validators.required, Validators.email]),
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
