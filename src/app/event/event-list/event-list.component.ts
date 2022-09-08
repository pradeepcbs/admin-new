import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  customerData: any;
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.commonService
      .postData('eventBook/list', {
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

  async deleteEvent(adminId: string, index: number) {
    if (confirm('Are you sure to delete ?')) {
      try {
        await this.commonService
          .deleteData(`eventBook/delete/${adminId}`, '')
          .toPromise();
        this.customerData.splice(index, 1);
        this.toastr.success('Party deleted successfully', 'Success');
      } catch (err: any) {
        this.toastr.error(err, 'Error!');
      }
    }
  }
}
