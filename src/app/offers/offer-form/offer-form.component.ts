import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss'],
})
export class OfferFormComponent implements OnInit {
  form = new FormGroup({});
  stores: any;
  editId: any;
  packageList: any;
  model = {
    storeID: '',
    name: '',
    code: '',
    media: '',
    description: '',
    maxDiscount: '',
    applyToAll: '',
    package: '',
    validFrom: '',
    validTill: '',
    percentage: '',
    customers: [],
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
            label: 'Offer Name',
            placeholder: 'Enter Offer Name',
            required: true,
          },
        },
        {
          key: 'media',
          type: 'input',
          templateOptions: {
            label: 'Offer media',
            placeholder: 'Enter Offer media',
            required: true,
          },
        },
        {
          key: 'code',
          type: 'input',
          templateOptions: {
            label: 'Offer Code',
            placeholder: 'Enter Offer Code',
            required: true,
          },
        },
        {
          key: 'description',
          type: 'input',
          templateOptions: {
            label: 'Description',
            placeholder: 'Enter Description',
            required: true,
          },
        },
        {
          key: 'maxDiscount',
          type: 'input',
          templateOptions: {
            label: 'Max Discount',
            placeholder: 'Enter Max Discount',
            required: true,
          },
        },
        {
          key: 'applyToAll',
          type: 'select',
          templateOptions: {
            label: 'Select Apply To All',
            options: [
              {
                value: true,
                label: 'Yes',
              },
              {
                value: false,
                label: 'No',
              },
            ],
            required: true,
          },
        },
        {
          key: 'package',
          type: 'select',
          templateOptions: {
            label: 'Package',
            options: this.commonService.getPackageList(),
          },
        },
        // {
        //   key: 'package' /* suppose this field as "my_select"  */,
        //   type: 'ng-select',
        //   templateOptions: {
        //     multiple: true,
        //     placeholder: 'Select Option',
        //     options: this.commonService.getPackageList(),
        //   },
        // },
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
          key: 'percentage',
          type: 'input',
          templateOptions: {
            label: 'Percentage',
            placeholder: 'Enter Percentage',
            required: true,
          },
        },
      ],
    },
  ];
  offerData: any;

  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.editId = this.route.snapshot.paramMap.get('id');
    if (this.editId) {
      this.getDetailsById();
    }
  }

  async getDetailsById() {
    this.offerData = await this.commonService
      .getData(`offers/getDetails/${this.editId}`)
      .toPromise();
    this.model = {
      storeID: this.offerData.data.storeID._id,
      name: this.offerData.data.name,
      code: this.offerData.data.code,
      media: this.offerData.data.media,
      description: this.offerData.data.description,
      maxDiscount: this.offerData.data.maxDiscount,
      applyToAll: this.offerData.data.applyToAll,
      package: this.offerData.data.package[0],
      validFrom: this.offerData.data.validFrom,
      validTill: this.offerData.data.validTill,
      percentage: this.offerData.data.percentage,
      customers: [],
    };
  }

  async onSubmit() {
    if (this.form.valid) {
      const arr = [];
      arr.push(this.model.package);
      const httpPayload = {
        storeID: this.model.storeID,
        name: this.model.name,
        code: this.model.code,
        media: this.model.media,
        description: this.model.description,
        maxDiscount: this.model.maxDiscount,
        applyToAll: this.model.applyToAll,
        package: arr,
        customers: [],
        validFrom: this.model.validFrom,
        validTill: this.model.validTill,
        percentage: this.model.percentage,
      };
      console.log(httpPayload, 'httpPayload');
      if (this.editId) {
        this.updateOffer(httpPayload);
      } else {
        this.createOffer(httpPayload);
      }
    }
  }

  async createOffer(httpPayload: any) {
    try {
      const result = await this.commonService
        .postData('offers/create', httpPayload)
        .toPromise()
        .then((res: any) => {
          this.toastr.success(res.message);
          this.router.navigate(['items/Offer-list']);
        });
    } catch (err: any) {
      console.log('err ', err);
    }
  }

  async updateOffer(httpPayload: any) {
    try {
      const result = await this.commonService
        .postData(`offers/update/${this.editId}`, httpPayload)
        .toPromise()
        .then((res: any) => {
          this.toastr.success(res.message);
          this.router.navigate(['items/offer-list']);
        });
    } catch (err: any) {
      console.log('err ', err);
    }
  }
}
