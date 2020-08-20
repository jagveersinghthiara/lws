import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {TabsModule} from 'ngx-tabset';

import { CarrierRoutingModule } from './carrier-routing.module';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    NgxSpinnerModule,
    CommonModule,
    CarrierRoutingModule,
    ReactiveFormsModule,
    TabsModule.forRoot()

  ],
  declarations: [
    AddComponent,
    ViewComponent,
    EditComponent
  ]
})
export class CarrierModule { }
