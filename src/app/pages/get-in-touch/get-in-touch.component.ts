import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ThemePalette } from "@angular/material/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { SharedService } from "@app/shared/shared.service";
import { GetInTouchService } from "./get-in-touch.service";
import { ToastrService } from "ngx-toastr";
// import { RegisterService } from "./register.service";

@Component({
  selector: "app-get-in-touch",
  templateUrl: "./get-in-touch.component.html",
  styleUrls: ["./get-in-touch.component.scss"],
})
export class GetInTouchComponent implements OnInit {
  submitButtonClicked = false;
  inquiryForm: FormGroup = new FormGroup({
    first_name: new FormControl(""),
    last_name: new FormControl(""),
    email: new FormControl(""),
    mobile_phone: new FormControl(""),
    role: new FormControl(""),
    sport: new FormControl(""),
    club: new FormControl(""),
    website: new FormControl(""),
    logo: new FormControl(""),
    message: new FormControl(""),

  });
  genders: any;

  color: ThemePalette = "accent";
  checked = false;
  disabled = false;

  selectedFile: any = null;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    // private registerService: RegisterService,
    public sharedService: SharedService,
    private getInTouchService: GetInTouchService
  ) {
    this.inquiryForm = this.formBuilder.group(
      {
        first_name: ["", Validators.required],
        last_name: ["", Validators.required],
        email: ["", Validators.required],
        mobile_phone: ["", Validators.required],
        role: ["", Validators.required],
        sport: ["", Validators.required],
        club: ["", Validators.required],
        website: ["", Validators.required],
        logo: [null, this.fileValidator],
        message: ["", Validators.required],
      }
    );
  }

  ngOnInit() {
    localStorage.removeItem("stepperCurrentStepIndex");
  }

  fileValidator(control: any): { [key: string]: any } | null {
    const file = control.value;
    if (file && !['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      return { 'invalidFileType': true };
    }
    return null;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    // Update the form control value
    this.inquiryForm.patchValue({ logo: this.selectedFile });
  }

  clearFileInput(): void {
    // Reset the selectedFile and clear the file input
    this.selectedFile = null;
    const fileInput: HTMLInputElement | null = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Reset the value of the file input
    }
  }

  onSubmit(): void {
    // this.submitButtonClicked = true;
    if (this.inquiryForm.valid) {
      const formData: FormData = new FormData();
      // Append form data
      Object.keys(this.inquiryForm.value).forEach(key => {
        formData.append(key, this.inquiryForm.value[key]);
      });
      // Submit form data
      this.getInTouchService.submitInquiry(formData).subscribe(response => {
        // Handle response from server
        // console.log(response);
        this.toastr.success(response.message, 'Success');
        this.inquiryForm.reset();
        this.clearFileInput(); // Clear the file input
      }, (err) => {
        // this.toastr.warning('Something went wrong, please try again.', 'Info');
        this.toastr.warning(err?.error?.message, 'Info');
      });

    } else {
      // Handle form validation errors
      // You can display error messages to the user
      console.log('this.inquiryForm', this.inquiryForm);
      // console.log('this.inquiryForm.valid', this.inquiryForm.valid);
    }
  }


}

