import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  // preview(files) {
  //   console.log(files);
  //   if (files.length === 0) {
  //     return;
  //   }
  //   const mimeType = files[0].type;
  //   // this.ff['csv'].setValue(files[0].name ? files[0].name : '');
  //   const reader = new FileReader();
  //   //  this.imagePath = files;
  //   this.fileData =  files[0] as File;
  //   reader.readAsDataURL(files[0]);
  //   // reader.onload = (_event) => {
  //   //   this.imgURL = reader.result;
  //   // };
  // }

  get f() { return this.carrierForm.controls; }



  /*
  Customer Add Function
  */
  addCarrier() {
    try {
      
   
    this.submitted = true;
    if (this.carrierForm.invalid) {
      return;
    }
 
    this.spinner.show();
    let body = new URLSearchParams();
    body.set('shop_name', this.f.legalName.value);
    body.set('shop_email', this.f.email.value);
    body.set('shop_mobile_number', this.f.phone.value);
    body.set('shop_address', this.f.address.value);

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
    this.http.post(this.baseUrl + 'shop/add_shop', body.toString(),options).subscribe(
      (response: any) => {
        this.toastr.success("Buyer Added Sucessfully");
        this.carrierForm.reset();

        // tslint:disable-next-line: forin
        for (const i in this.carrierForm.controls) {
          this.carrierForm.controls[i].setErrors(null);
        }
        this.spinner.hide();
        this.router.navigate(['/buyer/view']);

      },
      (error) => {
        this.spinner.hide();
      });
  
} catch (error) {
  this.spinner.hide();

    console.log(error)  
}
}
}
