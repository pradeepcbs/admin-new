import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-addon-list',
  templateUrl: './addon-list.component.html',
  styleUrls: ['./addon-list.component.scss'],
})
export class AddonListComponent implements OnInit {
  addOnData: any;
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.commonService
      .postData('addons/list', {
        page: 1,
        itemPerPage: 10,
      })
      .subscribe(
        (res: any) => {
          this.addOnData = res.data;
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
          .deleteData(`addons/delete/${adminId}`, '')
          .toPromise()
          .then((res) => {
            this.addOnData.splice(index, 1);
            this.toastr.success(res.message);
          });
      } catch (err: any) {
        this.toastr.error(err, 'Error!');
      }
    }
  }
}
