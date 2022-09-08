import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss'],
})
export class CouponComponent implements OnInit {
  form = new FormGroup({});
  editId: any;
  storeData: any;
  model = {
    storeID: '',
    name: '',
    couponCode: '',
    validFrom: '',
    validTill: '',
    discountType: 'Fixed',
    active: '',
    // discountVal: '',
    percentage: '',
    fixed: '',
    selectedTypes: 'percentage',
    minOrderVal: '',
    description: '',
    maxDiscountAmount: '',
    sellerID: [],
    usagePerDay: '',
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroup: [
        {
          key: 'storeID',
          type: 'select',
          templateOptions: {
            label: 'Store',
            options: this.commonService.getStores(),
          },
        },
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Coupon Name',
            placeholder: 'Enter Coupon Name',
            required: true,
          },
        },
        {
          key: 'couponCode',
          type: 'input',
          templateOptions: {
            label: 'Coupon Code',
            placeholder: 'Enter Coupon Code',
            required: true,
          },
        },
        {
          key: 'validFrom',
          type: 'input',
          templateOptions: {
            label: 'Valid From',
            placeholder: 'Enter Valid From',
            required: true,
          },
        },
        {
          key: 'validTill',
          type: 'input',
          templateOptions: {
            label: 'Valid Till',
            placeholder: 'Enter Valid Till',
            required: true,
          },
        },
        {
          key: 'active',
          type: 'select',
          templateOptions: {
            label: 'Coupon Type',
            required: true,
            options: [
              { value: true, label: 'Active' },
              { value: false, label: 'In-Active' },
            ],
          },
        },
        {
          key: 'selectedTypes',
          type: 'select',
          defaultValue: 'percentage',
          templateOptions: {
            label: 'Discount Type',
            options: [
              {
                value: 'percentage',
                label: 'percentage',
              },
              {
                value: 'fixed',
                label: 'fixed',
              },
            ],
          },
        },
        {
          key: 'percentage',
          type: 'input',
          templateOptions: {
            label: 'Percentage',
            placeholder: 'Enter Percentage',
            required: true,
          },
          hideExpression: 'model.selectedTypes == "fixed"',
        },
        {
          key: 'fixed',
          type: 'input',
          templateOptions: {
            label: 'Fixed Amount',
            placeholder: 'Enter Fixed Amount',
            required: true,
          },
          hideExpression: 'model.selectedTypes == "percentage"',
        },
        // {
        //   key: 'discountVal',
        //   type: 'input',
        //   templateOptions: {
        //     label: 'Discount Value',
        //     placeholder: 'Enter Discount Value',
        //     required: true,
        //   },
        // },
        {
          key: 'description',
          type: 'input',
          templateOptions: {
            label: 'Description',
            placeholder: 'Enter Description',
          },
        },
        {
          key: 'minOrderVal',
          type: 'input',
          templateOptions: {
            label: 'Min Order Value',
            placeholder: 'Enter Min Order Value',
            required: true,
          },
        },
        {
          key: 'maxDiscountAmount',
          type: 'input',
          templateOptions: {
            label: 'Max Discount Amount',
            placeholder: 'Enter Max Discount Amount',
            required: true,
          },
        },
        {
          key: 'usagePerDay',
          type: 'input',
          templateOptions: {
            label: 'Usage Per Day',
            placeholder: 'Enter Usage Per Day',
            required: true,
          },
        },
      ],
    },
  ];

  constructor(
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editId = this.route.snapshot.paramMap.get('id');
    if (this.editId) {
      this.getDetailsById();
    }
  }

  async getDetailsById() {
    this.storeData = await this.commonService
      .postData(`coupon/details/${this.editId}`)
      .toPromise();
    console.log(this.storeData, 'gsahgs');
    this.model = {
      storeID: this.storeData.data.storeID._id,
      name: this.storeData.data.name,
      couponCode: this.storeData.data.couponCode,
      validFrom: this.storeData.data.validFrom,
      validTill: this.storeData.data.validTill,
      discountType: 'Fixed',
      active: this.storeData.data.active,
      // discountVal: this.storeData.data.discountVal,
      percentage: this.storeData.data.percentage,
      fixed: this.storeData.data.fixed,
      selectedTypes: this.storeData.data.selectedTypes,
      minOrderVal: this.storeData.data.minOrderVal,
      description: this.storeData.data.description,
      maxDiscountAmount: this.storeData.data.maxDiscountAmount,
      sellerID: [],
      usagePerDay: this.storeData.data.usagePerDay,
    };
  }

  async onSubmit() {
    console.log(this.form.value, 'this.model.validFrom');
    if (this.form.valid) {
      const httpPayload = {
        name: this.model.name,
        storeID: this.model.storeID,
        couponCode: this.model.couponCode,
        validFrom: this.model.validFrom,
        validTill: this.model.validTill,
        discountType: 'Fixed',
        active: this.model.active,
        // discountVal: this.model.discountVal,
        percentage:
          this.model.selectedTypes == 'percentage' ? this.model.percentage : 0,
        fixed: this.model.selectedTypes == 'fixed' ? this.model.fixed : 0,
        selectedTypes: this.model.selectedTypes,
        minOrderVal: this.model.minOrderVal,
        description: this.model.description,
        maxDiscountAmount: this.model.maxDiscountAmount,
        sellerID: [],
        usagePerDay: this.model.usagePerDay,
      };
      if (this.editId) {
        await this.commonService
          .postData(`coupon/update/${this.editId}`, httpPayload)
          .toPromise()
          .then((res) => {
            this.form.reset();
            this.router.navigate(['/offers/coupon-list']);
          });
      } else {
        try {
          await this.commonService
            .postData('coupon/create', httpPayload)
            .toPromise()
            .then((res) => {
              this.form.reset();
              this.router.navigate(['/offers/coupon-list']);
            });
        } catch (err: any) {
          console.log('err ', err);
        }
      }
    }
  }
}
