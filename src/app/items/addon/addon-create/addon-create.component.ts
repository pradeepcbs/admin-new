import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-addon-create',
  templateUrl: './addon-create.component.html',
  styleUrls: ['./addon-create.component.scss'],
})
export class AddonCreateComponent implements OnInit {
  form = new FormGroup({});
  editId: any;
  model = {
    name: '',
    sku: '',
    storeID: '',
    barcode: '',
    media: '',
    type: '',
    description: '',
    category: 'addon',
    stock: '',
    inStock: true,
    costPrice: '',
    sellPrice: '',
  };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroup: [
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
          key: 'sku',
          type: 'input',
          templateOptions: {
            label: 'SKU',
            placeholder: 'Enter sku',
            required: true,
          },
        },
        {
          key: 'storeID',
          type: 'select',
          templateOptions: {
            label: 'Store',
            options: this.commonService.getStores(),
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
          key: 'inStock',
          type: 'select',
          templateOptions: {
            label: 'InStock',
            options: [
              {
                value: 'true',
                label: 'Yes',
              },
              {
                value: 'false',
                label: 'No',
              },
            ],
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
        inventory: {
          stock: this.model.stock,
        },
        inStock: this.model.inStock,
        costPrice: this.model.costPrice,
        sellPrice: this.model.sellPrice,
      };
      if (this.editId) {
        this.updateAddon(httpPayload);
      } else {
        this.createAddon(httpPayload);
      }
    }
  }

  async createAddon(httpPayload: any) {
    try {
      const result = await this.commonService
        .postData('addons/create', httpPayload)
        .toPromise()
        .then((res: any) => {
          this.toastr.success(res.message);
          this.router.navigate(['/items/addon-list']);
        });
    } catch (err: any) {
      console.log('err ', err);
    }
  }
  async updateAddon(httpPayload: any) {
    try {
      const result = await this.commonService
        .postData(`addons/update/${this.editId}`, httpPayload)
        .toPromise()
        .then((res: any) => {
          this.toastr.success(res.message);
          this.router.navigate(['/items/addon-list']);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err: any) {
      console.log('err ', err);
    }
  }
}
