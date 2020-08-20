import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoadRoutingModule } from './load-routing.module';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { EditDetailComponent } from './editDetail/editDetail.component';
import {TrackComponent} from './track/track.component';

import { AssignComponent } from './assign/assign.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  imports: [
    NgxSpinnerModule,
    CommonModule,
    LoadRoutingModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  declarations: [
    AddComponent,
    ViewComponent,
    EditComponent,
    AssignComponent,
    EditDetailComponent,
    TrackComponent
  ]
})
export class LoadModule { }
