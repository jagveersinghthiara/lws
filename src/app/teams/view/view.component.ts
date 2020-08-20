import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    employeesData = [];
  admin: boolean;
  pager: any = {};

  page: any;
  type: any;
    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService,
        private route: ActivatedRoute,
      ) {
        // this.http.get(this.baseUrl + 'team').subscribe(
        //   (response: any) => {
        //     this.employeesData = response.body;
        //   },
        //   (error) => {
        //   });
        this.route.queryParams.subscribe(response => this.loadPage(response.page || 1))
      }
      ngOnInit() {
        const isAdmin = localStorage.getItem('user');

        if (isAdmin == '1') {
    
          this.admin = true;
        } else {
          this.admin = false;
        }
      }

      loadPage(page) {

        this.spinner.show();
        this.page = page;
        // this.type = type;
        if (this.page > this.pager.totalPages) {
          this.page = this.page - 1;
        }
        this.http.get(this.baseUrl + `team?page=${this.page}`).subscribe((response: any) => {
       
          this.pager = response.body.pager;
          this.employeesData = response.body.TeamsList;
          this.spinner.hide();
        });
    
    
      }

/*
Team Delete Function
*/
deleteTeam(id: number) {
  if (confirm('Are you sure to delete team')) {
    this.http.delete(this.baseUrl + 'team/' + id).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        for (let i = 0; i < this.employeesData.length; ++i) {
          if (this.employeesData[i].id === id) {
              this.employeesData.splice(i, 1);
          }
      }
      },
      (error) => {
      });
  }
}




  }
