import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonCreateComponent } from './addon-create.component';

describe('AddonCreateComponent', () => {
  let component: AddonCreateComponent;
  let fixture: ComponentFixture<AddonCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddonCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddonCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
