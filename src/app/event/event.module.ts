import { DepositListComponent } from './deposit-list/deposit-list.component';
import { AddDepositComponent } from './add-deposit/add-deposit.component';
import { ToastrModule } from 'ngx-toastr';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event.component';
import { HttpClientModule } from '@angular/common/http';
import {
  fieldMatchValidator,
  minlengthValidationMessages,
  validateEmail,
} from '../admin/admin.module';
import { RepeatTypeComponent } from '../packages/repeat-type/repeat-type.component';
import { EventListComponent } from './event-list/event-list.component';

const routes: Routes = [
  { path: 'add-event', component: EventComponent },
  { path: 'edit-event/:id', component: EventComponent },
  { path: 'event-list', component: EventListComponent },
  { path: 'min-deposit', component: AddDepositComponent },
  { path: 'edit-min-deposit/:id', component: AddDepositComponent },
  { path: 'min-deposit-list', component: DepositListComponent },
];

@NgModule({
  declarations: [
    EventComponent,
    EventListComponent,
    DepositListComponent,
    AddDepositComponent,
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
export class EventModule {}
