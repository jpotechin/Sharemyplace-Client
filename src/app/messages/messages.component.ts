import { Component, OnInit } from '@angular/core';
import { faEnvelope, faEnvelopeOpen, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from './../_services/message.service';
import { IMessage } from './../interface/message';
import { IPagination } from './../interface/pagination';
import { MembersService } from '../_services/members.service';
import { UserParams } from '../interface/userParams';

@Component({
	selector: 'app-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
	messages!: IMessage[];
	pagination: IPagination | undefined;
	defaultMessage = 'No Messages';
	container = 'Inbox';
	pageNumber = 1;
	pageSize = 5;
	userParams: UserParams;

	unopenIcon = faEnvelope;
	openIcon = faEnvelopeOpen;
	outboxIcon = faPaperPlane;

	constructor(private memberService: MembersService, private messageService: MessageService) {
		this.userParams = this.memberService.getUserParams();
	}

	ngOnInit(): void {
		this.loadMessages();
	}

	loadMessages(): void {
		this.messages = [];
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

	selectButton(selection: string): void {
		this.container = selection;
		this.loadMessages();
	}
}
