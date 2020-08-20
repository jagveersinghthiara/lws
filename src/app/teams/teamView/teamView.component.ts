import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-view',
    templateUrl: './teamView.component.html',
    styleUrls: ['./teamView.component.css']
  })

export class TeamViewComponent implements OnInit {
    baseUrl = environment.baseUrl;
    teamData = [];

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService,
        public activatedRoute: ActivatedRoute

      ) {
        this.http.get(this.baseUrl + 'userTeams/token'  + '/' + localStorage.getItem('user')).subscribe(
          (response: any) => {
            // console.log("-_-",response);
            if (response.body.length >  0) {
              this.teamData = response.body;

            }
          },
          (error) => {
          });
      }
      ngOnInit() {
      }




  }
