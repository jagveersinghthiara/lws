import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent implements OnInit {
  baseUrl = environment.baseUrl;
  customerData = [];

  pager: any;
  page: number;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,


  ) {
    this.route.queryParams.subscribe(response => this.loadPage(response.page || 1));
    // this.http.get(this.baseUrl + 'broker').subscribe(
    //   (response: any) => {
    //     this.customerData = response.body;
    //   },
    //   (error) => {
    //   });
  }
  ngOnInit() {
  }

  loadPage(page) {
    this.spinner.show();
    this.http.get(this.baseUrl + `broker?page=${page}`).subscribe((response: any) => {
      this.pager = response.body.pager;
      // tslint:disable-next-line: radix
      this.page = response.body.pager.currentPage * 10 - 10;
      // tslint:disable-next-line: radix
      const role = parseInt(localStorage.getItem('user'));
      this.customerData = response.body.List;
      this.spinner.hide();
    });
  }
  checkCompleted(checkCompleted: any): any[] {
    throw new Error('Method not implemented.');
  }

  /*
  Customer Delete Function
  */
  deleteCustomer(id: number) {
    if (confirm("Are you sure to delete Broker")) {
      this.http.delete(this.baseUrl + 'broker/' + id).subscribe(
        (response: any) => {
          this.toastr.success(response.message);
          for (let i = 0; i < this.customerData.length; ++i) {
            if (this.customerData[i].id === id) {
              this.customerData.splice(i, 1);
            }
          }
        },
        (error) => {
        });
    }
  }

}  