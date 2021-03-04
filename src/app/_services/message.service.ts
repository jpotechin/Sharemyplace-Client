import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessage } from '../interface/message';
import { environment } from './../../environments/environment';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
	providedIn: 'root',
})
export class MessageService {
	baseUrl = environment.apiUrl;

	constructor(private http: HttpClient) {}

	getMessages(pageNumber: number, pageSize: number, container: any): any {
		let params = getPaginationHeaders(pageNumber, pageSize);

		params = params.append('Container', container);
		return getPaginatedResult<IMessage[]>(this.baseUrl + 'messages', params, this.http);
	}

	getMessageThread(username: string): Observable<IMessage[]> {
		return this.http.get<IMessage[]>(this.baseUrl + 'messages/thread/' + username);
	}

	sendMessage(username: string, content: string): any {
		return this.http.post<IMessage>(this.baseUrl + 'messages', { recipientUsername: username, content });
	}

	deleteMessage(id: number): any {
		return this.http.delete(this.baseUrl + 'messages/' + id);
	}
}
