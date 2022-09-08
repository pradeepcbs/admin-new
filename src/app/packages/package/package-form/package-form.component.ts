import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-package-form',
  templateUrl: './package-form.component.html',
  styleUrls: ['./package-form.component.scss'],
})
export class PackageFormComponent implements OnInit {
  form = new UntypedFormGroup({});
  editId: any;
  packageData: any;
  model = {
    storeID: '',
    name: '',
    media: '',
    tax: '',
    description: '',
    shortDescription: '',
    type: '',
    price: '',
    min: '',
    max: '',
    adultPrice: '',
    childPrice: '',
    courses: [{}],
  };
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroup: [
        {
          key: 'storeID',
          type: 'select',
          templateOptions: {
            label: 'Store',
            options: this.commonService.getStores(),
            required: true,
          },
        },
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Name',
            placeholder: 'Enter Package Name',
            required: true,
          },
        },
        {
          key: 'media',
          type: 'input',
          templateOptions: {
            label: 'Media',
            placeholder: 'Enter Media url',
            required: true,
          },
        },
        {
          key: 'tax',
          type: 'select',
          templateOptions: {
            label: 'Tax',
            options: this.commonService.getTax(),
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
          key: 'shortDescription',
          type: 'input',
          templateOptions: {
            label: 'Short Description',
            placeholder: 'Enter Short Description',
            required: true,
          },
        },
        {
          key: 'type',
          type: 'select',
          templateOptions: {
            label: 'Type',
            options: [
              {
                value: 'birthday',
                label: 'Birthday',
              },
              {
                value: 'event',
                label: 'Event',
              },
              {
                value: 'office',
                label: 'Office',
              },
              {
                value: 'anniversary',
                label: 'Anniversary',
              },
              {
                value: 'party',
                label: 'Party',
              },
              {
                value: 'get-together',
                label: 'Get Together',
              },
              {
                value: 'send-off',
                label: 'Send-off',
              },
              {
                value: 'others',
                label: 'Others',
              },
            ],
            required: true,
          },
        },
        {
          key: 'price',
          type: 'input',
          templateOptions: {
            type: 'number',
            label: 'Price',
            placeholder: 'Enter Price',
            required: true,
          },
        },
        {
          key: 'min',
          type: 'input',
          templateOptions: {
            label: 'Min Person',
            type: 'number',
            placeholder: 'Enter Min Person',
            required: true,
          },
        },
        {
          key: 'max',
          type: 'input',
          templateOptions: {
            label: 'Max Person',
            type: 'number',
            placeholder: 'Enter Max Person',
            required: true,
          },
        },
        {
          key: 'adultPrice',
          type: 'input',
          templateOptions: {
            label: 'Adult Price',
            type: 'number',
            placeholder: 'Enter Adult Price',
            required: true,
          },
        },
        {
          key: 'childPrice',
          type: 'input',
          templateOptions: {
            label: 'Child Price',
            type: 'number',
            placeholder: 'Enter Child Price',
            required: true,
          },
        },
        {
          key: 'courses',
          type: 'repeat',
          templateOptions: {
            addText: 'Add Course',
          },
          fieldArray: {
            fieldGroup: [
              {
                type: 'input',
                key: 'name',
                templateOptions: {
                  label: 'Name of Course:',
                  required: true,
                },
              },
              {
                type: 'input',
                key: 'description',
                templateOptions: {
                  label: 'Description',
                },
              },
              {
                key: 'items',
                type: 'repeat',
                templateOptions: {
                  addText: 'Add Items',
                },
                fieldArray: {
                  fieldGroup: [
                    {
                      type: 'select',
                      key: 'itemName',
                      templateOptions: {
                        label: 'Item',
                        options: this.commonService.getItems(),
                        required: true,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  ];

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
    this.packageData = await this.commonService
      .getData(`package/getDetails/${this.editId}`)
      .toPromise();
    this.packageData.data.courses.map((res: any) => {
      let itemData = res.items.map((resp: any) => {
        return (resp = { itemName: resp });
      });
      return (res.items = itemData);
    });
    console.log(this.packageData.data.courses, 'this.packageData.data.courses');

    this.model = {
      storeID: this.packageData.data.package.storeID._id,
      name: this.packageData.data.package.name,
      media: this.packageData.data.package.media,
      tax: this.packageData.data.package.tax,
      description: this.packageData.data.package.description,
      shortDescription: this.packageData.data.package.shortDescription,
      type: this.packageData.data.package.type,
      price: this.packageData.data.package.price,
      min: this.packageData.data.package.pax.min,
      max: this.packageData.data.package.pax.max,
      adultPrice: this.packageData.data.package.paxExtra.adult.price,
      childPrice: this.packageData.data.package.paxExtra.child.price,
      courses: this.packageData.data.courses,
    };
  }
  async onSubmit() {
    this.form.value.courses.map((res: any) => {
      res.items = res.items.map((response: any) => {
        return response['itemName'];
      });
      res.storeID = this.model.storeID;
    });

    if (this.form.valid) {
      if (this.editId) {
        this.updateAddon();
      } else {
        this.createAddon();
      }
    }
  }

  async createAddon() {
    const httpPayload = {
      package: {
        storeID: this.form.value.storeID,
        name: this.form.value.name,
        media: this.form.value.media,
        tax: this.form.value.tax,
        description: this.form.value.description,
        shortDescription: this.form.value.shortDescription,
        type: this.form.value.type,
        pax: {
          min: this.form.value.min,
          max: this.form.value.max,
        },
        paxExtra: {
          adult: {
            price: this.form.value.adultPrice,
          },
          child: {
            price: this.form.value.childPrice,
          },
        },
        price: this.form.value.price,
      },
      courses: this.form.value.courses,
    };
    try {
      const result = await this.commonService
        .postData('package/create', httpPayload)
        .toPromise()
        .then((res: any) => {
          this.toastr.success(res.message);
          this.router.navigate(['/packages/package-list']);
        });
    } catch (err: any) {
      console.log('err ', err);
    }
  }
  async updateAddon() {
    console.log(this.model, 'this.form.value.courses');
    this.model.courses.map((res: any) => {
      res.items = res.items.map(function (item: any) {
        return item['itemName'] || item;
      });
      res.storeID = this.model.storeID;
      res.packageId = this.editId;
    });
    try {
      const httpPayload = {
        package: {
          storeID: this.form.value.storeID,
          name: this.form.value.name,
          media: this.form.value.media,
          tax: this.form.value.tax,
          description: this.form.value.description,
          shortDescription: this.form.value.shortDescription,
          type: this.form.value.type,
          pax: {
            min: this.form.value.min,
            max: this.form.value.max,
          },
          paxExtra: {
            adult: {
              price: this.form.value.adultPrice,
            },
            child: {
              price: this.form.value.childPrice,
            },
          },
          price: this.form.value.price,
        },
        courses: this.model.courses,
      };
      const result = await this.commonService
        .postData(`package/update/${this.editId}`, httpPayload)
        .toPromise()
        .then((res: any) => {
          this.toastr.success(res.message);
          this.router.navigate(['/packages/package-list']);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err: any) {
      console.log('err ', err);
    }
  }
}
