import { FieldArrayType } from '@ngx-formly/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repeat-type',
  templateUrl: './repeat-type.component.html',
  styleUrls: ['./repeat-type.component.scss'],
})
export class RepeatTypeComponent extends FieldArrayType {}
