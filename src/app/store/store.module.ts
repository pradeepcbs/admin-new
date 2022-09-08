import { FormlyDatepicker } from './store-form/formly-datepicker.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreFormComponent } from './store-form/store-form.component';
import { StoreUserFormComponent } from './user/store-user-form/store-user-form.component';
import { StoreUserListComponent } from './user/store-user-list/store-user-list.component';

import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
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
export function passwordValidationMessages(err: any, field: FormlyFieldConfig) {
  return `Password should have one Uppercase, Lowercase, Numbers, Special characters `;
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
  { path: 'add-store', component: StoreFormComponent },
  { path: 'edit-store/:id', component: StoreFormComponent },
  { path: 'store-list', component: StoreListComponent },
  { path: 'store-add-user', component: StoreUserFormComponent },
  { path: 'store-edit-user/:id', component: StoreUserFormComponent },
  { path: 'store-users-list', component: StoreUserListComponent },
];

@NgModule({
  declarations: [
    StoreListComponent,
    StoreFormComponent,
    StoreUserFormComponent,
    StoreUserListComponent,
    FormlyDatepicker,
  ],
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
        { name: 'password', message: passwordValidationMessages },
      ],
      extras: { lazyRender: true },
      types: [{ name: 'datetimepicker', component: FormlyDatepicker }],
    }),
    FormlyBootstrapModule,
  ],
})
export class StoreModule {}
