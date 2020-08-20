import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { generate } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent implements OnInit {
  baseUrl = environment.baseUrl;
  carrierForm: FormGroup;
  submitted = false;
  carrierData = [];
  tabBar = [
    { title: 'Leads' },
    { title: 'Prospects' },
    { title: 'Customers' }
  ];
  type = 1;
  pager: any = {};

  page: any;
  i: string | number;
  selectedtab: string | number;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    const type = this.route.snapshot.paramMap.get('type');
    this.route.queryParams.subscribe(response => this.loadPage(response.page || 1, type || 1));

  }
  ngOnInit() {
    this.carrierForm = this.formBuilder.group({
    });

  }

  dispatcher(event: number) {
    const role = event + 1;
    ///// as event starts from 0
    this.page = 0;
    this.type = role;
    this.route.queryParams.subscribe(response => this.loadPage(this.page || 1, this.type || 1));
  }
  updateStatus(id, status) {

  }
  loadPage(page, type) {
    this.spinner.show();
    this.page = page;
    this.type = type;
    if (this.page > this.pager.totalPages) {
      this.page = this.page - 1;
    }
    this.http.get(this.baseUrl + `carrier/` + this.type + `?page=${this.page}`).subscribe((response: any) => {
      this.spinner.hide();
      this.pager = response.body.pager;
      this.carrierData = response.body.carrierData;
    });


  }

  /*
  Customer Delete Function
  */
  deleteCustomer(id: number) {
    this.spinner.show();
    if (confirm('Are you sure to delete Dispatcher')) {

      this.http.delete(this.baseUrl + 'carrier/' + id).subscribe(
        (response: any) => {
          this.toastr.success(response.message);
          this.spinner.hide();
          for (let i = 0; i < this.carrierData.length; ++i) {
            if (this.carrierData[i].id === id) {
              this.carrierData.splice(i, 1);
            }
          }
        },
        (error) => {
          this.toastr.error(error.error.message);
          this.spinner.hide();
        });
    }
  }

}