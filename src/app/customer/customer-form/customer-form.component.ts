import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter, take } from 'rxjs/operators';
import { CustomerDetailsDto } from '../../interfaces/customer.interface';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  isEdit: string = '';
  form = new FormGroup({});
  model = {
    emailID: '',
    name: '',
    password: '',
    phone_no: '',
    userID: '',
  };
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      validators: {
        validation: [
          { name: 'fieldMatch', options: { errorPath: 'confirm_password' } },
          // { name: 'emailValidate' },
        ],
      },
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Full Name',
            placeholder: 'Enter Full Name',
            required: true,
          },
        },
        {
          key: 'password',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Password',
            placeholder: 'Please your password',
            required: true,
            minLength: 5,
          },
        },
        {
          key: 'confirm_password',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: 'Confirm Password',
            placeholder: 'Please re-enter your password',
            required: true,
          },
        },
        {
          key: 'emailID',
          type: 'input',
          templateOptions: {
            type: 'email',
            label: 'Email address',
            placeholder: 'Enter email',
            required: true,
          },
        },
        {
          key: 'phone_no',
          type: 'input',
          templateOptions: {
            label: 'Phone No.',
            placeholder: 'Enter Phone No',
            required: true,
          },
        },
        {
          key: 'userID',
          type: 'input',
          templateOptions: {
            label: 'Username.',
            placeholder: 'Enter Username',
            required: true,
          },
        },
      ],
    },
  ];

  constructor(
    private commonService: CommonService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap
      .pipe(
        take(1),
        filter((paramMap) => !!paramMap.get('id'))
      )
      .subscribe((paramMap) =>
        this.getCustomerDetails(paramMap.get('id') || '')
      );
  }

  ngOnInit(): void {}

  async getCustomerDetails(adminId: string) {
    this.isEdit = adminId;
    // this.fields[0].fieldGroup.splice(1, 2);
    try {
      const customer = (await this.commonService
        .getData(`customers/getDetails/${adminId}`)
        .toPromise()) as CustomerDetailsDto;
      this.model = {
        emailID: customer.data.emailID,
        name: customer.data.name,
        password: '',
        phone_no: customer.data.phone_no,
        userID: customer.data.userID,
      };
    } catch (err: any) {
      this.toastr.error(err, 'Error!');
    }
  }

  async onSubmit() {
    if (this.form.valid) {
      if (this.isEdit) {
        this.updateCustomer();
      } else {
        this.newCreate();
      }
    }
  }

  private async newCreate() {
    try {
      const result = await this.commonService
        .postData('customers/create', this.model)
        .toPromise()
        .then((res) => {
          this.toastr.success('Customer created successfully', 'Success');
          this.form.reset();
          this.router.navigate(['/customer/customer-list']);
        });
    } catch (err: any) {
      this.toastr.error(err, 'Error!');
    }
  }

  private async updateCustomer() {
    try {
      const result = await this.commonService
        .postData(`customers/update/${this.isEdit}`, this.model)
        .toPromise()
        .then((res) => {
          this.toastr.success('Customer updated successfully', 'Success');
          this.form.reset();
          this.router.navigate(['/customer/customer-list']);
        });
    } catch (err: any) {
      this.toastr.error(err, 'Error!');
    }
  }
}
