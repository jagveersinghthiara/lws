import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
this.driverList = [
      {
          "deliverymanId": 10,
          "deliveryman_name": "Jimmy S",
          "deliveryman_email": "jimmy@gmail.com",
          "deliveryman_mobile_number": "80000707080",
          "deliveryman_password": "123456",
          "delete_deliveryman_status": 0,
          "created_at": "2020-08-02T12:18:12.000Z"
      },
      {
          "deliverymanId": 11,
          "deliveryman_name": "rohit",
          "deliveryman_email": "rohit@gmail.com",
          "deliveryman_mobile_number": "2220004970",
          "deliveryman_password": "123456",
          "delete_deliveryman_status": 0,
          "created_at": "2020-08-02T12:18:36.000Z"
      },
      {
          "deliverymanId": 12,
          "deliveryman_name": "sam",
          "deliveryman_email": "sam@gmail.com",
          "deliveryman_mobile_number": "6087487000",
          "deliveryman_password": "123456",
          "delete_deliveryman_status": 0,
          "created_at": "2020-08-02T12:18:59.000Z"
      },
      {
          "deliverymanId": 13,
          "deliveryman_name": "tom",
          "deliveryman_email": "tom@gmail.com",
          "deliveryman_mobile_number": "8080890070",
          "deliveryman_password": "123456",
          "delete_deliveryman_status": 0,
          "created_at": "2020-08-02T12:19:27.000Z"
      },
      {
          "deliverymanId": 14,
          "deliveryman_name": "tbz",
          "deliveryman_email": "tbz@gmail.com",
          "deliveryman_mobile_number": "11100045704",
          "deliveryman_password": "123456",
          "delete_deliveryman_status": 0,
          "created_at": "2020-08-02T17:05:43.000Z"
      },
      {
          "deliverymanId": 15,
          "deliveryman_name": "Gangaram",
          "deliveryman_email": "ganga@gmail.com",
          "deliveryman_mobile_number": "1234569878",
          "deliveryman_password": "123456",
          "delete_deliveryman_status": 0,
          "created_at": "2020-08-07T08:47:37.000Z"
      },
      {
          "deliverymanId": 16,
          "deliveryman_name": "john mark",
          "deliveryman_email": "driver@gmail.com",
          "deliveryman_mobile_number": "9874563210",
          "deliveryman_password": "driver@123",
          "delete_deliveryman_status": 0,
          "created_at": "2020-08-21T14:57:33.000Z"
      }
  ]


      }

     
     loadPage() {
      this.http.get(this.baseUrl + `delivery/getDeliveryMans`).subscribe((response: any) => {
          // this.pager = response.body.pager;
          this.driverList = response.body.data;
      });
  }

/*
Driver Delete Function
*/
deleteDriver(id:number) {
        if(confirm("Are you sure to delete Driver")) {
          this.http.delete(this.baseUrl + 'driver/'+id).subscribe(
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