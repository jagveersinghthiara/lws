import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { IfStmt } from '@angular/compiler';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  carrierForm: FormGroup;
  carrierCsvForm: FormGroup;
  baseUrl = environment.baseUrl;
  submitted = false;
  fileData: File = null;
  useCsv: any = false;
  ComissionError= false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService

  ) { }

  use(type) {
    if (type == 'csv') {
      this.useCsv = true;
    } else if (type == 'manually') {
      this.useCsv = false;
    }
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
      status: [1]
    });

    this.carrierCsvForm = this.formBuilder.group({
      csv: [this.fileData, Validators.required],
    });
  }

  preview(files) {
    console.log(files);
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    // this.ff['csv'].setValue(files[0].name ? files[0].name : '');
    const reader = new FileReader();
    //  this.imagePath = files;
    this.fileData =  files[0] as File;
    reader.readAsDataURL(files[0]);
    // reader.onload = (_event) => {
    //   this.imgURL = reader.result;
    // };
  }

  get f() { return this.carrierForm.controls; }
  get ff() { return this.carrierCsvForm.controls; }



  /*
  Customer Add Function
  */
  addCarrier() {
    this.submitted = true;
    if (this.carrierForm.invalid) {
      return;
    }
    if (this.f.status.value == 3) {
      if (this.f.commission.value == '' || this.f.commission.value == 0 ) {
        this.ComissionError = true;
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
    formData.append('status', this.f.status.value);

    formData.append('state', this.f.state.value);
    formData.append('zip', this.f.zip.value);
    formData.append('fax', this.f.fax.value);
    formData.append('contact1', this.f.contact1.value);
    formData.append('contact2', this.f.contact2.value);
    formData.append('trucks', this.f.noOfTrucks.value);
    formData.append('policy', this.f.policy.value);
    formData.append('docket', this.f.docket.value);
    formData.append('usdot', this.f.usdot.value);
    this.http.post(this.baseUrl + 'carrier', formData).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.carrierForm.reset();

        // tslint:disable-next-line: forin
        for (const i in this.carrierForm.controls) {
          this.carrierForm.controls[i].setErrors(null);
        }
        this.spinner.hide();
        this.router.navigate(['/dispatcher/view']);

      },
      (error) => {
        this.spinner.hide();
      });
  }

  // upload csv file Function
  addCarrierCsv() {
    this.submitted = true;
    if (this.carrierCsvForm.invalid) {
      return;
    }
    this.spinner.show();
    const formData = new FormData();
    formData.append('csv', this.fileData);
    this.http.post(this.baseUrl + 'carrierCsv', formData).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.carrierCsvForm.reset();
        this.submitted = false;
        this.spinner.hide();
      });
  }
}
