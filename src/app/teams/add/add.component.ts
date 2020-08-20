import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
  teamForm: FormGroup;
  baseUrl = environment.baseUrl;
  submitted = false;
  employeesData: any;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  SalesManager: any;
  SalesAgent: any;
  DispatcherManager: any;
  DispatcherAgent: any;
  AccountingManager: any;
  AccountingAgent: any;
  SalesTeamLeader: any;
  DispatchTeamLeader: any;
  AccountTeamLeader: any;
  showCross = false;
  showCrossDes = false;
  showCrossAcc = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService

  ) {
    this.spinner.show();
    this.http.get(this.baseUrl + 'employee').subscribe(
      (response: any) => {
        // console.log(response);
        // this.employeesData = response.body;
        this.SalesManager = response.body[0].users;
        this.SalesAgent = response.body[1].users;
        this.DispatcherManager = response.body[2].users;
        this.DispatcherAgent = response.body[3].users;
        this.AccountingManager = response.body[4].users;
        this.AccountingAgent = response.body[5].users;
        this.SalesTeamLeader = response.body[6].users;
        this.DispatchTeamLeader = response.body[7].users;
        this.AccountTeamLeader = response.body[8].users;
        // this.SalesManager = response.body[0].users;
        this.spinner.hide();
      },
      (error) => {
        this.toastr.success(error.error.message);
        this.spinner.hide();

      });

  }
  ngOnInit() {
    this.teamForm = this.formBuilder.group({
      salesManager: ['', [Validators.required]],
      name: ['', [Validators.required]],
      dispatcherManager: ['', [Validators.required]],
      accountantManager: ['', [Validators.required]],
      account: this.formBuilder.array([
        this.getAcc(0),
      ]),
      disptch: this.formBuilder.array([
        this.getDesptch(0),
      ]),
      units: this.formBuilder.array([
        this.getUnit(0),
      ]),
    });
  }

  private getDesptch(i) {
    return this.formBuilder.group({
      dispatcherAgent: [''],
      dispatcherTl: [''],
      group: [i],
    });
  }
  addDespatch() {
    this.showCrossDes = true;
    const control = this.teamForm.controls.disptch as FormArray;
    const val = control.controls.length;
    control.push(this.getDesptch(val));
  }
  removeDes(i) {
    const control = this.teamForm.controls.disptch as FormArray;
    if (control.controls.length <= 2) {
      this.showCrossDes = false;
    }
    control.removeAt(i);
  }


  private getAcc(i) {
    return this.formBuilder.group({
      AccountTl: [''],
      accountingAgent: [''],
      group: [i],
    });
  }
  addAcc() {
    this.showCrossAcc = true;
    const control = this.teamForm.controls.account as FormArray;
    const val = control.controls.length;
    control.push(this.getAcc(val));
  }
  removeAcc(i) {
    const control = this.teamForm.controls.account as FormArray;
    if (control.controls.length <= 2) {
      this.showCrossAcc = false;
    }
    control.removeAt(i);
  }


  private getUnit(i) {
    return this.formBuilder.group({
      salesTL: [''],
      salesAgent: [''],
      group: [i],
    });
  }
  private addUnit() {
    this.showCross = true;
    const control = this.teamForm.controls.units as FormArray;
    const val = control.controls.length;
    control.push(this.getUnit(val));
  }
  remove(i) {
    const control = this.teamForm.controls.units as FormArray;
    if (control.controls.length <= 2) {
      this.showCross = false;
    }
    control.removeAt(i);
  }

  get f() { return this.teamForm.controls; }
  /*
  Team Add Function
  */
  addTeam() {
    this.submitted = true;
    if (this.teamForm.invalid) {
      return;
    }
    this.spinner.show();

    const formData = new FormData();
    formData.append('salesManager', this.f.salesManager.value);
    formData.append('dispatcherManager', this.f.dispatcherManager.value);
    formData.append('accountantManager', this.f.accountantManager.value);
    formData.append('name', this.f.name.value);
    formData.append('dispatcher', JSON.stringify(this.f.disptch.value));
    formData.append('account', JSON.stringify(this.f.account.value));
    formData.append('sales', JSON.stringify(this.f.units.value));
    this.http.post(this.baseUrl + 'team', formData).subscribe(
      (response: any) => {

        this.showCross = false;
        this.showCrossAcc = false;
        this.showCrossDes = false;

        this.toastr.success(response.message);
        this.teamForm.reset();
        this.submitted = false;
        // tslint:disable-next-line: forin
        for (const i in this.teamForm.controls) {
          this.teamForm.controls[i].setErrors(null);
        }

        const control = this.teamForm.controls.units as FormArray;
        // tslint:disable-next-line: forin
        for (const i in control) {
          control.removeAt(1);
        }

        // tslint:disable-next-line: variable-name
        const control_disptch = this.teamForm.controls.disptch as FormArray;
        // tslint:disable-next-line: forin
        for (const i in control_disptch) {
          control_disptch.removeAt(1);
        }

        // tslint:disable-next-line: variable-name
        const control_account = this.teamForm.controls.account as FormArray;
        // tslint:disable-next-line: forin
        for (const i in control_account) {
          control_account.removeAt(1);
        }
        this.spinner.hide();
        this.router.navigate(['/teams/view']);

      },
      (error) => {

        this.spinner.hide();

      });
  }

}
