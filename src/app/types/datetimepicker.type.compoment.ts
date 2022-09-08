import { Component } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-datetimepicker',
  template: `
    <div class="form-group">
      <div class="input-group">
        <input
          class="form-control"
          placeholder="yyyy-mm-dd"
          name="dp"
          [(ngModel)]="model1"
          ngbDatepicker
          #d="ngbDatepicker"
        />
        <button
          class="btn btn-outline-secondary calendar"
          (click)="d.toggle()"
          type="button"
        ></button>
      </div>
      {{ model1 | json }}
    </div>
  `,
  styles: [
    `
      button.calendar,
      button.calendar:active {
        width: 2.75rem;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAcCAYAAAAEN20fAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEUSURBVEiJ7ZQxToVAEIY/YCHGxN6XGOIpnpaEsBSeQC9ArZbm9TZ6ADyBNzAhQGGl8Riv4BLAWAgmkpBYkH1b8FWT2WK/zJ8ZJ4qiI6XUI3ANnGKWBnht2/ZBDRK3hgVGNsCd7/ui+JkEIrKtqurLpEWaphd933+IyI3LEIdpCYCiKD6HcuOa/nwOa0ScJEnk0BJg0UTUWJRl6RxCYEzEmomsIlPU3IPW+grIAbquy+q6fluy/28RIBeRMwDXdXMgXLj/B2uimRXpui4D9sBeRLKl+1N+L+t6RwbWrZliTTTr1oxYtzVWiTQAcRxvTX+eJMnlUDaO1vpZRO5NS0x48sIwfPc87xg4B04MCzQi8hIEwe4bl1DnFMCN2zsAAAAASUVORK5CYII=) !important;
        background-repeat: no-repeat;
        background-size: 23px;
        background-position: center;
      }
    `,
  ],
})
export class DatetimepickerFieldType extends FieldType {
  model1: NgbDateStruct;
  get labelProp(): string {
    return this.to.label || 'label';
  }
  get valueProp(): string {
    return this.to.valueProp || 'value';
  }
  set valueProp(val) {
    this.to.valueProp = val;
  }

  constructor() {
    super();
    console.log(this, 'this. to');
  }
}
