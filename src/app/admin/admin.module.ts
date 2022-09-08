import { AdminFormsComponent } from './admin-forms/admin-forms.component';
import { AdminListComponent } from './admin-list/admin-list.component';
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
import { ToastrModule } from 'ngx-toastr';

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
  { path: 'add-admin', component: AdminFormsComponent },
  { path: 'edit-admin/:id', component: AdminFormsComponent },
  { path: 'admin-list', component: AdminListComponent },
];

@NgModule({
  declarations: [AdminFormsComponent, AdminListComponent],
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
    ToastrModule.forRoot(),
  ],
})
export class AdminModule {}
