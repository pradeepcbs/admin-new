import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreUserListComponent } from './store-user-list.component';

describe('StoreUserListComponent', () => {
  let component: StoreUserListComponent;
  let fixture: ComponentFixture<StoreUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
