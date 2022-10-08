import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { ApiService } from '../api.service';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { Patient } from '../patient.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public searchPatientForm: any;
  public patientList: Array<Patient> | undefined;
  public filteredPatientList: Array<Patient> | undefined = [{}];
  public flowStarted: boolean = false;
  public noRowsTemplate: any;
  public loadingTemplate: any;
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.loadingTemplate = `No data to display`;
    this.noRowsTemplate = `No data to display`;
  }
  ngOnInit(): void {
    this.getCasePaperDetails();
  }

  /*
        "id": new Date().getTime(),
      "patientId": this.selectedPatient?.id,
      "patientName": this.selectedPatient?.firstName + ' ' + this.selectedPatient?.lastName,
      "patientGender": this.selectedPatient?.gender,
      "patientDOB": this.selectedPatient?.dob,
      "phone": this.selectedPatient?.phone,
      "patientComplaints": this.patientComplaint.value,
      "date": new Date() */

  columnDefs: ColDef[] = [
    { field: 'id', sortable: true },
    { field: 'patientId' },
    { field: 'patientName' },
    { field: 'patientGender' },
    { field: 'patientDOB' },
    { field: 'phone' },
    { field: 'date' },
    { field: 'patientComplaints' },
  ];

  rowData: any = [];

  getCasePaperDetails() {
    this.apiService.getCasepaperDetails().subscribe(response => {
      console.log('casepaper details', response);
      this.rowData = response;
    })
  }
}
