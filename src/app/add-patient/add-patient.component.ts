import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent implements OnInit {
  public addPatientForm: any;
  genderList = ['Male', 'Female', 'Other'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.addPatientForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      pincode: ['', Validators.required],
      emailId: ['', Validators.email],
      phone: [''],
    });
  }

  submitPatient() {
    const addPatientPayload = {
      id: new Date().getTime(),
      firstName: this.addPatientForm.value.firstName,
      lastName: this.addPatientForm.value.lastName,
      dob: this.addPatientForm.value.dob,
      gender: this.addPatientForm.value.gender,
      address: this.addPatientForm.value.address,
      pincode: this.addPatientForm.value.pincode,
      emailId: this.addPatientForm.value.emailId,
      phone: this.addPatientForm.value.phone,
      casePaper: []
    };

    if (this.addPatientForm.valid) {
      this.apiService.createPatient(addPatientPayload).subscribe((response) => {
        console.log('response', response);
        this.snackBar.open('Patient Added Sucessfully!', 'Ok', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getPatientsList();
      });
    }
  }

  getPatientsList() {
    this.apiService.getPatients().subscribe((response) => {
      console.log('patients list', response);
    });
  }
}
