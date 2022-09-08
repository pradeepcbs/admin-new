import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';

import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

export function minlengthValidationMessages(err: any, field: any) {
  return `Should have atleast ${field.templateOptions.minLength} characters`;
}

export function fieldMatchValidator(control: AbstractControl) {
  const { password, confirm_password } = control.value;

  // avoid displaying the message error when values are empty
  if (!confirm_password || !password) {
    return null;
  }

  if (confirm_password === password) {
    return null;
  }

  return { fieldMatch: { message: 'Password Not Matching' } };
}

export function validateEmail(control: AbstractControl) {
  const controlValue = control.value;
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(controlValue.email).toLowerCase())
    ? null
    : { emailValidate: { message: 'Email is not valid' } };
}
const routes: Routes = [
  { path: 'add-customer', component: CustomerFormComponent },
  { path: 'edit-customer/:id', component: CustomerFormComponent },
  { path: 'customer-list', component: CustomerListComponent },
];

@NgModule({
  declarations: [CustomerListComponent, CustomerFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormlyModule.forRoot({
      validators: [
        { name: 'fieldMatch', validation: fieldMatchValidator },
        { name: 'emailValidate', validation: validateEmail },
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'minlength', message: minlengthValidationMessages },
      ],
      extras: { lazyRender: true },
    }),
    FormlyBootstrapModule,
  ],
})
export class CustomerModule {}
