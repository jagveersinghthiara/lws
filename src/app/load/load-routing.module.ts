import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from '../commonLayout/main-layout/main-layout.component';
import {AddComponent} from './add/add.component';
import {ViewComponent} from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { AssignComponent } from './assign/assign.component';
import {EditDetailComponent} from './editDetail/editDetail.component';
import {TrackComponent} from './track/track.component';

const routes: Routes = [
  {
    path: 'load',
    component: MainLayoutComponent,
    children: [
      { path: 'add', component: AddComponent },
      { path: 'view', component: ViewComponent},
      { path: 'basicEdit/:id', component: EditComponent },
      { path: 'assign/:id', component: AssignComponent },
      { path: 'edit/:id', component: EditDetailComponent },
      { path: 'track/:id', component: TrackComponent }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadRoutingModule { }
