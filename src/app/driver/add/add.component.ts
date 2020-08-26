import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
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
  driverForm: FormGroup;
  baseUrl = environment.baseUrl;
  submitted = false;
  isFirm = true;
  firmList: any;
  equipments: any;
  selectedArray = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService

  ) {
    // this.http.get(this.baseUrl + 'carrierList').subscribe(
    //   (response: any) => {
    //     this.firmList = response.body;
    //   },
    //   (error) => {
    //   });

   
    //
  }
  ngOnInit() {
    this.driverForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{9,15}$'),
      ])]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
          });

  }






  get f() { return this.driverForm.controls; }

  check(e) {
    if (e.target.value == 2) {
      this.isFirm = true;
    } else if (e.target.value == 1) {
      this.isFirm = false;
    }
  }

  /*
  Driver Add Function
  */
  addDriver() {
    try {
      
   
    // deliveryman_name*
// deliveryman_email*
// deliveryman_mobile_number*
// deliveryman_password*
    this.submitted = true;
    if (this.driverForm.invalid) {
      return;
    }
    this.spinner.show();
    const formData = new FormData();
    formData.append('deliveryman_name', this.f.name.value);
    formData.append('deliveryman_email', this.f.email.value);
    formData.append('deliveryman_mobile_number', this.f.phone.value);
    formData.append('deliveryman_password', this.f.password.value);
  //  let formData = {
  //   'deliveryman_name': this.f.name.value,
  //   'deliveryman_email': this.f.email.value,
  //   'deliveryman_mobile_number': this.f.phone.value,
  //   'deliveryman_password': this.f.password.value
  //  }

   let body = new URLSearchParams();
body.set('deliveryman_name', this.f.name.value);
body.set('deliveryman_email', this.f.email.value);
body.set('deliveryman_mobile_number', this.f.phone.value);
body.set('deliveryman_password', this.f.password.value);

   let options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
};
    this.http.post(this.baseUrl + 'delivery/add_deliveryman', body.toString() ,options).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.driverForm.reset();
        // tslint:disable-next-line: forin
        for (const i in this.driverForm.controls) {
          this.driverForm.controls[i].setErrors(null);
        }
        // const emailFormArray = this.driverForm.controls.equipment as FormArray;
        // emailFormArray.controls.length=0;
        this.router.navigate(['/driver/view']);
        this.spinner.hide();
      },

      (error) => {
        this.spinner.hide();
      });
  }
 catch (error) {
   console.log(error)
  this.spinner.hide();
  alert("SOMETHING WENT WRONG")
}
  }
}
