import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss'],
})
export class StoreListComponent implements OnInit {
  stores: any;
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.commonService
      .postData('stores/list', {
        page: 1,
        itemPerPage: 10,
      })
      .subscribe(
        (res: any) => {
          this.stores = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  async delete(adminId: string, index: number) {
    try {
      await this.commonService
        .deleteData(`stores/delete/${adminId}`, '')
        .toPromise();
      this.stores.splice(index, 1);
      this.toastr.success('Store deleted successfully', 'Success');
    } catch (err: any) {
      this.toastr.error(err, 'Error!');
    }
  }
}
