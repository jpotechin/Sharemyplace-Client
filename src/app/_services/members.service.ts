import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMember } from './../interface/account.interface';
import { PaginatedResult } from './../interface/pagination';
import { UserParams } from './../interface/userParams';

@Injectable({
	providedIn: 'root',
})
export class MembersService {
	baseUrl = environment.apiUrl;
	members: IMember[] = [];

	constructor(private http: HttpClient) {}

	getMembers(userParams: UserParams): any {
		let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

		params = params.append('minAge', userParams.minAge.toString());
		params = params.append('maxAge', userParams.maxAge.toString());
		params = params.append('gender', userParams.gender);
		const url = this.baseUrl + 'users';
		return this.getPaginatedResult<IMember[]>(url, params);
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

	private getPaginatedResult<T>(url: string, params: HttpParams): Observable<any> {
		const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
		return this.http
			.get<T>(url, { observe: 'response', params })
			.pipe(
				map((response) => {
					if (response.body !== null) {
						paginatedResult.result = response.body;
					}
					const paginationHeader = response.headers.get('Pagination');
					if (paginationHeader !== null) {
						paginatedResult.pagination = JSON.parse(paginationHeader);
					}
					return paginatedResult;
				})
			);
	}

	private getPaginationHeaders(pageNumber: number, pageSize: number): HttpParams {
		let params = new HttpParams();
		params = params.append('pageNumber', pageNumber.toString());
		params = params.append('pageSize', pageSize.toString());

		return params;
	}
}
