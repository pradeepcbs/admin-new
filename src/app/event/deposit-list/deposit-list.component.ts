import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-deposit-list',
  templateUrl: './deposit-list.component.html',
  styleUrls: ['./deposit-list.component.scss'],
})
export class DepositListComponent implements OnInit {
  deposit: any;
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.commonService
      .postData('admins/listConfig', {
        page: 1,
        itemPerPage: 10,
      })
      .subscribe(
        (res: any) => {
          this.deposit = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  async delete(depositId: string, index: number) {
    try {
      await this.commonService
        .deleteData(`admins/deleteConfige/${depositId}`, '')
        .toPromise();
      this.deposit.splice(index, 1);
      this.toastr.success('Minimum Deposit deleted successfully', 'Success');
    } catch (err: any) {
      this.toastr.error(err, 'Error!');
    }
  }
}
