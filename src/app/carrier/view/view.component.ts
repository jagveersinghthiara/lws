import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  }
  ngOnInit() {
    this.carrierForm = this.formBuilder.group({
    });
    this.loadPage() 
  }

  dispatcher(event: number) {
    const role = event + 1;
    ///// as event starts from 0
    this.page = 0;
    this.type = role;
    // this.route.queryParams.subscribe(response => this.loadPage(this.page || 1, this.type || 1));
  }
  updateStatus(id, status) {

  }
  loadPage() {
    this.spinner.show();
    
    this.http.get(this.baseUrl + `admin/admin_buyers`).subscribe((response: any) => {
      this.spinner.hide();
      this.carrierData = response.data;
    });


  }

  /*
  Customer Delete Function
  */
  deleteCustomer(id) {
    this.spinner.show();
    if (confirm('Are you sure to delete buyer')) {
      let body = new URLSearchParams();
      body.set('shopId', id);
     
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
      this.http.post(this.baseUrl + '/shop/delete_shop/',body.toString(),options ).subscribe(
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