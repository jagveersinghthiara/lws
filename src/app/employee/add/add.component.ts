import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  employeeForm: FormGroup;
  baseUrl = environment.baseUrl;
  submitted = false;
  roles: any;


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService


  ) {
    this.commonService.roles().subscribe(
      (response: any) => {
        this.roles = response.body;
      },
      (error) => {
        this.toastr.error(error.error.message);

      });
  }
  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],

    });
  }

  get f() { return this.employeeForm.controls; }


  /*
  Employee Add Function
  */
  addEmployee() {
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
    this.http.post(this.baseUrl + 'employee', formData).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.employeeForm.reset();
        // tslint:disable-next-line: forin
        for (const i in this.employeeForm.controls) {
          this.employeeForm.controls[i].setErrors(null);
        }
        this.spinner.hide();
        this.router.navigate(['/employee/view']);
      },
      (error) => {
        this.spinner.hide();

      });
  }
}
