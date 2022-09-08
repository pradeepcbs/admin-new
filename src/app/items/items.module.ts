import { CategoryFormComponent } from './category/category-form/category-form.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { AddonListComponent } from './addon/addon-list/addon-list.component';
import { AddonCreateComponent } from './addon/addon-create/addon-create.component';
import { SubcategoryFormComponent } from './subcategory/subcategory-form/subcategory-form.component';
import { SubcategoryListComponent } from './subcategory/subcategory-list/subcategory-list.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemFormComponent } from './item/item-form/item-form.component';

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
  { path: 'add-category', component: CategoryFormComponent },
  { path: 'edit-category/:id', component: CategoryFormComponent },
  { path: 'category-list', component: CategoryListComponent },
  { path: 'add-sub-category', component: SubcategoryFormComponent },
  { path: 'edit-sub-category/:id', component: SubcategoryFormComponent },
  { path: 'sub-category-list', component: SubcategoryListComponent },
  { path: 'add-item', component: ItemFormComponent },
  { path: 'edit-item/:id', component: ItemFormComponent },
  { path: 'item-list', component: ItemListComponent },
  { path: 'add-addon', component: AddonCreateComponent },
  { path: 'addon-list', component: AddonListComponent },
];

@NgModule({
  declarations: [
    CategoryFormComponent,
    CategoryListComponent,
    AddonListComponent,
    AddonCreateComponent,
    SubcategoryFormComponent,
    SubcategoryListComponent,
    ItemListComponent,
    ItemFormComponent,
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
      ],
      extras: { lazyRender: true },
    }),
    FormlyBootstrapModule,
    ToastrModule.forRoot(),
  ],
})
export class ItemsModule {}
