import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss'],
})
export class OfferListComponent implements OnInit {
  offerData: any;
  constructor(
    public commonService: CommonService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.commonService
      .postData('offers/list', {
        page: 1,
        itemPerPage: 10,
      })
      .subscribe(
        (res: any) => {
          this.offerData = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  async deleteOffer(offerId: string, index: number) {
    try {
      await this.commonService
        .deleteData(`offer/delete/${offerId}`, '')
        .toPromise();
      this.offerData.splice(index, 1);
      this.toastr.success('Offer deleted successfully', 'Success');
    } catch (err: any) {
      this.toastr.error(err, 'Error!');
    }
  }
}
