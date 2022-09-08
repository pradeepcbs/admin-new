import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  customerData: any;
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.commonService
      .postData('customers/list', {
        page: 1,
        itemPerPage: 10,
      })
      .subscribe(
        (res: any) => {
          this.customerData = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  async deleteCustomer(adminId: string, index: number) {
    if (confirm('Are you sure to delete ?')) {
      try {
        await this.commonService
          .deleteData(`customers/delete/${adminId}`, '')
          .toPromise();
        this.customerData.splice(index, 1);
        this.toastr.success('Customer deleted successfully', 'Success');
      } catch (err: any) {
        this.toastr.error(err, 'Error!');
      }
    }
  }
}
