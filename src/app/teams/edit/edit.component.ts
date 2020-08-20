import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
  teamForm: FormGroup;
  baseUrl = environment.baseUrl;
  submitted = false;
  users: any;
  showCross = false;
  showCrossDes = false;
  showCrossAcc = false;
  SalesManager: any;
  SalesAgent: any;
  DispatcherManager: any;
  DispatcherAgent: any;
  AccountingManager: any;
  AccountingAgent: any;
  SalesTeamLeader: any;
  DispatchTeamLeader: any;
  AccountTeamLeader: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    public activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService

  ) {
    this.spinner.show();
    this.http.get(this.baseUrl + 'employee').subscribe(
      (response: any) => {
        this.SalesManager = response.body[0].users;
        this.SalesAgent = response.body[1].users;
        this.DispatcherManager = response.body[2].users;
        this.DispatcherAgent = response.body[3].users;
        this.AccountingManager = response.body[4].users;
        this.AccountingAgent = response.body[5].users;
        this.SalesTeamLeader = response.body[6].users;
        this.DispatchTeamLeader = response.body[7].users;
        this.AccountTeamLeader = response.body[8].users;
        this.spinner.hide();
      },
      (error) => {
        this.toastr.success(error.error.message);
        this.spinner.hide();
      });

    this.http.get(this.baseUrl + 'teamDetail/' + this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (response: any) => {
        console.log(response);
        this.users = response.body.teamMembers;
        this.f.name.setValue(response.body.name);

        this.f.dispatcherManager.setValue(response.body.teamMembers[1].memberId);
        this.f.accountantManager.setValue(response.body.teamMembers[2].memberId);
        this.f.salesManager.setValue(response.body.teamMembers[0].memberId);
        const TeamMembers = response.body.teamMembers;
        const result = TeamMembers.filter(TeamMember => TeamMember.user.roleName == 'Sales Team Leader'
        );
        const dispatchResult = TeamMembers.filter(TeamMember => TeamMember.user.roleName == 'Dispatch Team Leader'
        );
        const accountResult = TeamMembers.filter(TeamMember => TeamMember.user.roleName == 'Account Team Leader'
        );
        this.aaddUnit(result);
        this.addDispatch(dispatchResult);
        this.addAccount(accountResult);

      },
      (error) => {
      });
  }
  ngOnInit() {
    this.teamForm = this.formBuilder.group({
      salesManager: ['', [Validators.required]],
      name: ['', [Validators.required]],
      dispatcherManager: ['', [Validators.required]],
      accountantManager: ['', [Validators.required]],
      account: this.formBuilder.array([
      ]),
      disptch: this.formBuilder.array([
      ]),
      units: this.formBuilder.array([
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

  private aaddUnit(aray) {
    const control = this.teamForm.controls.units as FormArray;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < aray.length; i++) {
      this.showCross=true;
      control.push(this.setUnit(aray[i]));
    }

  }

  private addDispatch(aray) {
    const control = this.teamForm.controls.disptch as FormArray;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < aray.length; i++) {
      this.showCrossDes= true;
      control.push(this.setDispatch(aray[i]));
    }
  }

  private setDispatch(aray) {
    const user = [];
    aray.teamAgents.forEach(element => {
      user.push(element.user.id.toString());
    });
    const userstring = user.join(',');
    return this.formBuilder.group({
      dispatcherTl: [aray.memberId],
      dispatcherAgent: [user],
      group: [aray.group_level],
    });
  }

  private addAccount(aray) {
    const control = this.teamForm.controls.account as FormArray;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < aray.length; i++) {
      this.showCrossAcc=true;
      control.push(this.setAccount(aray[i]));
    }
  }


  private setAccount(aray) {
    const user = [];
    aray.teamAgents.forEach(element => {
      user.push(element.user.id.toString());
    });
    const userstring = user.join(',');
    console.log('aray.memberId', aray.memberId);
    return this.formBuilder.group({
      AccountTl: [aray.memberId],
      accountingAgent: [user],
      group: [aray.group_level],
    });
  }

  private setUnit(aray) {
    const user = [];
    aray.teamAgents.forEach(element => {
      user.push(element.user.id.toString());
    });
    const userstring = user.join(',');
    return this.formBuilder.group({
      salesTL: [aray.memberId],
      salesAgent: [user],
      group: [aray.group_level],
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
  Employee Edit Function
  */
  editTeam() {
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
    formData.append('teamId', this.activatedRoute.snapshot.paramMap.get('id'));

    this.http.put(this.baseUrl + 'team', formData).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.submitted = false;
        this.spinner.hide();
        this.router.navigate(['/teams/view']);

      },
      (error) => {
        this.toastr.warning(error.error.message);
      });

  }
}
