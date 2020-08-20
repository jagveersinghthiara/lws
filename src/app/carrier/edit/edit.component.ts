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
    this.http.get(this.baseUrl + 'carrierDetail/' + this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (response: any) => {
        this.f.email.setValue(response.body.email);
        this.f.phone.setValue(response.body.phone);
        this.f.address.setValue(response.body.address);
        this.f.legalName.setValue(response.body.legalName);
        this.f.dbaName.setValue(response.body.dbaName);
        this.f.city.setValue(response.body.city);
        this.f.state.setValue(response.body.state);
        this.f.zip.setValue(response.body.zip);
        this.f.noOfTrucks.setValue(response.body.noofTrucks);
        this.f.fax.setValue(response.body.fax);
        this.f.cell.setValue(response.body.cell);
        this.f.contact1.setValue(response.body.contact1);
        this.f.contact2.setValue(response.body.contact2);
        this.f.docket.setValue(response.body.docket);
        this.f.policy.setValue(response.body.policy);
        this.f.usdot.setValue(response.body.usdot);
        this.f.status.setValue(response.body.status);
        this.f.commission.setValue(response.body.commission);
        this.spinner.hide();
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
      dbaName: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{5,7}$'),
      ])]],
      noOfTrucks: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{1,7}$'),
      ])]],
      commission: ['', [Validators.compose([
        Validators.pattern('^[0-9]{1,7}$'),
      ])]],
      fax: ['', [Validators.required]],
      cell: ['', [Validators.compose([
        Validators.pattern('^[0-9]{9,15}$'),
      ])]],
      contact1: ['', [Validators.compose([
        Validators.pattern('^[0-9]{9,15}$'),
      ])]],
      contact2: ['', [Validators.compose([
        Validators.pattern('^[0-9]{9,15}$'),
      ])]],
      docket: [''],
      policy: [''],
      usdot: [''],
      status: ['']
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
    if (this.f.status.value == 3) {
      if (this.f.commission.value == '' || this.f.commission.value == 0 ) {
        this.ComissionError = true;
        this.spinner.hide();

        return;
      } else {
        this.ComissionError = false;

      }
    }
    this.spinner.show();

    const formData = new FormData();
    formData.append('legalName', this.f.legalName.value);
    formData.append('dbaName', this.f.dbaName.value);
    formData.append('email', this.f.email.value);
    formData.append('phone', this.f.phone.value);
    formData.append('cell', this.f.cell.value);
    formData.append('address', this.f.address.value);
    formData.append('city', this.f.city.value);
    formData.append('commission', this.f.commission.value);
    formData.append('state', this.f.state.value);
    formData.append('zip', this.f.zip.value);
    formData.append('fax', this.f.fax.value);
    formData.append('contact1', this.f.contact1.value);
    formData.append('contact2', this.f.contact2.value);
    formData.append('trucks', this.f.noOfTrucks.value);
    formData.append('policy', this.f.policy.value);
    formData.append('docket', this.f.docket.value);
    formData.append('usdot', this.f.usdot.value);
    formData.append('status', this.f.status.value);
    // formData.append('id', this.activatedRoute.snapshot.paramMap.get('id'));
    var stats =  this.f.status.value ;
    this.http.put(this.baseUrl + 'carrier/' + this.activatedRoute.snapshot.paramMap.get('id'), formData).subscribe(
      (response: any) => {
        this.submitted = false;
        this.getDetails();
        this.toastr.success(response.message);
        this.spinner.hide();
        alert(stats)
        this.router.navigate(['/dispatcher/view/'+stats]);

      },
      (error) => {
        this.toastr.error('Something went wrong !');
        this.spinner.hide();
      });
  }
}
