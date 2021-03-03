import { Component, OnInit } from '@angular/core';
import { MessageService } from './../_services/message.service';
import { IMessage } from './../interface/message';
import { IPagination } from './../interface/pagination';

@Component({
	selector: 'app-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
	messages!: IMessage[];
	pagination: IPagination | undefined;
	defaultMessage = 'No Messages';
	container = 'Outbox';
	pageNumber = 1;
	pageSize = 5;

	constructor(private messageService: MessageService) {}

	ngOnInit(): void {
		this.loadMessages();
	}

	loadMessages(): void {
		this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe((response: any) => {
			console.log(response);
			this.messages = response.result;
			console.log(this.messages);
			this.pagination = response.pagination;
		});
	}

	pageChanged(eventPage: any): void {
		this.pageNumber = eventPage;
		this.loadMessages();
	}
}
