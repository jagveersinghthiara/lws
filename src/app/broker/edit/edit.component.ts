import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
  brokerForm: FormGroup;
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
    this.http.get(this.baseUrl + 'broker/' + this.activatedRoute.snapshot.paramMap.get('id') ).subscribe(
      (response: any) => {
        this.f.name.setValue(response.body.name);
        this.f.email.setValue(response.body.email);
        this.f.phone.setValue(response.body.phone);
        this.f.address.setValue(response.body.address);
        this.f.city.setValue(response.body.city);
        this.f.fax.setValue(response.body.fax);
        this.f.state.setValue(response.body.state);
        this.f.zip.setValue(response.body.zip);
      },
      (error) => {
      });

   }

  ngOnInit() {

    this.brokerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{9,15}$'),
      ])]],
      address: ['', [Validators.required]],
      name: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{5,7}$'),
      ])]],
      fax: ['', [Validators.required]]
  });
  }

get f() { return this.brokerForm.controls; }


/*
Broker Edit Function
*/
  editBroker() {
    this.submitted = true;
    if (this.brokerForm.invalid) {
      return;
    }
    this.spinner.show();
    const formData = new FormData();
    formData.append('name', this.f.name.value);
    formData.append('email', this.f.email.value);
    formData.append('phone', this.f.phone.value);
    formData.append('address', this.f.address.value);
    formData.append('city', this.f.city.value);
    formData.append('state', this.f.state.value);
    formData.append('zip', this.f.zip.value);
    formData.append('fax', this.f.fax.value);
    this.http.put(this.baseUrl + 'broker/' + this.activatedRoute.snapshot.paramMap.get('id'), formData).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.router.navigate(['/broker/view']);
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      });
  }
}
