import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BrokerRoutingModule } from './broker-routing.module';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    NgxSpinnerModule,
    CommonModule,
    BrokerRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AddComponent,
    ViewComponent,
    EditComponent
  ]
})
export class BrokerModule { }
