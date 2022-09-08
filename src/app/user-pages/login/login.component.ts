import { CommonService } from './../../services/common.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  errorMessaage: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private commonService: CommonService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  submitForm() {
    this.spinner.show();
    this.submitted = true;
    if (this.loginForm.valid) {
      this.errorMessaage = '';
      this.commonService
        .postData('admins/login', {
          userID: this.loginForm.value.email,
          password: this.loginForm.value.password,
        })
        .subscribe(
          (res) => {
            this.spinner.hide();
            const token = res && res.data ? res.data.token.token : '';
            if (res) {
              sessionStorage.setItem('token', token);
              sessionStorage.setItem('email', res.data.emailID);
              this.router.navigate(['/dashboard']);
            }
          },
          (error) => {
            this.errorMessaage = 'Invalid Username & Password';
            this.spinner.hide();
          }
        );
    } else {
      this.spinner.hide();
    }
  }
}
