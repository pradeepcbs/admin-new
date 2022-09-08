import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ShiftFormComponent } from './shift/shift-form/shift-form.component';
import { ShiftListComponent } from './shift/shift-list/shift-list.component';



@NgModule({
  declarations: [EmployeeFormComponent, EmployeeListComponent, ShiftFormComponent, ShiftListComponent],
  imports: [
    CommonModule
  ]
})
export class EmployeeModule { }
