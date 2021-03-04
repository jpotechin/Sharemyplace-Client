import { Component, Input, OnInit } from '@angular/core';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from './../../_services/message.service';
import { IMessage } from './../../interface/message';

@Component({
	selector: 'app-member-messages',
	templateUrl: './member-messages.component.html',
	styleUrls: ['./member-messages.component.scss'],
})
export class MemberMessagesComponent implements OnInit {
	@Input() username!: string;
	messages: IMessage[] | [] = [];

	clockIcon = faClock;

	constructor(private messageService: MessageService) {}

	ngOnInit(): void {
		this.loadMessages();
	}

	loadMessages(): void {
		this.messageService.getMessageThread(this.username).subscribe((messages) => {
			this.messages = messages;
		});
	}
}
