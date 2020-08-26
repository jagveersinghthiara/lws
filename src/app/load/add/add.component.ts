import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  loadForm: FormGroup;
  baseUrl = environment.baseUrl;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private commonService: CommonService,
    private router: Router,
    private spinner: NgxSpinnerService



  ) {
    
  }

 
  ngOnInit() {
    this.loadForm = this.formBuilder.group({
      loadTerm: ['', [Validators.required]],
  });
  }


get f() { return this.loadForm.controls; }



/*
Load Add Function
*/
addLoad() {

  this.submitted = true;
  if (this.loadForm.invalid) {
   console.log('!invalid');
   return;
    }
    this.spinner.show();
 

  let body = new URLSearchParams();
    body.set('route_name', this.f.loadTerm.value);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
  this.http.post(this.baseUrl + 'route/add_route', body.toString(),options).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.loadForm.reset();
          // tslint:disable-next-line: forin
        for (const i in this.loadForm.controls) {
            this.loadForm.controls[i].setErrors(null);
          }
      
          this.spinner.hide();
        this.submitted = false;

        this.router.navigate(['/route/view']);
      },
      (error) => {
        this.spinner.hide();
      });
  }
}
