import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import {
  distinctUntilChanged,
  startWith,
  map,
  switchMap,
} from 'rxjs/operators';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit {
  form = new UntypedFormGroup({});
  editId: any;
  model = {
    name: '',
    sku: '',
    storeID: '',
    barcode: '',
    media: '',
    type: '',
    description: '',
    category: '',
    subcategory: '',
    stock: '',
    inStock: '',
    costPrice: '',
    sellPrice: '',
  };
  subCategoryValues: any;
  itemsData: any;

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
          key: 'category',
          type: 'select',
          templateOptions: {
            label: 'Category',
            options: this.commonService.getCategory(),
            required: true,
            valueProp: 'value',
            labelProp: 'label',
          },
        },
        {
          key: 'subcategory',
          type: 'select',
          templateOptions: {
            label: 'Sub-category',
            options: [],
            required: true,
            valueProp: 'value',
            labelProp: 'label',
          },
          hooks: {
            // onInit: (field: FormlyFieldConfig) => {
            onInit: (field: any) => {
              field.templateOptions.options = field.form
                .get('category')
                .valueChanges.pipe(
                  switchMap((category) =>
                    this.commonService.getSubCategory(category)
                  )
                );
            },
          },
        },
        {
          key: 'name',
          type: 'input',
          templateOptions: {
            label: 'Item Name',
            placeholder: 'Enter Item Name',
            required: true,
          },
        },
        {
          key: 'sku',
          type: 'input',
          templateOptions: {
            label: 'SKU',
            placeholder: 'Enter sku',
            required: true,
          },
        },
        {
          key: 'barcode',
          type: 'input',
          templateOptions: {
            label: 'Barcode',
            placeholder: 'Enter barcode',
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
          key: 'type',
          type: 'select',
          templateOptions: {
            label: 'Type ',
            options: [
              {
                value: 'veg',
                label: 'Veg',
              },
              {
                value: 'non-veg',
                label: 'Non-veg',
              },
              {
                value: 'jain',
                label: 'Jain',
              },
            ],
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
        {
          key: 'stock',
          type: 'input',
          templateOptions: {
            type: 'number',
            label: 'Stock',
            placeholder: 'Enter stock amount',
            required: true,
          },
        },
        {
          key: 'inStock',
          type: 'select',
          templateOptions: {
            label: 'InStock',
            options: [
              {
                value: true,
                label: 'Yes',
              },
              {
                value: false,
                label: 'No',
              },
            ],
            required: true,
          },
        },
        {
          key: 'costPrice',
          type: 'input',
          templateOptions: {
            label: 'Cost Price',
            type: 'number',
            placeholder: 'Enter Cost Price',
            required: true,
          },
        },
        {
          key: 'sellPrice',
          type: 'input',
          templateOptions: {
            label: 'Sell Price',
            type: 'number',
            placeholder: 'Enter Sell Price',
            required: true,
          },
        },
      ],
    },
  ];

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

  async onSubmit() {
    if (this.form.valid) {
      const httpPayload = {
        name: this.model.name,
        sku: this.model.sku,
        storeID: this.model.storeID,
        barcode: this.model.barcode,
        media: this.model.media,
        type: this.model.type,
        description: this.model.description,
        category: this.model.category,
        subcategory: this.model.subcategory,
        inventory: {
          stock: this.model.stock,
        },
        inStock: this.model.inStock,
        costPrice: this.model.costPrice,
        sellPrice: this.model.sellPrice,
      };
      if (this.editId) {
        this.updateItem(httpPayload);
      } else {
        this.createItem(httpPayload);
      }
    }
  }

  async createItem(httpPayload: any) {
    try {
      const result = await this.commonService
        .postData('items/create', httpPayload)
        .toPromise()
        .then((res: any) => {
          this.toastr.success(res.message);
          this.router.navigate(['/items/item-list']);
        });
    } catch (err: any) {
      console.log('err ', err);
    }
  }
  async updateItem(httpPayload: any) {
    try {
      const result = await this.commonService
        .postData(`items/update/${this.editId}`, httpPayload)
        .toPromise()
        .then((res: any) => {
          this.toastr.success(res.message);
          this.router.navigate(['/items/item-list']);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err: any) {
      console.log('err ', err);
    }
  }

  async getSubCategoryDetails(id: any) {
    const response = await this.commonService
      .getSubCategory(id)
      .toPromise()
      .then((res) => {
        return res;
      });

    return response;
  }

  async getDetailsById() {
    this.itemsData = await this.commonService
      .getData(`items/getDetails/${this.editId}`)
      .toPromise();
    this.model = {
      name: this.itemsData.data.name,
      sku: this.itemsData.data.sku,
      storeID: this.itemsData.data.storeID,
      barcode: this.itemsData.data.barcode,
      media: this.itemsData.data.media,
      type: this.itemsData.data.type,
      description: this.itemsData.data.description,
      category: this.itemsData.data.category._id,
      subcategory: this.itemsData.data.subcategory._id,
      stock: this.itemsData.data.inventory.stock,
      inStock: this.itemsData.data.inStock,
      costPrice: this.itemsData.data.costPrice,
      sellPrice: this.itemsData.data.sellPrice,
    };
    console.log(this.itemsData, 'check details');
  }
}
