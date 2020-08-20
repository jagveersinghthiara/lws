import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { LoginModule } from './login/login.module';
import { ShipperModule } from './shipper/shipper.module';
import { EmployeeModule } from './employee/employee.module';
import { CarrierModule } from './carrier/carrier.module';
import { BrokerModule } from './broker/broker.module';
import { DriverModule } from './driver/driver.module';
import { TeamsModule } from './teams/teams.module';
import { EquipmentModule } from './equipment/equipment.module';

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { LoadModule } from './load/load.module';
import { LayoutModule } from './commonLayout/layout.module';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
 
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    JwPaginationComponent
  ],
  imports: [
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    RouterModule.forRoot(routes),
    AdminDashboardModule,
    HttpClientModule,
    LoginModule,
    TeamsModule,
    ShipperModule,
    EmployeeModule,
    CarrierModule,
    BrokerModule,
    DriverModule,
    LoadModule,
    EquipmentModule,
    LayoutModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
