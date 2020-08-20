import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService

  ) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
  }

get f() { return this.loginForm.controls; }


/*
Login Function
*/
  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.spinner.show();
    this.authService.login(this.f.email.value, this.f.password.value ).subscribe(
      (response: any) => {
          this.router.navigate(['/dashboard']);
          localStorage.setItem('authToken', response.body.token);
          this.spinner.hide();

      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(error.error.message);

      });
  }
}
