import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SignInAndUp, User } from './../interface/account.interface';

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	baseUrl = environment.apiUrl;
	private currentUserSource = new ReplaySubject<User | null>(1);
	currentUser$ = this.currentUserSource.asObservable();

	constructor(private http: HttpClient) {}

	login(model: SignInAndUp): Observable<any> {
		return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
			map((response) => {
				const user = response;
				if (user) {
					this.setCurrentUser(user);
				}
				return user;
			})
		);
	}

	register(model: SignInAndUp): Observable<any> {
		return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
			map((user) => {
				if (user) {
					this.setCurrentUser(user);
				}
				return user;
			})
		);
	}

	setCurrentUser(user: User | null): void {
		localStorage.setItem('user', JSON.stringify(user));
		this.currentUserSource.next(user);
	}

	logout(): void {
		localStorage.removeItem('user');
		this.currentUserSource.next(null);
	}
}
