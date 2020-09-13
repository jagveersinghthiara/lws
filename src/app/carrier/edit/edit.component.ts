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
  carrierForm: FormGroup;
  baseUrl = environment.baseUrl;
  submitted = false;
  ComissionError = false;


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    public activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService

  ) {
    this.getDetails();
  }


  getDetails() {
    this.spinner.show();
    this.http.get(this.baseUrl + 'shop/get_shop?id=' + this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (response: any) => {
        this.spinner.hide();

        this.f.email.setValue(response.data.shop_email);
        this.f.phone.setValue(response.data.shop_mobile_number);
        this.f.address.setValue(response.data.shop_address);
        this.f.legalName.setValue(response.data.shop_name);

      },
      (error) => {
        this.toastr.success('Something went wrong please try again');
        this.spinner.hide();
      });
  }
  ngOnInit() {

    this.carrierForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{9,15}$'),
      ])]],
      address: ['', [Validators.required]],
      legalName: ['', [Validators.required]],
    });
  }

  get f() { return this.carrierForm.controls; }


  /*
  Carrier Edit Function
  */
  editCarrier() {
    this.submitted = true;
    if (this.carrierForm.invalid) {
      return;
    }
    this.spinner.show();
    let body = new URLSearchParams();
    body.set('shop_name', this.f.legalName.value);
    body.set('shopId', this.activatedRoute.snapshot.paramMap.get('id'));
    body.set('shop_address', this.f.address.value);
    body.set('shop_email', this.f.email.value);
    body.set('shop_mobile_number', this.f.phone.value);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    this.http.post(this.baseUrl + 'shop/edit_shop', body.toString(), options).subscribe(
      (response: any) => {
        this.submitted = false;
        // this.getDetails();
        this.toastr.success("Buyer Details Updated Sucessfully");
        this.spinner.hide();
        this.router.navigate(['/buyer/view/']);

      },
      (error) => {
        this.toastr.error('Something went wrong !');
        this.spinner.hide();
      });
  }
}
