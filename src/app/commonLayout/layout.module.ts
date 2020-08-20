import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
//import { FooterOnlyLayoutComponent } from './footer-only-layout/footer-only-layout.component';
//import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
//import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { SidebarModule } from 'ng-sidebar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild([]),
    SidebarModule.forRoot()

  ],
  exports: [
    MainLayoutComponent,
  //  FooterOnlyLayoutComponent
  ],
  declarations: [
    MainLayoutComponent,
  //  FooterOnlyLayoutComponent,
  //  FooterComponent,
    HeaderComponent,
    AdminSidebarComponent
  ]
})
export class LayoutModule { }
