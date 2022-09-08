import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-store-user-list',
  templateUrl: './store-user-list.component.html',
  styleUrls: ['./store-user-list.component.scss'],
})
export class StoreUserListComponent implements OnInit {
  storeUser: any;
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.commonService
      .postData('stores/users/list', {
        page: 1,
        itemPerPage: 10,
      })
      .subscribe(
        (res: any) => {
          this.storeUser = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  async deleteAdmin(adminId: string, index: number) {
    try {
      await this.commonService
        .deleteData(`stores/users/delete/${adminId}`, '')
        .toPromise();
      this.storeUser.splice(index, 1);
      this.toastr.success('User deleted successfully', 'Success');
    } catch (err: any) {
      this.toastr.error(err, 'Error!');
    }
  }
}
