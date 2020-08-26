import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css']
  })

export class ViewComponent implements OnInit {
    baseUrl = environment.baseUrl;
    pager = {};
    driverList = [];
    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
        private route: ActivatedRoute
      ) {
        this.route.queryParams.subscribe(response => this.loadPage()); 
       }
      ngOnInit() {
      }

     
     loadPage() {
      this.http.get(this.baseUrl + `delivery/getDeliveryMans`).subscribe((response: any) => {
          // this.pager = response.body.pager;
          this.driverList = response.data;
      });
  }

/*
Driver Delete Function
*/
deleteDriver(id) {
    let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    let body = new URLSearchParams();
body.set('deliverymanId', id);
        if(confirm("Are you sure to delete Delivery Man")) {
          this.http.post(this.baseUrl + 'delivery/delete_deliveryman',body.toString(),options).subscribe(
            (response: any) => {
              this.toastr.success(response.message);
              for(let i = 0; i < this.driverList.length; ++i){
                if (this.driverList[i].id === id) {
                    this.driverList.splice(i,1);
                }
            }
            },
            (error) => {
            });
        }
      }

  }  