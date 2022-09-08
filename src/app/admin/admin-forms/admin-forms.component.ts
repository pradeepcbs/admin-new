import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { AdminDetailsDto } from '../../interfaces/admin-forms.interface';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-forms',
  templateUrl: './admin-forms.component.html',
  styleUrls: ['./admin-forms.component.scss'],
})
export class AdminFormsComponent implements OnInit {
  isEdit: any = null;
  form = new UntypedFormGroup({});
  model = {
    email: '',
    full_name: '',
    password: '',
    user_name: '',
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
          key: 'full_name',
          type: 'input',
          templateOptions: {
            label: 'Full Name',
            placeholder: 'Enter Full Name',
            required: true,
          },
        },
        {
          key: 'user_name',
          type: 'input',
          templateOptions: {
            label: 'Username',
            placeholder: 'Enter Username',
            required: true,
          },
        },
        {
          key: 'email',
          type: 'input',
          templateOptions: {
            type: 'email',
            label: 'Email address',
            placeholder: 'Enter email',
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
      ],
    },
  ];
  updatedPassword: any;
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
      .subscribe((paramMap: any) => this.getAdminDetails(paramMap.get('id')));
  }

  ngOnInit(): void {}

  async getAdminDetails(adminId: string) {
    this.isEdit = adminId;
    this.fields[0]?.fieldGroup?.splice(2, 1);
    try {
      const admin = (await this.commonService
        .getData(`admins/getDetails/${adminId}`)
        .toPromise()) as AdminDetailsDto;
      this.updatedPassword = admin.data.password;
      this.model = {
        email: admin.data.emailID,
        full_name: admin.data.name,
        password: '',
        user_name: admin.data.userID,
      };
    } catch (err: any) {
      this.toastr.error(err, 'Error!');
    }
  }

  async onSubmit() {
    if (this.isEdit) {
      this.form?.controls['password'].setValidators([]);
      this.form?.controls['password'].updateValueAndValidity();
    }
    if (this.form.valid) {
      if (this.isEdit) {
        this.updateAdmin();
      } else {
        this.newCreate();
      }
    }
  }

  private async newCreate() {
    const httpPayload = {
      name: this.model.full_name,
      password: this.model.password,
      userID: this.model.user_name,
      emailID: this.model.email,
    };
    try {
      const result = await this.commonService
        .postData('admins/create', httpPayload)
        .toPromise()
        .then((res) => {
          this.toastr.success('Admin created successfully', 'Success');
          this.form.reset();
          this.router.navigate(['/admin-user-page/admin-list']);
        });
    } catch (err: any) {
      this.toastr.error(err, 'Error!');
    }
  }

  private async updateAdmin() {
    console.log(this.updatedPassword, 'passssss');
    const httpPayload = {
      name: this.model.full_name,
      password: this.model.password
        ? this.model.password
        : this.updatedPassword,
      userID: this.model.user_name,
      emailID: this.model.email,
    };
    try {
      const result = await this.commonService
        .postData(`admins/update/${this.isEdit}`, httpPayload)
        .toPromise()
        .then((res) => {
          this.toastr.success('Admin updated successfully', 'Success');
          this.form.reset();
          this.router.navigate(['/admin-user-page/admin-list']);
        });
    } catch (err: any) {
      this.toastr.error(err, 'Error!');
    }
  }
}
