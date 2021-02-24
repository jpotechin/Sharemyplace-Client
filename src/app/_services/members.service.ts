import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMember } from './../interface/account.interface';

@Injectable({
	providedIn: 'root',
})
export class MembersService {
	baseUrl = environment.apiUrl;
	members: IMember[] = [];
	constructor(private http: HttpClient) {}

	getMembers(): Observable<IMember[]> {
		if (this.members.length > 0) {
			return of(this.members);
		}
		return this.http.get<IMember[]>(this.baseUrl + 'users').pipe(
			map((members) => {
				this.members = members;
				return members;
			})
		);
	}

	getMember(username: string): Observable<IMember> {
		const member = this.members.find((selectedMember) => selectedMember.username === username);
		if (member !== undefined) {
			return of(member);
		}
		return this.http.get<IMember>(this.baseUrl + 'users/' + username);
	}

	updateMember(member: IMember): Observable<any> {
		return this.http.put(this.baseUrl + 'users', member).pipe(
			map(() => {
				const index = this.members.indexOf(member);
				this.members[index] = member;
			})
		);
	}

	setMainPhoto(photoId: number): Observable<any> {
		return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
	}

	deletePhoto(photoId: number): Observable<any> {
		return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
	}
}
