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
  viewlog: boolean = false;
  vehicleId: any;
  vehicleName: any;
  vLogs: any = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService

  ) {
    this.loadPage();

  }
  ngOnInit() {
  }

  loadPage() {
    this.spinner.show();
    this.http.get(this.baseUrl + `vehicle/view_vehicles`).subscribe(
      (response: any) => {
        this.shippersData = response.data;
        this.spinner.hide();

      },
      (error) => {
        this.toastr.success(error.error.message);
        this.spinner.hide();
      });

  }
  viewLogs(id, name) {
    this.viewlog = true;
    this.vehicleId = id
    this.vehicleName = name
    this.spinner.show();
    this.http.get(this.baseUrl + 'vehicle/vehicle_logs?vehicleId=' + id).subscribe(
      (response: any) => {
        if(response.success==1){
          this.vLogs = response.data
        }else{
          this.vLogs =[]
        }
        this.spinner.hide();
        
      })

  }
  hide(){

    this.viewlog=false;
    this.vLogs=[]
  }
  /*
  Customer Delete Function
  */
  deleteCustomer(id: number) {
    if (confirm('Are you sure to delete Vehicle')) {
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
          this.toastr.error(error.error.message);
          this.spinner.hide();
        });
    }
  }

}
