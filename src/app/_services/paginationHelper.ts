import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../interface/pagination';

export function getPaginatedResult<T>(url: string, params: HttpParams, http: HttpClient): Observable<any> {
	const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
	return http
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

export function getPaginationHeaders(pageNumber: number, pageSize: number): HttpParams {
	let params = new HttpParams();
	params = params.append('pageNumber', pageNumber.toString());
	params = params.append('pageSize', pageSize.toString());

	return params;
}
