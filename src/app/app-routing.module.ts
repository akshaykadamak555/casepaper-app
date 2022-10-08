import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { SearchPatientComponent } from './search-patient/search-patient.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search-patient', component: SearchPatientComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'add-patient', component: AddPatientComponent },
  { path: 'help', component: HelpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
