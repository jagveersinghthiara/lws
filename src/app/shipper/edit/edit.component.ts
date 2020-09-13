import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  shipperForm: FormGroup;
  baseUrl = environment.baseUrl;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    public activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService

  ) {
     this.spinner.show();
    this.http.get(this.baseUrl + 'vehicle/view_vehicle?id=' + this.activatedRoute.snapshot.paramMap.get('id') ).subscribe(
      (response: any) => {
        this.spinner.hide();
        this.f.name.setValue(response.data.vehicle_name);
        this.f.phone.setValue(response.data.current_kms);
      },
      (error) => {
        this.toastr.error('Something Went Wrong Please Try Again');

        this.spinner.hide();
        
      });

   }

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
Customer Edit Function
*/
  editShipper() {
    this.submitted = true;
    if (this.shipperForm.invalid) {
      return;
    }
    this.spinner.show();
    let body = new URLSearchParams();
    body.set('vehicle_name', this.f.name.value);
    body.set('vehicleId', this.activatedRoute.snapshot.paramMap.get('id'));
    body.set('current_kms', this.f.phone.value);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    this.http.post(this.baseUrl + 'vehicle/update_vehicle', body.toString(), options).subscribe(
      (response: any) => {
        this.spinner.hide();
        this.toastr.success("Vehicles Details Updated Sucessfully");
        this.router.navigate(['/vehicles/view']);
      },
      (error) => {
        this.spinner.hide();
      });
  }
}
