import { ToastrService } from 'ngx-toastr';
import { StoreUserDto } from './../../../interfaces/store-user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  UntypedFormGroup,
  UntypedFormControl,
} from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CommonService } from '../../../services/common.service';

export function PasswordValidator(
  control: UntypedFormControl
): ValidationErrors {
  return !control.value ||
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(
      control.value
    )
    ? { password: false }
    : { password: true };
}

@Component({
  selector: 'app-store-user-form',
  templateUrl: './store-user-form.component.html',
  styleUrls: ['./store-user-form.component.scss'],
})
export class StoreUserFormComponent implements OnInit {
  form = new UntypedFormGroup({});
  editId: any;
  storeUserData: any;
  model = {
    name: '',
    password: '',
    userID: '',
    storeID: '',
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
            label: 'Name',
            placeholder: 'Enter Name',
            required: true,
          },
        },
        {
          key: 'userID',
          type: 'input',
          templateOptions: {
            label: 'Username',
            placeholder: 'Enter username',
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
            minLength: 8,
          },
          validators: {
            validation: [PasswordValidator],
          },
        },
      ],
    },
  ];
  updatedPassword: any;

  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editId = this.route.snapshot.paramMap.get('id');
    if (this.editId) {
      this.getUserDetails();
    }
  }

  async getUserDetails() {
    this.storeUserData = (await this.commonService
      .getData(`stores/users/getDetails/${this.editId}`)
      .toPromise()) as StoreUserDto;
    this.updatedPassword = this.storeUserData.data.password;
    this.model = {
      name: this.storeUserData.data.name,
      userID: this.storeUserData.data.userID,
      storeID: this.storeUserData.data.storeID._id,
      password: '',
    };
  }
  onSubmit() {
    if (this.editId) {
      this.form.controls['password'].setValidators([]);
      this.form.controls['password'].updateValueAndValidity();
    }
    if (this.form.valid) {
      const httpPayload = {
        name: this.model.name,
        password: this.editId ? this.updatedPassword : this.model.password,
        userID: this.model.userID,
        storeID: this.model.storeID,
      };
      if (this.editId) {
        this.updateStoreUser(httpPayload);
      } else {
        this.createStoreUser(httpPayload);
      }
    }
  }

  async createStoreUser(httpPayload: any) {
    console.log(httpPayload, 'check value');

    try {
      const result = await this.commonService
        .postData('stores/users/create', httpPayload)
        .toPromise()
        .then((res) => {
          this.toastr.success('Store user created successfully');
          this.router.navigate(['/stores/store-users-list']);
        });
    } catch (err: any) {
      console.log('err ', err);
    }
  }
  async updateStoreUser(httpPayload: any) {
    try {
      const result = await this.commonService
        .postData(`stores/users/update/${this.editId}`, httpPayload)
        .toPromise()
        .then((res) => {
          this.toastr.success('Store user updated successfully');
          this.router.navigate(['/stores/store-users-list']);
        });
    } catch (err: any) {
      console.log('err ', err);
    }
  }
}
