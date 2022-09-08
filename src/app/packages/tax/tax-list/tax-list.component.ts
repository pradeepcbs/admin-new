import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-tax-list',
  templateUrl: './tax-list.component.html',
  styleUrls: ['./tax-list.component.scss'],
})
export class TaxListComponent implements OnInit {
  tax: any;
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.commonService
      .postData('tax/list', {
        page: 1,
        itemPerPage: 10,
      })
      .subscribe(
        (res: any) => {
          this.tax = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  async delete(adminId: string, index: number) {
    try {
      await this.commonService
        .deleteData(`tax/delete/${adminId}`, '')
        .toPromise();
      this.tax.splice(index, 1);
      this.toastr.success('Tax deleted successfully', 'Success');
    } catch (err: any) {
      this.toastr.error(err, 'Error!');
    }
  }
}
