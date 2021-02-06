import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from './../interface/account.interface';

const httpOptions = {
	headers: new HttpHeaders({
		Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user') || '{}').token || '',
	}),
};

@Injectable({
	providedIn: 'root',
})
export class MembersService {
	baseUrl = environment.apiUrl;
	constructor(private http: HttpClient) {}

	getMembers(): Observable<Member[]> {
		return this.http.get<Member[]>(this.baseUrl + 'users', httpOptions);
	}
}
