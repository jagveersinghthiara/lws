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
    equipmentsData = [];
    imagesUrl = environment.imagesUrl;
  page: any;
  type: any;
  pager: any = {};
  carrierData: any;
    constructor(
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
        private route: ActivatedRoute,

      ) {
        this.route.queryParams.subscribe(response => this.loadPage(response.page || 1));

      }
      ngOnInit() {
      }


      loadPage(page) {
        this.spinner.show();
        this.page = page;
        // this.type = type;
        if (this.page > this.pager.totalPages) {
          this.page = this.page - 1;
        }
        this.http.get(this.baseUrl + `equipment?page=${this.page}`).subscribe((response: any) => {
          this.spinner.hide();
          this.pager = response.body.pager;
          this.equipmentsData = response.body.equipmentList;
        });


      }


/*
Customer Delete Function
*/
      deleteCustomer(id: number) {
        if (confirm('Are you sure to delete equipment')) {
          this.spinner.show();
          this.http.delete(this.baseUrl + 'equipment/' + id).subscribe(
            (response: any) => {
              this.toastr.success(response.message);
              for (let i = 0; i < this.equipmentsData.length; ++i) {
                if (this.equipmentsData[i].id === id) {
                    this.equipmentsData.splice(i, 1);
                }
            }
              this.spinner.hide();
            },
            (error) => {
            });
        }
      }

  }
