import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMember } from './../interface/account.interface';
import { PaginatedResult } from './../interface/pagination';

@Injectable({
	providedIn: 'root',
})
export class MembersService {
	baseUrl = environment.apiUrl;
	members: IMember[] = [];

	paginatedResult: PaginatedResult<IMember[]> = new PaginatedResult<IMember[]>();

	constructor(private http: HttpClient) {}

	getMembers(page?: number, itemsPerPage?: number): any {
		let params = new HttpParams();
		if (page !== null && page !== undefined && itemsPerPage !== null && itemsPerPage !== undefined) {
			params = params.append('pageNumber', page.toString());
			params = params.append('pageSize', itemsPerPage.toString());
		}
		return this.http
			.get<IMember[]>(this.baseUrl + 'users', { observe: 'response', params })
			.pipe(
				map((response) => {
					if (response.body !== null) {
						this.paginatedResult.result = response.body;
					}
					const paginationHeader = response.headers.get('Pagination');
					if (paginationHeader !== null) {
						this.paginatedResult.pagination = JSON.parse(paginationHeader);
					}
					return this.paginatedResult;
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
