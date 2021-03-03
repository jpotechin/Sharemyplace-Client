import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMember, IUser } from './../interface/account.interface';
import { PaginatedResult } from './../interface/pagination';
import { UserParams } from './../interface/userParams';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
	providedIn: 'root',
})
export class MembersService {
	baseUrl = environment.apiUrl;
	members: IMember[] = [];
	memberCache = new Map();
	user: IUser | null = null;
	userParams!: UserParams;

	constructor(private http: HttpClient, private accountService: AccountService) {
		this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
			this.user = user;
			if (user) {
				this.userParams = new UserParams(user);
			}
		});
	}

	getUserParams(): UserParams {
		return this.userParams;
	}

	setUserParams(params: UserParams): void {
		this.userParams = params;
	}

	resetUserParams(): UserParams {
		if (this.user) {
			this.userParams = new UserParams(this.user);
		}
		return this.userParams;
	}

	getMembers(userParams: UserParams): any {
		const response = this.memberCache.get(Object.values(userParams).join('-'));

		if (response) {
			return of(response);
		}
		let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

		params = params.append('minAge', userParams.minAge.toString());
		params = params.append('maxAge', userParams.maxAge.toString());
		params = params.append('gender', userParams.gender);
		params = params.append('orderBy', userParams.orderBy);
		const url = this.baseUrl + 'users';
		return getPaginatedResult<IMember[]>(url, params, this.http).pipe(
			map((res) => {
				this.memberCache.set(Object.values(userParams).join('-'), res);
				return res;
			})
		);
	}

	getMember(username: string): Observable<IMember> {
		const member = [...this.memberCache.values()]
			.reduce((arr, elem) => arr.concat(elem.result), [])
			.find((user: IMember) => {
				return user.username === username;
			});

		if (member) {
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

	addLike(username: string): Observable<any> {
		return this.http.post(this.baseUrl + 'likes/' + username, {});
	}

	getLikes(predicate: string, pageNumber: number, pageSize: number): Observable<Partial<IMember[]>> {
		let params = getPaginationHeaders(pageNumber, pageSize);
		params = params.append('predicate', predicate);
		return getPaginatedResult<Partial<IMember[]>>(this.baseUrl + 'likes', params, this.http);
	}
}
