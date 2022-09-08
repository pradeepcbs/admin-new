import { GratuityListComponent } from './gratuity/gratuity-list/gratuity-list.component';
import { GratuityFormComponent } from './gratuity/gratuity-form/gratuity-form.component';
import { ToastrModule } from 'ngx-toastr';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageListComponent } from './package/package-list/package-list.component';
import { TaxListComponent } from './tax/tax-list/tax-list.component';
import { TaxFormComponent } from './tax/tax-form/tax-form.component';
import { PackageFormComponent } from './package/package-form/package-form.component';
import { HttpClientModule } from '@angular/common/http';
import {
  fieldMatchValidator,
  minlengthValidationMessages,
  validateEmail,
} from '../admin/admin.module';
import { CourseComponent } from './package/course/course.component';
import { CourseListComponent } from './package/course-list/course-list.component';
import { RepeatTypeComponent } from './repeat-type/repeat-type.component';

const routes: Routes = [
  { path: 'add-package', component: PackageFormComponent },
  { path: 'edit-package/:id', component: PackageFormComponent },
  { path: 'package-list', component: PackageListComponent },
  { path: 'add-course', component: CourseComponent },
  { path: 'edit-course/:id', component: CourseComponent },
  { path: 'course-list', component: CourseListComponent },
  { path: 'add-tax', component: TaxFormComponent },
  { path: 'edit-tax/:id', component: TaxFormComponent },
  { path: 'tax-list', component: TaxListComponent },
  { path: 'add-gratuity', component: GratuityFormComponent },
  { path: 'edit-gratuity/:id', component: GratuityFormComponent },
  { path: 'gratuity-list', component: GratuityListComponent },
];

@NgModule({
  declarations: [
    PackageListComponent,
    TaxListComponent,
    TaxFormComponent,
    PackageFormComponent,
    CourseComponent,
    CourseListComponent,
    RepeatTypeComponent,
    GratuityFormComponent,
    GratuityListComponent,
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
      types: [{ name: 'repeat', component: RepeatTypeComponent }],
    }),
    FormlyBootstrapModule,
    ToastrModule.forRoot(),
  ],
})
export class PackagesModule {}
