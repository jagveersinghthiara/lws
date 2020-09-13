import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import { CommonService } from '../../services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './editDetail.component.html',
  styleUrls: ['./editDetail.component.css']
})
export class EditDetailComponent implements OnInit {
  loadForm: FormGroup;
  baseUrl = environment.baseUrl;
  id: any = 'N/A';
  submitted: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    public activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    public router : Router,
    private spinner: NgxSpinnerService

  ) {
    this.setData();
  }

  setData() {

 
  
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(this.baseUrl + 'route/getRoute?id=' + this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (response: any) => {

        this.f.loadTerm.setValue(response.data.route_name);
      });
  }

  ngOnInit() {
    // this.loadId= this.activatedRoute.snapshot.paramMap.get('id'),
    this.loadForm = this.formBuilder.group({
      loadTerm: ['', [Validators.required]],
     
    });

  }
  get f() { return this.loadForm.controls; }
 


  updateLoad() {
    this.spinner.show();
    this.submitted = true;
    if (this.loadForm.invalid) {
      this.toastr.error('Invalid data entred !');
      console.log('!invalid');
      this.spinner.hide();
      return;
    }
    // loadTerm route_name
    let body = new URLSearchParams();
    body.set('route_name', this.f.loadTerm.value);
    body.set('routeId', this.activatedRoute.snapshot.paramMap.get('id'));


    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    this.http.post(this.baseUrl + 'route/update_route', body.toString(), options).subscribe(
      (response: any) => {
        this.spinner.hide();
        this.toastr.success(response.message);
        this.router.navigate(['/route/view']);
      },
      (error) => {
        this.spinner.hide();
        this.toastr.success(error.message);
      });
  }


}
