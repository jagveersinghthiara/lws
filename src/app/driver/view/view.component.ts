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
        this.route.queryParams.subscribe(response => this.loadPage(response.page || 1)); 
       }
      ngOnInit() {}

     
     loadPage(page) {
      this.http.get(this.baseUrl + `driver?page=${page}`).subscribe((response: any) => {
          this.pager = response.body.pager;
          this.driverList = response.body.driverList;
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