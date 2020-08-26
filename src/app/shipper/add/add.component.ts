import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  shipperForm: FormGroup;
  baseUrl = environment.baseUrl;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService

  ) { }
  ngOnInit() {
    this.shipperForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{1,15}$'),
      ])]],
  });
  }

get f() { return this.shipperForm.controls; }


/*
Customer Add Function
*/
  addShipper() {
    this.submitted = true;
    if (this.shipperForm.invalid) {
      return;
    }
    this.spinner.show();
    // const formData = new FormData();
    // formData.append('name', this.f.name.value);
    // formData.append('email', this.f.email.value);
    // formData.append('phone', this.f.phone.value);
    // formData.append('address', this.f.address.value);
    // formData.append('city', this.f.city.value);
    // formData.append('state', this.f.state.value);
    // formData.append('zip', this.f.zip.value);
    // formData.append('fax', this.f.fax.value);
    let body = new URLSearchParams();
    body.set('vehicle_name', this.f.name.value);
    body.set('current_kms', this.f.phone.value);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
    this.http.post(this.baseUrl + 'vehicle/add_vehicle', body.toString(),options).subscribe(
      (response: any) => {
        this.spinner.hide();
        this.toastr.success(response.message);
        this.router.navigate(['/vehicles/view']);
        this.shipperForm.reset();
          // tslint:disable-next-line: forin
        for (const i in this.shipperForm.controls) {
            this.shipperForm.controls[i].setErrors(null);
          }
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error('Something Went Wrong Please Try Again');
      });
  }
}
