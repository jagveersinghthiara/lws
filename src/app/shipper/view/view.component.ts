import { Component, OnInit } from '@angular/core';
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
    shippersData = [];
    pager = {};
    constructor(
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private spinner: NgxSpinnerService

      ) {
        this.route.queryParams.subscribe(response => this.loadPage(response.page || 1));

      }
      ngOnInit() {
      }

      loadPage(page) {
        this.spinner.show();
        this.http.get(this.baseUrl + `shipper?page=${page}`).subscribe(
          (response: any) => {
            this.pager = response.body.pager;
            this.shippersData = response.body.shipperList;
            this.spinner.hide();

          },
          (error) => {
            this.toastr.success(error.error.message);
            this.spinner.hide();
          });

    }
/*
Customer Delete Function
*/
      deleteCustomer(id: number) {
        if (confirm('Are you sure to delete shipper')) {
          this.spinner.show();
          this.http.delete(this.baseUrl + 'shipper/' + id).subscribe(
            (response: any) => {
              this.spinner.hide();
              this.toastr.success(response.message);
              for (let i = 0; i < this.shippersData.length; ++i) {
                if (this.shippersData[i].id === id) {
                    this.shippersData.splice(i, 1);
                }
            }
            },
            (error) => {
              this.toastr.success(error.error.message);
              this.spinner.hide();
            });
        }
      }

  }
