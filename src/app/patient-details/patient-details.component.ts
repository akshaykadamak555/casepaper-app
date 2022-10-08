import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent implements OnInit {
  selectedPatient: any;
  patientComplaint = new FormControl();
  constructor(private apiService: ApiService,
    public dialog: MatDialog,) {
    console.log('called');
    this.apiService.selectedPatient.subscribe(response => {
      this.selectedPatient = response;
      console.log('selected patient', response);
    })
  }

  ngOnInit(): void {
  }


  updatePatientInfo() {
    const payload = {
      ...this.selectedPatient,
      ...this.selectedPatient.casePaper.push(
        {
          "id": new Date().getTime(),
          "patientComplaints": this.patientComplaint.value,
          "date": new Date()
        },
      )
    };
    this.apiService.updateUser(payload).subscribe(response => {
      console.log('response', response);
    })
  }

  createCasepaper() {
    const casePaperPayload = {
      "id": new Date().getTime(),
      "patientId": this.selectedPatient?.id,
      "patientName": this.selectedPatient?.firstName + ' ' + this.selectedPatient?.lastName,
      "patientGender": this.selectedPatient?.gender,
      "patientDOB": this.selectedPatient?.dob,
      "phone": this.selectedPatient?.phone,
      "patientComplaints": this.patientComplaint.value,
      "date": new Date()
    };
    this.updatePatientInfo();
    this.apiService.createCasePaper(casePaperPayload).subscribe(response => {
      console.log('cerate casepaper response', response);
    })
  }
}
