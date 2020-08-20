import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent implements OnInit {
  baseUrl = environment.baseUrl;
  employeesData = [];
  tabBar = [
    { title: 'HR' },
    { title: 'Sales Manager' },
    { title: 'Sales Agent' },
    { title: 'Dispatcher Manager' },
    { title: 'Dispatcher Agent' },
    { title: 'Accounting Manager' },
    { title: 'Accounting Agent' },
    { title: 'Sales Team Leader' },
    { title: 'Dispatch Team Leader' },
    { title: 'Account Team Leader' }
  ];
  pager: any = {};

  page: any;
  type: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.route.queryParams.subscribe(response => this.loadPage(response.page || 1, 2));
  }
  ngOnInit() {
  }

  employee(event: number) {
    const role = event + 2;        ///// as event starts from 0 and employee role start from 2
    this.loadPage(this.page, role);

  }

  loadPage(page, type) {

    this.spinner.show();
    this.page = page;
    this.type = type;
    if (this.page > this.pager.totalPages) {
      this.page = this.page - 1;
    }
    this.http.get(this.baseUrl + `employee/` + this.type + `?page=${this.page}`).subscribe((response: any) => {
   
      this.pager = response.body.pager;
      this.employeesData = response.body.employeesData;
      this.spinner.hide();
    });


  }

  /*
  Employee Delete Function
  */
  deleteEmployee(id: number) {
    this.spinner.show();

    if (confirm('Are you sure to delete user')) {
      this.http.delete(this.baseUrl + 'user/' + id).subscribe(
        (response: any) => {
          this.toastr.success(response.message);
          for (let i = 0; i < this.employeesData.length; ++i) {
            if (this.employeesData[i].id === id) {
              this.employeesData.splice(i, 1);
            }
          }
          this.spinner.hide();

        },
        (error) => {
          this.spinner.hide();

        });
    }
  }


}