import { AdminModule } from './admin/admin.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-pages',
    loadChildren: () =>
      import('./user-pages/user-pages.module').then((m) => m.UserPagesModule),
  },
  {
    path: 'admin-user-page',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'customer',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
  },
  {
    path: 'employee',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
  },
  {
    path: 'items',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./items/items.module').then((m) => m.ItemsModule),
  },
  {
    path: 'offers',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./offers/offers.module').then((m) => m.OffersModule),
  },
  {
    path: 'packages',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./packages/packages.module').then((m) => m.PackagesModule),
  },
  {
    path: 'event',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./event/event.module').then((m) => m.EventModule),
  },
  {
    path: 'stores',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./store/store.module').then((m) => m.StoreModule),
  },
  {
    path: 'error-pages',
    loadChildren: () =>
      import('./error-pages/error-pages.module').then(
        (m) => m.ErrorPagesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
