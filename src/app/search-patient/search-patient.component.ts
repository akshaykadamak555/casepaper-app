import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ColDef } from 'ag-grid-community';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { ApiService } from '../api.service';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { Patient } from '../patient.types';

@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.scss'],
})
export class SearchPatientComponent implements OnInit {
  public searchPatientForm: any;
  public patientList: Array<Patient> | undefined;
  public filteredPatientList: Array<Patient> | undefined = [{}];
  public flowStarted: boolean = false;
  public noRowsTemplate: any;
  public loadingTemplate: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.loadingTemplate = `Searched patient will be displayed here`;
    this.noRowsTemplate = `Searched patient will be displayed here`;
  }
  ngOnInit(): void {
    this.createFormGroup();
  }

  columnDefs: ColDef[] = [
    { field: 'id', sortable: true },
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'dob' },
    { field: 'gender' },
    { field: 'address' },
    { field: 'pincode' },
    { field: 'emailId' },
    { field: 'phone' },
  ];

  rowData: any = [];

  openDialog() {
    const dialogRef = this.dialog.open(AddPatientComponent);

    /*     dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    }); */
  }

  openPatientDetailsDialog() {
    const dialogRef = this.dialog.open(PatientDetailsComponent);
  }

  createFormGroup() {
    this.searchPatientForm = this.formBuilder.group({
      patientId: [''],
      firstName: [''],
      lastName: [''],
      dob: [''],
    });
  }

  submit() {
    this.flowStarted = true;
    console.log('search patient form value', this.searchPatientForm.value);
    this.getUsersList();
  }

  getUsersList() {
    this.apiService.getPatients().subscribe((response) => {
      this.patientList = response;
      console.log('patients list', response);
      this.filterPatientList();
    });
  }

  filterPatientList() {
    this.filteredPatientList = [];
    if (this.patientList) {
      for (let data of this.patientList) {
        if (this.searchPatientForm.value.patientId.length > 1) {
          if (data.id == this.searchPatientForm.value.patientId) {
            console.log(data);
            this.filteredPatientList?.push(data);
          }
        }
        if (this.searchPatientForm.value.firstName.length > 1) {
          if (
            data.firstName?.toLowerCase() ==
            this.searchPatientForm.value.firstName.toLowerCase()
          ) {
            this.filteredPatientList?.push(data);
          }
        }
        if (this.searchPatientForm.value.lastName.length > 1) {
          if (
            data.lastName?.toLowerCase() ==
            this.searchPatientForm.value.lastName.toLowerCase()
          ) {
            this.filteredPatientList?.push(data);
          }
        }
      }
    }

    this.rowData = this.filteredPatientList;

    if (this.rowData.length === 0) {
      this.loadingTemplate = `Patient Not Found`;
      this.noRowsTemplate = `Patient Not Found`;
      this.snackBar.open('Patient Not Found !', 'Ok', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    console.log('filtered patients array', this.filteredPatientList);

    /*     if(this.searchPatientForm.value.patientId.length > 1) {
      const data: any =  this.patientList?.filter(patient =>
       patient?.id == this.searchPatientForm.value.patientId);
       this.filteredPatientList = [...data];
    }
     if(this.searchPatientForm.value.firstName.length > 1) {
      const data: any =  this.patientList?.filter(patient =>
        patient?.firstName.toLowerCase() === this.searchPatientForm.value.firstName.toLowerCase());
        this.filteredPatientList = [this.filteredPatientList, ...data];
    } */
  }

  onRowClicked(event: any) {
    console.log('selected patient', event);
    this.openPatientDetailsDialog();
    this.apiService.selectedPatient.next(event.data);
  }
}
