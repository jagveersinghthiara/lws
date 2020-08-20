import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {CommonService} from '../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit() {

    this.commonService.profile().subscribe(
      (response: any) => {
        this.user = response.body;
      },
      (error) => {
        this.router.navigate(['/']);
      });
  }


 logout() {
  this.authService.logout();
 }

}
