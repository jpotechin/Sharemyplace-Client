import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISignInAndUp, IUser } from './../interface/account.interface';

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	baseUrl = environment.apiUrl;
	private currentUserSource = new ReplaySubject<IUser | null>(1);
	currentUser$ = this.currentUserSource.asObservable();

	constructor(private http: HttpClient) {}

	login(model: ISignInAndUp): Observable<any> {
		return this.http.post<IUser>(this.baseUrl + 'account/login', model).pipe(
			map((response) => {
				const user = response;
				if (user) {
					this.setCurrentUser(user);
				}
				return user;
			})
		);
	}

	register(model: ISignInAndUp): Observable<any> {
		return this.http.post<IUser>(this.baseUrl + 'account/register', model).pipe(
			map((user) => {
				if (user) {
					this.setCurrentUser(user);
				}
				return user;
			})
		);
	}

	setCurrentUser(user: IUser | null): void {
		localStorage.setItem('user', JSON.stringify(user));
		this.currentUserSource.next(user);
	}

	logout(): void {
		localStorage.removeItem('user');
		this.currentUserSource.next(null);
	}
}
