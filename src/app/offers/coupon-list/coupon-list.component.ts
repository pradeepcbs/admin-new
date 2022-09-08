import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss'],
})
export class CouponListComponent implements OnInit {
  coupon: any;
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.commonService
      .postData('coupon/list', {
        page: 1,
        itemPerPage: 10,
      })
      .subscribe(
        (res: any) => {
          this.coupon = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  async delete(adminId: string, index: number) {
    try {
      await this.commonService
        .postData(`coupon/delete/${adminId}`, '')
        .toPromise();
      this.coupon.splice(index, 1);
      this.toastr.success('coupon deleted successfully', 'Success');
    } catch (err: any) {
      this.toastr.error(err, 'Error!');
    }
  }
}
