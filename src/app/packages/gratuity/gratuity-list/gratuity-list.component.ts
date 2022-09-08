import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-gratuity-list',
  templateUrl: './gratuity-list.component.html',
  styleUrls: ['./gratuity-list.component.scss'],
})
export class GratuityListComponent implements OnInit {
  gratuity: any;
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.commonService
      .postData('gratuity/list', {
        page: 1,
        itemPerPage: 10,
      })
      .subscribe(
        (res: any) => {
          this.gratuity = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  async delete(adminId: string, index: number) {
    try {
      await this.commonService
        .deleteData(`gratuity/delete/${adminId}`, '')
        .toPromise();
      this.gratuity.splice(index, 1);
      this.toastr.success('Gratuity deleted successfully', 'Success');
    } catch (err: any) {
      this.toastr.error(err, 'Error!');
    }
  }
}
