import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-view-detail',
  templateUrl: './viewTeamDetail.component.html',
  styleUrls: ['./viewTeamDetail.component.css']
})
export class ViewTeamDetailComponent implements OnInit {
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
  dispatcherManager: any;
  accountantManager: any;
  salesManager: any;
  salesTeam: any;
  dispatchteam: any;
  accountteam: any;
  accountteamTl: any;
  dispatchteamTl: any;
  salesTeamTl: any;
  admin: boolean;
  teamId: any;

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
      },
      (error) => {
        this.toastr.success(error.error.message);

      });

    this.http.get(this.baseUrl + 'teamDetail/' + this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (response: any) => {

        this.users = response.body.teamMembers;
        this.teamId = response.body.id;
        this.name = response.body.name;

        this.dispatcherManager = response.body.teamMembers[1].user.userName;
        this.accountantManager = response.body.teamMembers[2].user.userName;
        this.salesManager = response.body.teamMembers[0].user.userName;
        const TeamMembers = response.body.teamMembers;
        const result = TeamMembers.filter(TeamMember => TeamMember.user.roleName == 'Sales Team Leader'
        );
        const dispatchResult = TeamMembers.filter(TeamMember => TeamMember.user.roleName == 'Dispatch Team Leader'
        );
        const accountResult = TeamMembers.filter(TeamMember => TeamMember.user.roleName == 'Account Team Leader'
        );
        this.salesTeam = result[0].teamAgents;
        this.dispatchteam = dispatchResult[0].teamAgents;
        this.accountteam = accountResult[0].teamAgents;
        this.accountteamTl = accountResult[0].user.userName;
        this.dispatchteamTl = dispatchResult[0].user.userName;
        this.salesTeamTl = result[0].user.userName;
      },
      (error) => {
      });
  }
  ngOnInit() {
    const isAdmin = localStorage.getItem('user');

    if (isAdmin == '1') {

      this.admin = true;
    } else {
      this.admin = false;
    }
  }

  navigat() {

  }

}
