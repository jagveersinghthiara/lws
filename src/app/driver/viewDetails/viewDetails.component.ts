import { Component, OnInit } from '@angular/core';
import { FormGroup, } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-view-details',
  templateUrl: './viewDetails.component.html',
  styleUrls: ['./viewDetails.component.css']
})
export class ViewDetailsComponent implements OnInit {
  driverForm: FormGroup;
  baseUrl = environment.baseUrl;
  submitted = false;
  firmList: any;
  equipments: any;
  loadData: any;
  data: any;
  loadtype = 1;
  tabBar = [
    {
      title: 'Ongoing',
      search : 1
    },
    {
      title: 'Completed',
      search : 7
    },
    {
      title: 'Upcoming',
      search : 0
    },

  ];
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public activatedRoute: ActivatedRoute
  ) {

   this.search(this.loadtype);

  }

  ngOnInit() {

  }
  load(index) {
    const search = this.tabBar[index].search;
    this.search(search);




  }

search(type) {

  this.http.get(this.baseUrl + 'driverSchedule/' + type + '/' + this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
    (response: any) => {
      this.loadData = response.body;
    },
    (error) => {
    });

}
}

