import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  pager = {};
  loadList = [];
  page = 0;
  Invoice: boolean;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.route.queryParams.subscribe(response => this.loadPage(response.page || 1));
  }
  ngOnInit() { }

       checkCompleted(data) {
  return data.status == 7;
};

loadPage(page) {
  this.spinner.show();
  this.http.get(this.baseUrl + `loadList?page=${page}`).subscribe((response: any) => {
    this.pager = response.body.pager;
    // this.loadList =
    // tslint:disable-next-line: radix
    this.page = response.body.pager.currentPage * 10 - 10;
    // tslint:disable-next-line: radix
    const role = parseInt(localStorage.getItem('user'));
    if (role == 7 || role == 8 || role == 11) {
      this.Invoice = true;

      this.loadList = response.body.loadList.filter(this.checkCompleted);
    } else {
      this.loadList = response.body.loadList;
    }
    this.spinner.hide();
  });
}

/*
Load Delete Function
*/
deleteLoad(id: number) {
  if (confirm('Are you sure to delete Load')) {
    this.http.delete(this.baseUrl + 'load/' + id).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        for (let i = 0; i < this.loadList.length; ++i) {
          if (this.loadList[i].id === id) {
            this.loadList.splice(i, 1);
          }
        }
      },
      (error) => {
      });
  }
}

  }