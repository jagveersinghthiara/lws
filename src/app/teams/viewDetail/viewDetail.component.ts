import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-view-detail',
  templateUrl: './viewDetail.component.html',
  styleUrls: ['./viewDetail.component.css']
})
export class ViewDetailComponent implements OnInit {
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
  name: any;
  userlist: any;
  dispatchAgentsList: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    public activatedRoute: ActivatedRoute
  ) {
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
        // console.log(JSON.stringify(this.DispatcherAgent));
      },
      (error) => {
        this.toastr.success(error.error.message);

      });

    this.http.get(this.baseUrl + 'teamDetail/' + this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (response: any) => {

        this.users = response.body.teamMembers;

        this.name = response.body.name;

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
      salesManager: [{ value: '', disabled: true }, [Validators.required]],

      dispatcherManager: [{ value: '', disabled: true }, [Validators.required]],
      accountantManager: [{ value: '', disabled: true }, [Validators.required]],
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
      this.showCross = true;
      control.push(this.setUnit(aray[i]));
    }

  }

  private addDispatch(aray) {
    const control = this.teamForm.controls.disptch as FormArray;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < aray.length; i++) {
      this.showCrossDes = true;
      control.push(this.setDispatch(aray[i]));
    }
  }

  private  setDispatch(aray) {
    const user = [];
    aray.teamAgents.forEach(element => {
      user.push(element.user.id);
    });
    const userstring = user.join(',');
    const result = this.DispatcherAgent.filter(word => {
      if (user.indexOf(word.id) != -1) {
        return word;

      }
    });
    let tempArray =[]
    result.forEach(item => {
      tempArray.push(item.userName);
    });
    const values =  tempArray.join(',');

    return this.formBuilder.group({
      dispatcherTl: [{ value: aray.memberId, disabled: true }],
      dispatcherAgent: [{ value: values, disabled: true }],
      group: [aray.group_level],
    });
  }

  private addAccount(aray) {
    const control = this.teamForm.controls.account as FormArray;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < aray.length; i++) {
      this.showCrossAcc = true;
      control.push(this.setAccount(aray[i]));
    }
  }


  private setAccount(aray) {
    const user = [];
    aray.teamAgents.forEach(element => {
      user.push(element.user.id);
    });
    const userstring = user.join(',');
    const result = this.AccountingAgent.filter(word => {
      if (user.indexOf(word.id) != -1) {
        return word;
      }
    });
    const  tempAgent = [];
    result.forEach(item => {
      tempAgent.push(item.userName);
    });
    const values =  tempAgent.join(',');

    return this.formBuilder.group({
      AccountTl: [{ value: aray.memberId, disabled: true }],
      accountingAgent: [{ value: values, disabled: true }],
      group: [aray.group_level],
    });
  }

  private setUnit(aray) {
    const user = [];
    aray.teamAgents.forEach(element => {
      user.push(element.user.id);
    });
    const userstring = user.join(',');

    const result = this.SalesAgent.filter(word => {
      if (user.indexOf(word.id) != -1) {
        return word;
      }
    });
    const  tempAgent = [];
    result.forEach(item => {
      tempAgent.push(item.userName);
    });
    const values =  tempAgent.join(',');


    return this.formBuilder.group({
      salesTL: [{ value: aray.memberId, disabled: true }],
      salesAgent: [{ value: values, disabled: true }],
      group: [aray.group_level],
    });
  }
  private addUnit() {
    this.showCross = true;
    const control = this.teamForm.controls.units as FormArray;
    const val = control.controls.length;
    control.push(this.getUnit(val));
  }


  get f() { return this.teamForm.controls; }



}
