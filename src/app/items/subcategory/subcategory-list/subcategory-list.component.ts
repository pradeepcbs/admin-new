import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrls: ['./subcategory-list.component.scss'],
})
export class SubcategoryListComponent implements OnInit {
  subCategories: any;
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.commonService
      .postData('subcategory/list', {
        page: 1,
        itemPerPage: 10,
      })
      .subscribe(
        (res: any) => {
          this.subCategories = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  async deleteSubCategory(subCategoryId: string, index: number) {
    try {
      await this.commonService
        .deleteData(`subcategory/delete/${subCategoryId}`, '')
        .toPromise();
      this.subCategories.splice(index, 1);
      this.toastr.success('Sub Category deleted successfully', 'Success');
    } catch (err: any) {
      this.toastr.error(err, 'Error!');
    }
  }
}
