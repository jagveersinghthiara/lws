import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-tabset';
import { TeamsRoutingModule } from './teams-routing.module';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { TeamViewComponent } from './teamView/teamView.component';
import { ViewDetailComponent } from './viewDetail/viewDetail.component';
import {ViewTeamDetailComponent} from './viewTeamDetail/viewTeamDetail.component'
import { from } from 'rxjs';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    NgxSpinnerModule,
    CommonModule,
    TeamsRoutingModule,
    ReactiveFormsModule,
    TabsModule.forRoot()
  ],
  declarations: [
    AddComponent,
    ViewComponent,
    EditComponent,
    TeamViewComponent,
    ViewDetailComponent,
    ViewTeamDetailComponent
  ]
})
export class TeamsModule { }
