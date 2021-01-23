import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './../interface/account.interface';

@Injectable({
	providedIn: 'root',
})
export class AccountService {
	baseUrl = 'https://localhost:5001/api/';
	private currentUserSource = new ReplaySubject<User | null>(1);
	currentUser$ = this.currentUserSource.asObservable();

	constructor(private http: HttpClient) {}

	login(model: any): Observable<any> {
		return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
			map((response) => {
				const user = response;
				if (user) {
					localStorage.setItem('user', JSON.stringify(user));
					this.currentUserSource.next(user);
				}
			})
		);
	}

	setCurrentUser(user: User | null): void {
		this.currentUserSource.next(user);
	}

	logout(): void {
		localStorage.removeItem('user');
		this.currentUserSource.next(null);
	}
}
