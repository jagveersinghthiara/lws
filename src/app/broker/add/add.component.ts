import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  customerForm: FormGroup;
  baseUrl = environment.baseUrl;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }
  ngOnInit() {
    this.customerForm = this.formBuilder.group({
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

  get f() { return this.customerForm.controls; }


  /*
  Customer Add Function
  */
  addCustomer() {
    this.submitted = true;
    if (this.customerForm.invalid) {
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
    this.http.post(this.baseUrl + 'broker', formData).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.customerForm.reset();
        // tslint:disable-next-line: forin
        for (const i in this.customerForm.controls) {
          this.customerForm.controls[i].setErrors(null);
        }
        this.spinner.hide();

        this.router.navigate(['/broker/view']);
      },
      (error) => {
      });
  }
}
