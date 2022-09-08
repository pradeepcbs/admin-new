import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CommonService } from '../../services/common.service';
import timezones from 'timezones-list';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss'],
})
export class StoreFormComponent implements OnInit {
  form = new FormGroup({});
  editId: any;
  storeData: any;
  model = {
    timezone: '',
    name: '',
    startTime: '',
    closeTime: '',
    description: '',
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Store Name',
            placeholder: 'Enter Store Name',
            required: true,
          },
        },
        {
          key: 'timezone',
          type: 'select',
          templateOptions: {
            label: 'Timezone',
            options: timezones.map((o) => ({
              value: o.tzCode,
              label: o.label,
            })),
          },
        },
        {
          key: 'startTime',
          type: 'datetimepicker',
          templateOptions: {
            label: 'Start Time',
            placeholder: 'Enter Start Time',
            required: true,
          },
        },
        {
          key: 'closeTime',
          type: 'datetimepicker',
          templateOptions: {
            label: 'Close Time',
            placeholder: 'Enter Close Time',
            required: true,
          },
        },
        {
          key: 'description',
          type: 'input',
          templateOptions: {
            label: 'Store Address',
            placeholder: 'Enter Store Address',
            required: true,
          },
        },
      ],
    },
  ];

  constructor(
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.editId = this.route.snapshot.paramMap.get('id');
    if (this.editId) {
      this.getDetailsById();
    }
  }

  async getDetailsById() {
    this.storeData = await this.commonService
      .getData(`stores/getDetails/${this.editId}`)
      .toPromise();
    this.model = {
      timezone: this.storeData.data.timezone,
      name: this.storeData.data.name,
      startTime: this.storeData.data.startTime,
      closeTime: this.storeData.data.closeTime,
      description: this.storeData.data.description,
    };
  }

  async onSubmit() {
    console.log(this.model, 'this.model');
    if (this.form.valid) {
      const httpPayload = {
        timezone: this.model.timezone,
        name: this.model.name,
        startTime: this.model.startTime,
        closeTime: this.model.closeTime,
        description: this.model.description,
      };
      if (this.editId) {
        await this.commonService
          .postData(`stores/update/${this.editId}`, httpPayload)
          .toPromise()
          .then((res) => {
            this.form.reset();
            this.toastr.success(res.message);
            this.router.navigate(['/stores/store-list']);
          });
      } else {
        try {
          await this.commonService
            .postData('stores/create', httpPayload)
            .toPromise()
            .then((res) => {
              this.form.reset();
              this.toastr.success(res.message);
              this.router.navigate(['/stores/store-list']);
            });
        } catch (err: any) {
          console.log('err ', err);
        }
      }
    }
  }
}
