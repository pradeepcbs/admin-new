import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-tax-form',
  templateUrl: './tax-form.component.html',
  styleUrls: ['./tax-form.component.scss'],
})
export class TaxFormComponent implements OnInit {
  form = new FormGroup({});
  editId: any;
  storeData: any;
  model = {
    name: '',
    storeID: '',
    percentage: '',
    description: '',
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
            label: 'Tax Name',
            placeholder: 'Enter Tax Name',
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
        {
          key: 'description',
          type: 'input',
          templateOptions: {
            label: 'Description',
            placeholder: 'Enter Description',
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
      .getData(`tax/getDetails/${this.editId}`)
      .toPromise();
    this.model = {
      name: this.storeData.data.name,
      storeID: this.storeData.data.storeID,
      percentage: this.storeData.data.percentage,
      description: this.storeData.data.description,
    };
  }

  async onSubmit() {
    if (this.form.valid) {
      const httpPayload = {
        name: this.model.name,
        storeID: this.model.storeID,
        percentage: this.model.percentage,
        description: this.model.description,
      };
      if (this.editId) {
        await this.commonService
          .postData(`tax/update/${this.editId}`, httpPayload)
          .toPromise()
          .then((res) => {
            this.form.reset();
            this.router.navigate(['/packages/tax-list']);
          });
      } else {
        try {
          await this.commonService
            .postData('tax/create', httpPayload)
            .toPromise()
            .then((res) => {
              this.form.reset();
              this.router.navigate(['/packages/tax-list']);
            });
        } catch (err: any) {
          console.log('err ', err);
        }
      }
    }
  }
}
