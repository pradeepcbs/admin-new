import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { take, map } from 'rxjs/operators';
import {
  StoreListResponseDto,
  StoreDto,
} from './../../../interfaces/items.interface';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  form = new FormGroup({});
  stores: any;
  editId: any;
  model = {
    name: '',
    media: '',
    description: '',
    storeID: '',
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroup: [
        {
          key: 'storeID',
          type: 'select',
          templateOptions: {
            label: 'Store',
            options: this.commonService.getStores(),
            required: true,
          },
        },
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Category Name',
            placeholder: 'Enter Category Name',
            required: true,
          },
        },
        {
          key: 'media',
          type: 'input',
          templateOptions: {
            label: 'Media',
            placeholder: 'Enter media',
            required: true,
          },
        },
        {
          key: 'description',
          type: 'input',
          templateOptions: {
            label: 'Description',
            placeholder: 'Enter description',
            required: true,
          },
        },
      ],
    },
  ];
  categoryData: any;

  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.editId = this.route.snapshot.paramMap.get('id');
    if (this.editId) {
      this.getDetailsById();
    }
  }

  async getDetailsById() {
    this.categoryData = await this.commonService
      .getData(`category/getDetails/${this.editId}`)
      .toPromise();
    this.model = {
      name: this.categoryData.data.name,
      media: this.categoryData.data.media,
      description: this.categoryData.data.description,
      storeID: this.categoryData.data.storeID,
    };
  }

  async onSubmit() {
    if (this.form.valid) {
      const httpPayload = {
        name: this.model.name,
        media: this.model.media,
        description: this.model.description,
        storeID: this.model.storeID,
      };
      if (this.editId) {
        this.updateCategory(httpPayload);
      } else {
        this.createCategory(httpPayload);
      }
    }
  }

  async createCategory(httpPayload: any) {
    try {
      const result = await this.commonService
        .postData('category/create', httpPayload)
        .toPromise()
        .then((res: any) => {
          this.toastr.success(res.message);
          this.router.navigate(['items/category-list']);
        });
    } catch (err: any) {
      console.log('err ', err);
    }
  }

  async updateCategory(httpPayload: any) {
    try {
      const result = await this.commonService
        .postData(`category/update/${this.editId}`, httpPayload)
        .toPromise()
        .then((res: any) => {
          this.toastr.success(res.message);
          this.router.navigate(['items/category-list']);
        });
    } catch (err: any) {
      console.log('err ', err);
    }
  }
}
