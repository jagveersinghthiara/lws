import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService
    ) { }
    ////// ================== if auth token is expired redirect to login page ================= //////
    private handleAuthError(err: HttpErrorResponse): Observable<HttpEvent<any>> {
           if(err.status == 400) {
            this.toastr.error(err.error.message);
        }
        if (err.status === 401 || err.status === 403) {
            this.authService.logout();
            this.router.navigate(['/']);
          //  this.toast.showToast(NbToastStatus.DANGER, 'Credentials', 'Invalid User!');

        }
        return throwError(err);
    }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('authToken');

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization',
                    'Bearer ' + token),
            });
            return next.handle(cloned)
                .pipe(
                    map((res) => {
                        return res;
                    }),
                    catchError(this.handleAuthError.bind(this)),
                );
        } else {
            return next.handle(req);
        }
    }
}
