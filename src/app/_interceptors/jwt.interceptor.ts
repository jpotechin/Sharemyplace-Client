import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IUser } from '../interface/account.interface';
import { AccountService } from './../_services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private accountService: AccountService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		let currentUser: IUser | null;

		this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
			currentUser = user;
			if (currentUser) {
				request = request.clone({
					setHeaders: {
						// tslint:disable-next-line: no-unused-expression
						Authorization: `Bearer ${currentUser.token}`,
					},
				});
			}
		});

		return next.handle(request);
	}
}
