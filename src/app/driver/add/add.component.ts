import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
    this.http.get(this.baseUrl + 'carrierList').subscribe(
      (response: any) => {
        this.firmList = response.body;
      },
      (error) => {
      });

    this.http.get(this.baseUrl + 'equipment').subscribe(
      (response: any) => {
        this.equipments = response.body;
      },
      (error) => {
      });
    //
  }
  ngOnInit() {
    this.driverForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{9,15}$'),
      ])]],
      address: ['', [Validators.required]],
      name: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      fax: ['', [Validators.required]],
      image: ['', [Validators.required]],
      licenseNumber: ['', [Validators.required]],
      vehicleType: ['', [Validators.required]],
      vehicleNumber: ['', [Validators.required]],
      zip: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{5,7}$'),
      ])]],
      type: ['2', [Validators.required]],
      firm: [''],
      cell: ['', [Validators.compose([
        Validators.pattern('^[0-9]{9,15}$'),
      ])]],
      equipment: []
    });

  }



  onChange(email: number, isChecked: boolean) {
    // console.log('chnaged', email);
    const emailFormArray = this.driverForm.controls.equipment as FormArray;
    if (isChecked) {
      this.selectedArray.push(email);
      emailFormArray.push(new FormControl(email));
    } else {
      // console.log('inelse');
      const index = emailFormArray.controls.findIndex(x => x.value == email);
      emailFormArray.removeAt(index);
      // tslint:disable-next-line: forin
      for (const i in this.selectedArray) {
        // console.log('i.', i, this.selectedArray[i], email);
        if (this.selectedArray[i] == email) {
          // console.log('removing..');
          this.selectedArray.splice(parseInt(i), 1);
        }
    }
      console.log('pending array ', this.selectedArray);
    }
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
    // console.log(JSON.stringify(this.f.equipment.value));
    
    this.submitted = true;
    if (this.driverForm.invalid) {
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
    if (this.f.cell.value) {
      formData.append('cell', this.f.cell.value);
    }
    if (this.f.firm.value) {
      formData.append('firmId', this.f.firm.value);
    }
    formData.append('fax', this.f.fax.value);
    formData.append('zip', this.f.zip.value);
    formData.append('type', this.f.type.value);
    formData.append('licenseNumber', this.f.licenseNumber.value);
    formData.append('vehicleType', this.f.vehicleType.value);
    formData.append('vehicleNumber', this.f.vehicleNumber.value);
    formData.append('equiptment', JSON.stringify(this.f.equipment.value));
    this.http.post(this.baseUrl + 'driver', formData).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.driverForm.reset();
        // tslint:disable-next-line: forin
        for (const i in this.driverForm.controls) {
          this.driverForm.controls[i].setErrors(null);
        }
        const emailFormArray = this.driverForm.controls.equipment as FormArray;
        emailFormArray.controls.length=0;
        this.router.navigate(['/driver/view']);
        this.spinner.hide();
      },

      (error) => {
        this.spinner.hide();
      });
  }
}
