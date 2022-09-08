import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-gratuity-form',
  templateUrl: './gratuity-form.component.html',
  styleUrls: ['./gratuity-form.component.scss'],
})
export class GratuityFormComponent implements OnInit {
  form = new FormGroup({});
  editId: any;
  storeData: any;
  model = {
    name: '',
    storeID: '',
    percentage: '',
    fixed: '',
    description: '',
    selectedTypes: 'percentage',
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
            label: 'Tips & Gratuity Name',
            placeholder: 'Enter Tips & Gratuity Name',
            required: true,
          },
        },
        {
          key: 'selectedTypes',
          type: 'select',
          defaultValue: 'percentage',
          templateOptions: {
            label: 'Choose Type',
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
      .getData(`gratuity/getDetails/${this.editId}`)
      .toPromise();
    this.model = {
      name: this.storeData.data.name,
      storeID: this.storeData.data.storeID,
      percentage: this.storeData.data.percentage,
      fixed: this.storeData.data.fixed,
      description: this.storeData.data.description,
      selectedTypes: this.storeData.data.selectedTypes,
    };
  }

  async onSubmit() {
    if (this.form.valid) {
      const httpPayload = {
        name: this.model.name,
        storeID: this.model.storeID,
        percentage:
          this.model.selectedTypes == 'percentage' ? this.model.percentage : 0,
        fixed: this.model.selectedTypes == 'fixed' ? this.model.fixed : 0,
        description: this.model.description,
        selectedTypes: this.model.selectedTypes,
      };
      if (this.editId) {
        await this.commonService
          .postData(`gratuity/update/${this.editId}`, httpPayload)
          .toPromise()
          .then((res) => {
            this.form.reset();
            this.router.navigate(['/packages/gratuity-list']);
          });
      } else {
        try {
          await this.commonService
            .postData('gratuity/create', httpPayload)
            .toPromise()
            .then((res) => {
              this.form.reset();
              this.router.navigate(['/packages/gratuity-list']);
            });
        } catch (err: any) {
          console.log('err ', err);
        }
      }
    }
  }
}
