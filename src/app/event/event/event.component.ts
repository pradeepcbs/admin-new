import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  form = new UntypedFormGroup({});
  editId: any;
  eventData: any;
  model = {
    storeID: '',
    name: '',
    description: '',
    kidPricePercentage: '',
    kidPriceFixed: '',
    kidPriceSelectedTypes: 'percentage',
    menus: [{}],
    sections: [{}],
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
            placeholder: 'Enter Party Name',
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
          key: 'kidPriceSelectedTypes',
          type: 'select',
          defaultValue: 'percentage',
          templateOptions: {
            label: 'Kids Default Price Type',
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
          key: 'kidPricePercentage',
          type: 'input',
          templateOptions: {
            label: 'Kids Default Price Percentage',
            placeholder: 'Enter Kids Default Price Percentage',
            required: true,
          },
          hideExpression: 'model.kidPriceSelectedTypes == "fixed"',
        },
        {
          key: 'kidPriceFixed',
          type: 'input',
          templateOptions: {
            label: 'Kids Default Fixed Price',
            placeholder: 'Enter Kids Default Fixed Price',
            required: true,
          },
          hideExpression: 'model.kidPriceSelectedTypes == "percentage"',
        },
        {
          key: 'menus',
          type: 'repeat',
          templateOptions: {
            addText: 'Add Menus',
          },
          fieldArray: {
            fieldGroup: [
              {
                type: 'input',
                key: 'header',
                templateOptions: {
                  label: 'Name of Menu:',
                  required: true,
                },
              },
              {
                type: 'input',
                key: 'subHeader',
                templateOptions: {
                  label: 'Short Description',
                  required: true,
                },
              },
              {
                type: 'input',
                key: 'price',
                templateOptions: {
                  label: 'Price',
                  required: true,
                  type: 'number',
                },
              },
              {
                type: 'input',
                key: 'description',
                templateOptions: {
                  label: 'Description',
                },
              },
            ],
          },
        },
        {
          key: 'sections',
          type: 'repeat',
          templateOptions: {
            addText: 'Add Sections',
          },
          fieldArray: {
            fieldGroup: [
              {
                type: 'input',
                key: 'name',
                templateOptions: {
                  label: 'Name of Section',
                  required: true,
                },
              },
              {
                type: 'input',
                key: 'no_of_choices',
                templateOptions: {
                  label: 'Number Of Choice',
                  required: true,
                  type: 'number',
                },
              },
              {
                type: 'input',
                key: 'additional_cost',
                templateOptions: {
                  label: 'Additional Cost',
                  required: true,
                  type: 'number',
                },
              },
              {
                key: 'options',
                type: 'repeat',
                templateOptions: {
                  addText: 'Add Options',
                },
                fieldArray: {
                  fieldGroup: [
                    {
                      type: 'input',
                      key: 'name',
                      templateOptions: {
                        label: 'Option Name',
                        required: true,
                      },
                    },
                    {
                      type: 'input',
                      key: 'description',
                      templateOptions: {
                        label: 'Option Description',
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
    this.eventData = await this.commonService
      .getData(`eventBook/getDetails/${this.editId}`)
      .toPromise();
    console.log(this.eventData, 'this.eventData');
    this.model = {
      storeID: this.eventData.data.storeID,
      name: this.eventData.data.name,
      description: this.eventData.data.description,
      menus: this.eventData.data.menus,
      sections: this.eventData.data.sections,
      kidPricePercentage: this.eventData.data.kidPricePercentage,
      kidPriceFixed: this.eventData.data.kidPriceFixed,
      kidPriceSelectedTypes: this.eventData.data.kidPriceSelectedTypes,
    };
  }
  async onSubmit() {
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
      storeID: this.form.value.storeID,
      name: this.form.value.name,
      description: this.form.value.description,
      menus: this.form.value.menus,
      sections: this.form.value.sections,
      kidPricePercentage:
        this.form.value.kidPriceSelectedTypes == 'percentage'
          ? this.form.value.kidPricePercentage
          : 0,
      kidPriceFixed:
        this.form.value.kidPriceSelectedTypes == 'fixed'
          ? this.form.value.kidPriceFixed
          : 0,
      kidPriceSelectedTypes: this.form.value.kidPriceSelectedTypes,
    };
    try {
      const result = await this.commonService
        .postData('eventBook/create', httpPayload)
        .toPromise()
        .then((res: any) => {
          this.toastr.success(res.message);
          this.router.navigate(['/event/event-list']);
        });
    } catch (err: any) {
      console.log('err ', err);
    }
  }
  async updateAddon() {
    try {
      const httpPayload = {
        storeID: this.form.value.storeID,
        name: this.form.value.name,
        description: this.form.value.description,
        menus: this.form.value.menus,
        sections: this.form.value.sections,
        kidPricePercentage:
          this.form.value.kidPriceSelectedTypes == 'percentage'
            ? this.form.value.kidPricePercentage
            : 0,
        kidPriceFixed:
          this.form.value.kidPriceSelectedTypes == 'fixed'
            ? this.form.value.kidPriceFixed
            : 0,
        kidPriceSelectedTypes: this.form.value.kidPriceSelectedTypes,
      };
      const result = await this.commonService
        .postData(`eventBook/update/${this.editId}`, httpPayload)
        .toPromise()
        .then((res: any) => {
          this.toastr.success(res.message);
          this.router.navigate(['/event/event-list']);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err: any) {
      console.log('err ', err);
    }
  }
}
