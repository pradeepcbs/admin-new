import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  take,
} from 'rxjs/operators';
import {
  StoreDto,
  StoreListResponseDto,
} from '../../../interfaces/items.interface';
import { SubCategoryDto } from '../../../interfaces/sub-category.interface';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-subcategory-form',
  templateUrl: './subcategory-form.component.html',
  styleUrls: ['./subcategory-form.component.scss'],
})
export class SubcategoryFormComponent implements OnInit {
  isEdit: string = '';
  stores: any;
  form = new FormGroup({});
  model = {
    name: '',
    media: '',
    description: '',
    storeID: '',
    category: '',
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
          },
        },
        {
          key: 'category',
          type: 'select',
          templateOptions: {
            label: 'Category',
            // options: [],
            options: this.getCategory(),
          },
          // hooks: {
          //   onInit: (field) => {
          //     // const teams = this.getCategory().toPromise();
          //     const sportControl = field.form.get('storeID');
          //     sportControl.valueChanges.subscribe((res) => {
          //       console.log(res, 'check res');
          //       this.commonService.getCategoryDetailsById(res);
          //       // field.templateOptions.options =
          //     });
          //   },
          // },
        },
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Name',
            placeholder: 'Enter Name',
            required: true,
          },
        },
        {
          key: 'media',
          type: 'input',
          templateOptions: {
            label: 'Media',
            placeholder: 'Enter Media Url',
            required: true,
          },
        },
        {
          key: 'description',
          type: 'input',
          templateOptions: {
            label: 'Description',
            placeholder: 'Enter Description',
            required: true,
          },
        },
      ],
    },
  ];

  constructor(
    private commonService: CommonService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap
      .pipe(
        take(1),
        filter((paramMap) => !!paramMap.get('id'))
      )
      .subscribe((paramMap) =>
        this.getSubCategoryDetails(paramMap.get('id') || '')
      );
  }

  ngOnInit(): void {}

  async getSubCategoryDetails(itemId: string) {
    this.isEdit = itemId;
    try {
      const itemResult = (await this.commonService
        .getData(`subcategory/getDetails/${itemId}`)
        .toPromise()) as any;
      const item = itemResult.data as SubCategoryDto;
      this.model = {
        name: item.name,
        media: item.media,
        description: item.description,
        storeID: item.storeID,
        category: item.category ? item.category._id : '',
      };
    } catch (err: any) {
      this.toastr.error(err, 'Error!');
    }
  }

  getCategory(): Observable<any[]> {
    return this.commonService
      .postData('category/list', {
        page: 1,
        itemPerPage: 10,
      })
      .pipe(
        take(1),
        map((res: StoreListResponseDto) => {
          this.stores = res.data;
          return this.stores.map((o: any) => ({
            value: o._id,
            label: o.name,
          }));
        })
      );
  }

  async onSubmit() {
    if (this.form.valid) {
      const httpPayload = {
        name: this.model.name,
        media: this.model.media,
        description: this.model.description,
        storeID: this.model.storeID,
        category: this.model.category,
      };
      if (this.isEdit) {
        this.updateItem(httpPayload);
      } else {
        this.addNew(httpPayload);
      }
    }
  }

  private async addNew(httpPayload: any) {
    try {
      const result = await this.commonService
        .postData('subcategory/create', httpPayload)
        .toPromise();
      this.toastr.success('Sub Category created successfully', 'Success');
      this.router.navigate(['/items/sub-category-list']);
    } catch (err: any) {
      this.toastr.error(err, 'Error!');
    }
  }

  private async updateItem(httpPayload: any) {
    try {
      const result = await this.commonService
        .postData(`subcategory/update/${this.isEdit}`, httpPayload)
        .toPromise();
      this.toastr.success('Sub Category updated successfully', 'Success');
      this.router.navigate(['/items/sub-category-list']);
    } catch (err: any) {
      this.toastr.error(err, 'Error!');
    }
  }
}
