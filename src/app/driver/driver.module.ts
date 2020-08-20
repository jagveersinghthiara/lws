import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-tabset';

import { DriverRoutingModule } from './driver-routing.module';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { ViewDetailsComponent } from './viewDetails/viewDetails.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  imports: [
    NgxSpinnerModule,
    CommonModule,
    DriverRoutingModule,
    ReactiveFormsModule,
    TabsModule.forRoot()
  ],
  declarations: [
    AddComponent,
    ViewComponent,
    EditComponent,
    ViewDetailsComponent
  ]
})
export class DriverModule { }
