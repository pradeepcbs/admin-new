import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-add-deposit',
  templateUrl: './add-deposit.component.html',
  styleUrls: ['./add-deposit.component.scss'],
})
export class AddDepositComponent implements OnInit {
  form = new FormGroup({});
  editId: any;
  storeData: any;
  model = {
    storeID: '',
    deposit_percentage: '',
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
          key: 'deposit_percentage',
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
      .getData(`admins/getConfig/${this.editId}`)
      .toPromise();
    this.model = {
      storeID: this.storeData.data.storeID,
      deposit_percentage: this.storeData.data.deposit_percentage,
    };
  }

  async onSubmit() {
    if (this.form.valid) {
      const httpPayload = {
        deposit_percentage: this.model.deposit_percentage,
      };
      if (this.editId) {
        await this.commonService
          .postData(`admins/updateConfig/${this.editId}`, httpPayload)
          .toPromise()
          .then((res) => {
            this.form.reset();
            this.router.navigate(['/event/min-deposit-list']);
          });
      } else {
        try {
          const storeID = this.model.storeID;
          await this.commonService
            .postData(`admins/updateConfig/${storeID}`, httpPayload)
            .toPromise()
            .then((res) => {
              this.form.reset();
              this.router.navigate(['/event/min-deposit-list']);
            });
        } catch (err: any) {
          console.log('err ', err);
        }
      }
    }
  }
}
