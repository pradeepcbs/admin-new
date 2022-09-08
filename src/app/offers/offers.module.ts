import { FormlyFieldNgSelect } from './../types/ng-select.type.component';
import { ToastrModule } from 'ngx-toastr';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferFormComponent } from './offer-form/offer-form.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { CouponComponent } from './coupon/coupon.component';
import { CouponListComponent } from './coupon-list/coupon-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatetimepickerFieldType } from '../types/datetimepicker.type.compoment';

const routes: Routes = [
  { path: 'add-offer', component: OfferFormComponent },
  { path: 'edit-offer/:id', component: OfferFormComponent },
  { path: 'offer-list', component: OfferListComponent },
  { path: 'add-coupon', component: CouponComponent },
  { path: 'edit-coupon/:id', component: CouponComponent },
  { path: 'coupon-list', component: CouponListComponent },
];

@NgModule({
  declarations: [
    OfferListComponent,
    OfferFormComponent,
    FormlyFieldNgSelect,
    DatetimepickerFieldType,
    CouponComponent,
    CouponListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      types: [
        { name: 'ng-select', component: FormlyFieldNgSelect },
        {
          name: 'datetimepicker',
          component: DatetimepickerFieldType,
          extends: 'input',
        },
      ],
    }),
    ToastrModule.forRoot(),
  ],
})
export class OffersModule {}
