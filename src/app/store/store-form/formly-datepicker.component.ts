import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-input',
  template: ` <div class="form-group">
    <label>Start Date</label>
    <input
      type="time"
      class="form-control"
      [formControl]="formControl"
      [formlyAttributes]="field"
    />
  </div>`,
})
export class FormlyDatepicker extends FieldType {
  time = { hour: 13, minute: 30 };
}
