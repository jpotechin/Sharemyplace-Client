import { Component, OnInit } from '@angular/core';
import { faEnvelope, faEnvelopeOpen, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { MembersService } from '../_services/members.service';
import { UserParams } from '../interface/userParams';
import { MessageService } from './../_services/message.service';
import { IMessage } from './../interface/message';
import { IPagination } from './../interface/pagination';

@Component({
	selector: 'app-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
	messages: IMessage[] | [] = [];
	pagination: IPagination | undefined;
	defaultMessage = 'No Messages';
	container = 'Unread';
	pageNumber = 1;
	pageSize = 5;
	userParams: UserParams;
	loading = false;

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
		this.loading = true;
		this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe((response: any) => {
			this.messages = response.result;
			this.pagination = response.pagination;
			this.loading = false;
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

	deleteMessage(id: number): void {
		this.messageService.deleteMessage(id).subscribe(() => {
			this.messages.splice(
				this.messages.findIndex((m) => m.id === id),
				1
			);
		});
	}
}
