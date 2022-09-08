import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonService } from './services/common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private commonService: CommonService) {}
  canActivate(): any {
    const token = this.commonService.checkLoginType();
    if (token) {
      return true;
    } else {
      this.router.navigate(['/user-pages/login']);
    }
  }
}
