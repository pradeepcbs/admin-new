import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent implements OnInit {
  adminData: any;
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.commonService
      .postData('admins/list', {
        page: 1,
        itemPerPage: 10,
      })
      .subscribe(
        (res: any) => {
          this.adminData = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  async deleteAdmin(adminId: string, index: number) {
    if (confirm('Are you sure to delete ?')) {
      try {
        await this.commonService
          .deleteData(`admins/delete/${adminId}`, '')
          .toPromise();
        this.adminData.splice(index, 1);
        this.toastr.success('Admin deleted successfully', 'Success');
      } catch (err: any) {
        this.toastr.error(err, 'Error!');
      }
    }
  }
}
