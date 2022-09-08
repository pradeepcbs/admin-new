import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categoryData: any;
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.commonService
      .postData('category/list', {
        page: 1,
        itemPerPage: 10,
      })
      .subscribe(
        (res: any) => {
          this.categoryData = res.data;
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
          .deleteData(`category/delete/${adminId}`, '')
          .toPromise();
        this.categoryData.splice(index, 1);
        this.toastr.success('Admin deleted successfully', 'Success');
      } catch (err: any) {
        this.toastr.error(err, 'Error!');
      }
    }
  }
}
