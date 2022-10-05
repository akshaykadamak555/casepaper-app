import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public signUpForm: any;
  genderList = ['Male', 'Female', 'Other'];
  userList = ['admin', 'normal'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.signUpForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      DOB: [''],
      gender: [''],
      password: [''],
      confirmPassword: [''],
      userType: [''],
    });
  }

  submit() {
    console.log('sign up form value', this.signUpForm.value);

    const addUserPayload = {
      id: new Date().getTime(),
      firstName: this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName,
      DOB: this.signUpForm.value.DOB,
      gender: this.signUpForm.value.gender,
      password: this.signUpForm.value.password,
      confirmPassword: this.signUpForm.value.confirmPassword,
      userType: this.signUpForm.value.userType,
    };

    this.apiService.createUser(addUserPayload).subscribe(response => {
      console.log('response', response);
      this.getUsersList();
      this.snackBar.open('User Added Sucessfully!', 'Ok',{
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    })
  }


  getUsersList() {
    this.apiService.getUsersList().subscribe(response => {
      console.log('users list', response);
    })
  }

}
