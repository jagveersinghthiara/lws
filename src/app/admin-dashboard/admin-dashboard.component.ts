import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  baseUrl = environment.baseUrl;
  gloabal: any;
  constructor(
    private http: HttpClient,
  ) { 

    // this.http.get(this.baseUrl + 'driverGlobal').subscribe(
    //   (response: any) => {
    //     this.gloabal = response.body;
    //   });

  }

  ngOnInit() {
  }

}
