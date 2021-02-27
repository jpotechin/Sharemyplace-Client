/* tslint:disable */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { throwError, Observable } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	developerMode: boolean;
	constructor(private router: Router, private toastr: ToastrService) {
		this.developerMode = isDevMode();
		console.log('Is dev mode? ', this.developerMode);
	}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			// @ts-ignore
			catchError((err) => {
				if (err) {
					switch (err.status) {
						case 400:
							if (err.error.errors) {
								const modelStateErrors = [];
								for (const key in err.error.errors) {
									if (err.error.errors[key]) {
										modelStateErrors.push(err.error.errors[key]);
									}
								}
								throw modelStateErrors.flat();
							} else if (typeof err.error === 'object') {
								this.toastr.error(err.statusText, err.status);
							} else {
								this.toastr.error(err.error, err.status);
							}
							break;
						case 401:
							this.toastr.error(err.statusText, err.status);
							break;
						case 404:
							this.router.navigateByUrl('/not-found');
							break;
						case 500:
							console.log();
							const navigationExtras: NavigationExtras = { state: { error: err.error } };
							if (this.developerMode) {
								this.router.navigateByUrl('/server-error', navigationExtras);
							} else {
								this.toastr.error('Something happend with the server. Try again soon.');
							}
							break;
						default:
							this.toastr.error('Something unexpected went wrong');
							console.error('err');
							break;
					}
					return throwError(err);
				}
			})
		);
	}
}
