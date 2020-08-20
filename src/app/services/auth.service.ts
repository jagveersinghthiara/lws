import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  ////// ================================ Admin Login service ======================================== //////
  login(email: string, password: string) {
    return this.http.post(this.baseUrl + 'login', { email: email, password: password });
  }

  ////// ================================ Admin Logout service ======================================== //////
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

  public get currentUserValue() {
    return localStorage.getItem('authToken');
  }
}
