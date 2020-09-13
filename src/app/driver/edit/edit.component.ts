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
  driverForm: FormGroup;
  baseUrl = environment.baseUrl;
  submitted = false;
  firmList: any;
  equipments: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    public activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,


  ) {
    this.spinner.show();

    this.http.get(this.baseUrl + 'delivery/getDeliveryMan?id=' + this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (response: any) => {
        this.spinner.hide();
      
        this.f.name.setValue(response.data.deliveryman_name);
        this.f.email.setValue(response.data.deliveryman_email);
        this.f.phone.setValue(response.data.deliveryman_mobile_number);
        this.f.password.setValue(response.data.deliveryman_password);
        
        },
      (error) => {
        this.spinner.hide();

      });

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


  /*
  Driver Edit Function
  */
  editDriver() {
    this.submitted = true;
    if (this.driverForm.invalid) {
      return;
    }
    this.spinner.show();

      // "deliverymanId": 10,
        // "deliveryman_name": "Jimmy S",
        // "deliveryman_email": "jimmy@gmail.com",
        // "deliveryman_mobile_number": "80000707080",
        // "deliveryman_password": "123456",
        // "delete_deliveryman_status": 0,
        // "created_at": "2020-08-02T06:48:12.000Z"
        let body = new URLSearchParams();
        body.set('deliveryman_name', this.f.name.value);
        body.set('deliverymanId', this.activatedRoute.snapshot.paramMap.get('id'));

        body.set('deliveryman_email', this.f.email.value);
        body.set('deliveryman_mobile_number', this.f.phone.value);
        body.set('deliveryman_password', this.f.password.value);
        
           let options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };
    this.http.post(this.baseUrl + 'delivery/edit_deliveryman',  body.toString() ,options).subscribe(
      (response: any) => {
        this.toastr.success("Record Updated Sucessfully");
        this.spinner.hide();
        this.router.navigate(['/driver/view']);
      },
      (error) => {
        this.spinner.hide();
      });
  }
}
