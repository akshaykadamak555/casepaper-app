import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ApiService } from '../api.service';
import { UsersListComponent } from '../users-list/users-list.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public signUpForm: any;
  genderList = ['Male', 'Female', 'Other'];
  userList = ['admin', 'normal'];
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      DOB: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      userType: ['', Validators.required],
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

    if (this.signUpForm.value.password !== this.signUpForm.value.confirmPassword) {
      this.snackBar.open('Password does not match', 'Ok', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }

    if (this.signUpForm.valid && (this.signUpForm.value.password === this.signUpForm.value.confirmPassword)) {
      this.apiService.createUser(addUserPayload).subscribe((response) => {
        console.log('response', response);
        this.getUsersList();
        this.snackBar.open('User Added Sucessfully!', 'Ok', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
    }
  }

  getUsersList() {
    this.apiService.getUsersList().subscribe((response) => {
      console.log('users list', response);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(UsersListComponent);
  }

}
