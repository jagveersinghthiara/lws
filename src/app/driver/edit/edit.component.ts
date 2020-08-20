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

    this.http.get(this.baseUrl + 'driver/' + this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (response: any) => {
        this.f.name.setValue(response.body.name);
        this.f.email.setValue(response.body.email);
        this.f.phone.setValue(response.body.phone);
        this.f.address.setValue(response.body.address);
        this.f.city.setValue(response.body.city);
        this.f.fax.setValue(response.body.fax);
        this.f.state.setValue(response.body.state);
        this.f.zip.setValue(response.body.zip);
        this.f.type.setValue(response.body.type);
        this.f.vehicleNumber.setValue(response.body.vehicleNumber);
        this.f.vehicleType.setValue(response.body.vehicleType);
        this.f.licenseNumber.setValue(response.body.licenseNumber);
        if (response.body.type == 2) {
          this.f.firm.setValue(response.body.firmId);
        }
        if (response.body.cell == 0) {
          this.f.cell.setValue('');
        } else {
          this.f.cell.setValue(response.body.cell);
        }
        const selectedValues = [];
        if (response.body.assingEquiptments.length > 0) {
          const array = response.body.assingEquiptments;
          for (let i = 0; i < array.length; i++) {
            const element = array[i];
            selectedValues.push(array[i].equipmentId.toString());
          }
        }
        // console.log('selectedValues', selectedValues);
        
        this.f.equipment.setValue(selectedValues);
      },
      (error) => {
      });

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
      image: [''],
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
    this.http.put(this.baseUrl + 'driver/' + this.activatedRoute.snapshot.paramMap.get('id'), formData).subscribe(
      (response: any) => {
        this.toastr.success(response.body);
        this.spinner.hide();
        this.router.navigate(['/driver/view']);
      },
      (error) => {
        this.spinner.hide();
      });
  }
}
