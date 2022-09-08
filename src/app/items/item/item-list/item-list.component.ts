import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  items: any;
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.commonService
      .postData('items/list', {
        page: 1,
        itemPerPage: 10,
      })
      .subscribe(
        (res: any) => {
          this.items = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  async deleteItem(itemId: string, index: number) {
    try {
      await this.commonService
        .deleteData(`category/delete/${itemId}`, '')
        .toPromise();
      this.items.splice(index, 1);
      this.toastr.success('Item deleted successfully', 'Success');
    } catch (err: any) {
      this.toastr.error(err, 'Error!');
    }
  }
}
