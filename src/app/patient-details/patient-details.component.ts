import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent implements OnInit {
  selectedPatient: any;
  constructor(private apiService: ApiService) {
    console.log('called');
    this.apiService.selectedPatient.subscribe(response => {
      this.selectedPatient = response;
      console.log('selected patient', response);
    })
  }

  ngOnInit(): void {
  }
}
