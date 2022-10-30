import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  columnDefs: ColDef[] = [
    { field: 'id', sortable: true },
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'dob' },
    { field: 'gender' },
    { field: 'password' },
    { field: 'confirmPasswod' },
    { field: 'userType' },
  ];

  rowData: any = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.apiService.getUsersList().subscribe(response => {
      this.rowData = response;
    })
  }

}
