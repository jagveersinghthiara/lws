import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common.service';

import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  employeeForm: FormGroup;
  baseUrl = environment.baseUrl;
  submitted = false;
  roles: any;
  teams: any;


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private commonService: CommonService,
    public activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService

  ) {
    this.commonService.roles().subscribe(
      (response: any) => {
        this.roles = response.body;
      },
      (error) => {
        this.toastr.error(error.error.message);

      });
      // tslint:disable-next-line: align
      this.spinner.show();
    this.http.get(this.baseUrl + 'employeeDetail/' + this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (response: any) => {
        this.f.name.setValue(response.body.userName);
        this.f.email.setValue(response.body.email);
        this.f.role.setValue(response.body.role);
        this.http.get(this.baseUrl + 'userTeams/' + this.activatedRoute.snapshot.paramMap.get('id') + '/' + this.f.role.value).subscribe(
          (response: any) => {
            this.spinner.hide();
            // console.log("-_-",response);
            if (response.body.length >  0) {
              this.teams = response.body;

            }
          },
          (error) => {
            this.spinner.hide();
          });
      },
      (error) => {
        this.spinner.hide();
      });




  }
  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: [''],
      role: ['', [Validators.required]],

    });

  }

  get f() { return this.employeeForm.controls; }


  /*
  Employee Edit Function
  */
  editEmployee() {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    this.spinner.show();

    const formData = new FormData();
    formData.append('userName', this.f.name.value);
    formData.append('email', this.f.email.value);
    formData.append('password', this.f.password.value);
    formData.append('role', this.f.role.value);
    this.http.put(this.baseUrl + 'employee/' + this.activatedRoute.snapshot.paramMap.get('id'), formData).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.router.navigate(['/employee/view']);
        this.spinner.hide();

      },
      (error) => {

      });
  }
}
