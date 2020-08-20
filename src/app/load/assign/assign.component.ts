import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {
  loadForm: FormGroup;
  baseUrl = environment.baseUrl;
  submitted = false;
  carrierList: any;
  driverList: any;
  filter: any;
  found: boolean;
  equp: any;
  gloabal: any;


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private commonService: CommonService,
    public activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService


  ) {
    this.spinner.show();
    this.commonService.carrierByType(3).subscribe(
      (response: any) => {
        this.carrierList = response.body.carrierData;
      });
    this.http.get(this.baseUrl + 'assignedLoad/' + this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (response: any) => {
        this.spinner.hide();
        // tslint:disable-next-line: triple-equals
        if (response.body.carrierId != 0) {
          this.f.carrier.setValue(1);
          this.f.carrierId.setValue(response.body.carrierId);
          this.getDriver(response.body.carrierId, 0, 0);
        } else {
          this.commonService.driver().subscribe(
            // tslint:disable-next-line: no-shadowed-variable
            (response: any) => {
              this.driverList = response.body;
            });
          this.f.carrier.setValue(2);
        }
        this.f.driverId.setValue(response.body.driverId);
      }, (error) => {
        console.log(error);
        this.spinner.hide();
      });

  }
  ngOnInit() {
    this.loadForm = this.formBuilder.group({
      carrier: ['', [Validators.required]],
      driverId: ['', [Validators.required]],
      carrierId: [''],
      global: ['']
    });
    this.setPreference(1);

    this.globalDriver();
  }


  get f() { return this.loadForm.controls; }
  /*
  get driver based on carrier
  */

  getDriver(carrierId: number, driver, site) {
    // tslint:disable-next-line: triple-equals
    this.found = false;
    this.http.get(this.baseUrl + 'driverByCarrier/' + carrierId).subscribe(
      (response: any) => {
        this.driverList = response.body;
        if (driver != 0) {
          const found = this.driverList.find(element => element.id == driver);
    
          this.equp = found.assingEquiptments;
          if (this.equp.length > 0) {
            this.found = true;
          } else {
            this.found = false;
          }
        }
      });

    if (site != 0) {
      this.f.global.setValue('');
    }
 
  }

  /*
  set Preference
  */

  setPreference(preference: number) {

    if (preference === 1) {

      this.driverList = [];
    } else {
      this.f.carrierId.setValue(0);
      this.commonService.driver().subscribe(
        (response: any) => {
          this.driverList = response.body;
        });
    }
  }
  /*
  Assign Driver to Load Function
  */

  chnage(e) {
    this.f.global.setValue('');
    const i = e.target.value;

    this.filter = i;

    const found = this.driverList.find(element => element.id == i);

    this.equp = found.assingEquiptments;
    if (this.equp.length > 0) {
      this.found = true;
    } else {
      this.found = false;
    }
    // console.log(found);
  }
  globalDriver() {
    this.http.get(this.baseUrl + 'driverGlobal').subscribe(
      (response: any) => {
        this.gloabal = response.body;
      });
  }

  chnageGlobal(e) {
    const index = e.target.value;
    const driver = this.gloabal[index].id;
    const firmId = this.gloabal[index].firmId;
    this.getDriver(firmId, driver, 1);
    this.f.carrierId.setValue(firmId);
    this.f.driverId.setValue(driver);
    // alert(driver);


    // alert(driver + ' ' + firmId);

  }

  assignDriver() {
    this.spinner.show();
    this.submitted = true;
    if (this.loadForm.invalid) {
      return;
    }
    const formData = new FormData();
    if (this.f.carrierId.value || this.f.carrierId.value === 0) {
      formData.append('carrierId', this.f.carrierId.value);
    }
    formData.append('driverId', this.f.driverId.value);
    this.http.post(this.baseUrl + 'assignDriver/' + this.activatedRoute.snapshot.paramMap.get('id'), formData).subscribe(
      (response: any) => {
        this.spinner.hide();
        // this.toastr.success(response.message);
      });
  }
}
