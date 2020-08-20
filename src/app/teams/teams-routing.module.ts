import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from '../commonLayout/main-layout/main-layout.component';
import {AddComponent} from './add/add.component';
import {ViewComponent} from './view/view.component';
import { EditComponent } from './edit/edit.component';
import {TeamViewComponent} from './teamView/teamView.component';
import {ViewDetailComponent} from './viewDetail/viewDetail.component';
import {ViewTeamDetailComponent} from './viewTeamDetail/viewTeamDetail.component';
const routes: Routes = [
  {
    path: 'teams',
    component: MainLayoutComponent,
    children: [
      { path: '', component: ViewComponent},
      { path: 'add', component: AddComponent },
      { path: 'view', component: ViewComponent},
      { path: 'edit/:id', component: EditComponent },
      { path: 'viewUserTeam', component: TeamViewComponent },
      { path: 'viewDetail/:id', component: ViewTeamDetailComponent },
      { path: 'viewTeamDetail/:id', component: ViewTeamDetailComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
